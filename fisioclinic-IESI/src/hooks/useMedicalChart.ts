import { useState, useEffect } from "react";
import {
  MedicalChart,
  MedicalChartVersion,
  MedicalChartDiff,
  ChartFieldChange,
} from "@/components/patient";
import { useMedicalChartHistory } from "./useMedicalChartHistory";
import { createProntuary, getProntuaries, ProntuaryAPI } from "@/lib/api";



export function useMedicalChart(patientId: string) {
  const [medicalChart, setMedicalChart] = useState<MedicalChart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { diffs, addDiff, clearHistory } = useMedicalChartHistory(patientId);


  // Carregar prontuário do backend na inicialização
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    async function fetchChart() {
      try {
        const prontuaries = await getProntuaries(patientId);
        // Supondo que o backend retorna um array de versões ou um objeto de prontuário
        if (prontuaries && prontuaries.length > 0) {
          // Adaptar para o formato MedicalChart se necessário
          // Aqui assumimos que o backend retorna um array de versões, pegando a mais recente
          // Você pode precisar ajustar conforme o formato real da resposta
          const versions = prontuaries.map((item: any, idx: number) => ({
            ...item,
            date: new Date(item.date),
            isActive: item.isActive ?? true,
            versionNumber: item.versionNumber ?? idx + 1,
          }));
          const latest = versions[versions.length - 1];
          const chart: MedicalChart = {
            id: latest.id || Date.now().toString(),
            patientId,
            createdAt: latest.createdAt ? new Date(latest.createdAt) : new Date(),
            updatedAt: latest.updatedAt ? new Date(latest.updatedAt) : new Date(),
            currentVersion: latest,
            versions,
            status: latest.status || "ativo",
          };
          if (isMounted) setMedicalChart(chart);
        } else {
          if (isMounted) setMedicalChart(null);
        }
      } catch (error) {
        console.error("Erro ao carregar prontuário do backend:", error);
        if (isMounted) setMedicalChart(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchChart();
    return () => {
      isMounted = false;
    };
  }, [patientId]);



  // Criar novo prontuário e salvar no backend
  const createMedicalChart = async (
    consultationData: any,
    templateData: any,
    templateId: string,
    templateName: string
  ): Promise<MedicalChart> => {
    const newVersion: MedicalChartVersion = {
      id: Date.now().toString(),
      versionNumber: 1,
      date: new Date(),
      professional: consultationData.professional || "Dr. Médico",
      templateId,
      templateName,
      consultationData: {
        date: consultationData.date,
        time: consultationData.time,
        professional: consultationData.professional,
        students: consultationData.students,
        area: consultationData.area,
        type: consultationData.type,
        observations: consultationData.observations,
      },
      templateData,
      isActive: true,
    };

    const newChart: MedicalChart = {
      id: Date.now().toString(),
      patientId,
      createdAt: new Date(),
      updatedAt: new Date(),
      currentVersion: newVersion,
      versions: [newVersion],
      status: "ativo",
    };

    // Salvar no backend
    const prontuaryPayload: ProntuaryAPI = {
      titulo: templateName,
      conteudo: newChart,
      user: consultationData.professional || "Dr. Médico",
      paciente: patientId,
      grupo: undefined,
    };
    try {
      await createProntuary(patientId, prontuaryPayload);
      setMedicalChart(newChart);
    } catch (error) {
      console.error("Erro ao criar prontuário no backend:", error);
    }
    return newChart;
  };

  // Atualizar prontuário existente e salvar no backend
  const updateMedicalChart = async (
    consultationData: any,
    templateData: any,
    templateId: string,
    templateName: string,
    previousVersion: MedicalChartVersion
  ): Promise<{ chart: MedicalChart; diff: MedicalChartDiff }> => {
    if (!medicalChart) {
      throw new Error("Nenhum prontuário existente para atualizar");
    }

    const newVersion: MedicalChartVersion = {
      id: Date.now().toString(),
      versionNumber: medicalChart.currentVersion.versionNumber + 1,
      date: new Date(),
      professional: consultationData.professional || "Dr. Médico",
      templateId,
      templateName,
      consultationData: {
        date: consultationData.date,
        time: consultationData.time,
        professional: consultationData.professional,
        students: consultationData.students,
        area: consultationData.area,
        type: consultationData.type,
        observations: consultationData.observations,
      },
      templateData,
      isActive: true,
    };

    // Calcular diferenças
    const changes: ChartFieldChange[] = [];
    const allFields = new Set([
      ...Object.keys(previousVersion.templateData),
      ...Object.keys(templateData),
    ]);

    allFields.forEach((field) => {
      const before = previousVersion.templateData[field];
      const after = templateData[field];
      if (JSON.stringify(before) !== JSON.stringify(after)) {
        let changeType: "added" | "modified" | "removed";
        if (before === undefined || before === null || before === "") {
          changeType = "added";
        } else if (after === undefined || after === null || after === "") {
          changeType = "removed";
        } else {
          changeType = "modified";
        }

        changes.push({
          fieldId: field,
          fieldLabel: field
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
          previousValue: before,
          newValue: after,
          changeType,
        });
      }
    });

    const diff: MedicalChartDiff = {
      consultationId: Date.now().toString(),
      consultationType: consultationData.type as
        | "consulta"
        | "retorno"
        | "avaliacao",
      previousVersion,
      currentVersion: newVersion,
      changes,
      date: new Date(),
      professional: consultationData.professional || "Dr. Médico",
    };

    const updatedChart: MedicalChart = {
      ...medicalChart,
      updatedAt: new Date(),
      currentVersion: newVersion,
      versions: [...medicalChart.versions, newVersion],
    };

    // Salvar no backend
    const prontuaryPayload: ProntuaryAPI = {
      titulo: templateName,
      conteudo: updatedChart,
      user: consultationData.professional || "Dr. Médico",
      paciente: patientId,
      grupo: undefined,
    };
    try {
      await createProntuary(patientId, prontuaryPayload);
      setMedicalChart(updatedChart);
    } catch (error) {
      console.error("Erro ao atualizar prontuário no backend:", error);
    }
    addDiff(diff); // Adicionar ao histórico
    return { chart: updatedChart, diff };
  };

  // Limpar prontuário (para testes) - apenas limpa do estado local
  const clearMedicalChart = () => {
    setMedicalChart(null);
    // Se desejar, pode implementar deleção no backend aqui
  };

  return {
    medicalChart,
    isLoading,
    diffs,
    createMedicalChart,
    updateMedicalChart,
    clearMedicalChart,
    clearHistory,
  };
}
