import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, PlayCircle, Eye, Calendar, User } from "lucide-react";
import { MedicalChart, MedicalChartVersion } from "../types";
import { formatDate } from "../utils";
import logo from "@/assets/logo.png";

interface MedicalRecordsTabProps {
  patientId: string;
  medicalChart: MedicalChart | null;
}

export default function MedicalRecordsTab({
  patientId,
  medicalChart,
}: MedicalRecordsTabProps) {
  const navigate = useNavigate();
  const [viewingVersion, setViewingVersion] =
    useState<MedicalChartVersion | null>(null);

  const handleStartConsultation = () => {
    navigate(`/consultation/${patientId}`);
  };

  const handleViewVersion = (version: MedicalChartVersion) => {
    setViewingVersion(version);
  };

  const handleCloseView = () => {
    setViewingVersion(null);
  };

  // Estado inicial - nenhum prontuário existe
  if (!medicalChart) {
    return (
      <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-medical">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <ClipboardList className="h-4 w-4 sm:h-5 sm:w-5" />
            Prontuário do Paciente
          </CardTitle>
          <CardDescription className="text-sm">
            Nenhum prontuário encontrado para este paciente
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <ClipboardList className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Prontuário não iniciado
              </h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Para criar o prontuário deste paciente, inicie o primeiro
                atendimento. O prontuário será automaticamente criado com os
                dados da consulta e o modelo selecionado.
              </p>
            </div>
            <Button
              onClick={handleStartConsultation}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <PlayCircle className="h-4 w-4" />
              Iniciar Primeiro Atendimento
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Estado com visualização detalhada de uma versão
  if (viewingVersion) {
    console.log("Renderizando viewingVersion:", viewingVersion);
    console.log(
      "viewingVersion.consultationData:",
      viewingVersion.consultationData
    );
    console.log("viewingVersion.templateData:", viewingVersion.templateData);

    try {
      return (
        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-medical">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <ClipboardList className="h-4 w-4 sm:h-5 sm:w-5" />
                  {viewingVersion.templateName} - Versão{" "}
                  {viewingVersion?.versionNumber || "N/A"}
                </CardTitle>
                <CardDescription className="text-sm">
                  {viewingVersion?.date
                    ? new Date(viewingVersion.date).toLocaleDateString("pt-BR")
                    : "N/A"}{" "}
                  • {viewingVersion?.professional || "N/A"}
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={handleCloseView}>
                Voltar
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6 space-y-6">
            {/* Header da UFPE */}
            <div className="mb-6 p-4 border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={logo}
                    alt="UFPE Logo"
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <h1 className="text-xl font-bold text-foreground">
                      Universidade Federal de Pernambuco
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Departamento de Fisioterapia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dados da Consulta */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Dados da Consulta
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Data/Hora:
                  </span>
                  <p className="text-sm">
                    {viewingVersion.consultationData?.date
                      ? new Date(
                          viewingVersion.consultationData.date
                        ).toLocaleDateString("pt-BR")
                      : "N/A"}{" "}
                    às {viewingVersion.consultationData?.time || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Profissional:
                  </span>
                  <p className="text-sm">
                    {viewingVersion.consultationData?.professional || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Tipo:
                  </span>
                  <p className="text-sm">
                    {viewingVersion.consultationData?.type || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Área:
                  </span>
                  <p className="text-sm">
                    {viewingVersion.consultationData?.area || "N/A"}
                  </p>
                </div>
                {viewingVersion.consultationData?.students && (
                  <div className="md:col-span-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Alunos:
                    </span>
                    <p className="text-sm">
                      {viewingVersion.consultationData.students}
                    </p>
                  </div>
                )}
                {viewingVersion.consultationData?.observations && (
                  <div className="md:col-span-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Observações:
                    </span>
                    <p className="text-sm">
                      {viewingVersion.consultationData.observations}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Dados do Prontuário */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                {viewingVersion.templateName}
              </h3>

              {/* Renderizar os campos do template em formato somente leitura */}
              <div className="space-y-6">
                {viewingVersion?.templateData &&
                  Object.entries(viewingVersion.templateData).map(
                    ([key, value]) => {
                      if (
                        !value ||
                        value === "" ||
                        (Array.isArray(value) && value.length === 0)
                      )
                        return null;

                      // Formatação dos labels
                      const formatLabel = (key: string) => {
                        const labelMap: Record<string, string> = {
                          marital_status: "Estado Civil",
                          occupations_hobbies: "Ocupações/Hobbies",
                          dominance: "Dominância",
                          address: "Endereço",
                          household_members: "Membros da Família",
                          main_complaint: "Queixa Principal",
                          disease_history: "História da Doença",
                          medical_diagnosis_cid: "Diagnóstico Médico (CID)",
                          rom_passive_active: "Amplitude de Movimento",
                          muscle_strength_detailed: "Força Muscular",
                          evolution: "Evolução",
                          surgery: "Cirurgia",
                          surgery_date: "Data da Cirurgia",
                          relevant_medications: "Medicações Relevantes",
                          muscle_tone: "Tônus Muscular",
                          reflexes: "Reflexos",
                          coordination: "Coordenação",
                          balance: "Equilíbrio",
                          sensitivity: "Sensibilidade",
                          functional_assessment: "Avaliação Funcional",
                          treatment_goals: "Objetivos do Tratamento",
                          treatment_plan: "Plano de Tratamento",
                          // Adicione mais mapeamentos conforme necessário
                        };
                        return (
                          labelMap[key] ||
                          key
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())
                        );
                      };

                      const renderValue = (value: any) => {
                        if (Array.isArray(value)) {
                          return value.join(", ");
                        }
                        if (typeof value === "object") {
                          return JSON.stringify(value, null, 2);
                        }
                        return String(value);
                      };

                      return (
                        <div key={key} className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            {formatLabel(key)}
                          </label>
                          <div className="p-3 bg-muted/30 rounded-lg border">
                            <p className="text-sm whitespace-pre-wrap">
                              {renderValue(value)}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
          </CardContent>
        </Card>
      );
    } catch (error) {
      console.error("Erro ao renderizar visualização:", error);
      return (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <h3 className="text-red-800 font-bold">Erro na Visualização</h3>
            <p className="text-red-600">Erro: {String(error)}</p>
            <Button onClick={handleCloseView} className="mt-2">
              Voltar
            </Button>
          </CardContent>
        </Card>
      );
    }
  }

  // Estado normal - mostra resumo do prontuário atual e histórico de versões
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-medical">
      <CardHeader className="p-4 sm:p-6">
        <div>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <ClipboardList className="h-4 w-4 sm:h-5 sm:w-5" />
            Prontuário do Paciente
          </CardTitle>
          <CardDescription className="text-sm">
            Versão atual: {medicalChart.currentVersion.versionNumber} •{" "}
            {medicalChart.currentVersion.templateName}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-6">
        {/* Resumo da Versão Atual */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Versão Atual</h3>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-200">
                    Versão {medicalChart.currentVersion.versionNumber}
                  </h4>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {formatDate(medicalChart.currentVersion.date)} •{" "}
                    {medicalChart.currentVersion.professional}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200 dark:bg-green-900 dark:text-green-100">
                  Atual
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleViewVersion(medicalChart.currentVersion)}
                  className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/20"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Visualizar
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Histórico de Versões */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Histórico de Versões</h3>
          <div className="space-y-3">
            {medicalChart.versions
              .sort((a, b) => b.versionNumber - a.versionNumber)
              .map((version) => (
                <Card key={version.id} className="border border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {version.versionNumber}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">
                            Versão {version.versionNumber}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(version.date)} • {version.professional}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {version.isActive && (
                          <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200 dark:bg-green-900 dark:text-green-100">
                            Atual
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleViewVersion(version)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
