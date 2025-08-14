import { useState, useEffect } from "react";
import {
  MedicalChart,
  MedicalChartVersion,
  MedicalChartDiff,
  ChartFieldChange,
} from "@/components/patient";
import { useMedicalChartHistory } from "./useMedicalChartHistory";

// Chave para armazenamento local
const STORAGE_KEY = "medicalCharts";

interface StoredMedicalCharts {
  [patientId: string]: MedicalChart;
}

export function useMedicalChart(patientId: string) {
  const [medicalChart, setMedicalChart] = useState<MedicalChart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { diffs, addDiff, clearHistory } = useMedicalChartHistory(patientId);

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const charts: StoredMedicalCharts = JSON.parse(stored);
        if (charts[patientId]) {
          // Converter strings de data de volta para objetos Date
          const chart = charts[patientId];
          chart.createdAt = new Date(chart.createdAt);
          chart.updatedAt = new Date(chart.updatedAt);
          chart.currentVersion.date = new Date(chart.currentVersion.date);
          chart.versions.forEach((version) => {
            version.date = new Date(version.date);
          });
          setMedicalChart(chart);
        }
      } catch (error) {
        console.error("Erro ao carregar prontuário do localStorage:", error);
      }
    }
    setIsLoading(false);
  }, [patientId]);

  // Função para salvar no localStorage
  const saveToStorage = (chart: MedicalChart) => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const charts: StoredMedicalCharts = stored ? JSON.parse(stored) : {};
      charts[patientId] = chart;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(charts));
    } catch (error) {
      console.error("Erro ao salvar prontuário no localStorage:", error);
    }
  };

  // Criar novo prontuário
  const createMedicalChart = (
    consultationData: any,
    templateData: any,
    templateId: string,
    templateName: string
  ): MedicalChart => {
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

    setMedicalChart(newChart);
    saveToStorage(newChart);
    return newChart;
  };

  // Atualizar prontuário existente
  const updateMedicalChart = (
    consultationData: any,
    templateData: any,
    templateId: string,
    templateName: string,
    previousVersion: MedicalChartVersion
  ): { chart: MedicalChart; diff: MedicalChartDiff } => {
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

    setMedicalChart(updatedChart);
    saveToStorage(updatedChart);
    addDiff(diff); // Adicionar ao histórico
    return { chart: updatedChart, diff };
  };

  // Limpar prontuário (para testes)
  const clearMedicalChart = () => {
    setMedicalChart(null);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const charts: StoredMedicalCharts = JSON.parse(stored);
        delete charts[patientId];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(charts));
      }
    } catch (error) {
      console.error("Erro ao limpar prontuário:", error);
    }
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
