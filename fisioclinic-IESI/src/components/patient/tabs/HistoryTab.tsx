import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Download,
  Eye,
  History,
  FileText,
  TrendingUp,
  TrendingDown,
  Plus,
} from "lucide-react";
import {
  ConsultationRecord,
  MedicalChartDiff,
  ChartFieldChange,
} from "../types";
import { getDocumentTypeIcon, getDocumentTypeName, formatDate } from "../utils";
import examplePdf from "@/assets/pdfs/example.pdf";

interface HistoryTabProps {
  consultations: ConsultationRecord[];
  medicalChartDiffs?: MedicalChartDiff[];
}

export default function HistoryTab({
  consultations,
  medicalChartDiffs = [],
}: HistoryTabProps) {
  const [viewingPdf, setViewingPdf] = useState<string | null>(null);
  const [expandedDiff, setExpandedDiff] = useState<string | null>(null);

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getChangeIcon = (changeType: ChartFieldChange["changeType"]) => {
    switch (changeType) {
      case "added":
        return <Plus className="h-4 w-4 text-green-600" />;
      case "modified":
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case "removed":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getChangeColor = (changeType: ChartFieldChange["changeType"]) => {
    switch (changeType) {
      case "added":
        return "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800";
      case "modified":
        return "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800";
      case "removed":
        return "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800";
      default:
        return "bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800";
    }
  };

  const getConsultationTypeColors = (
    type: "consulta" | "retorno" | "avaliacao"
  ) => {
    switch (type) {
      case "consulta":
        return {
          card: "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-900/20",
          icon: "bg-blue-100 dark:bg-blue-800",
          iconColor: "text-blue-600 dark:text-blue-400",
          badge:
            "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100",
        };
      case "retorno":
        return {
          card: "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/20",
          icon: "bg-green-100 dark:bg-green-800",
          iconColor: "text-green-600 dark:text-green-400",
          badge:
            "bg-green-100 text-green-800 border-green-200 hover:bg-green-200 dark:bg-green-900 dark:text-green-100",
        };
      case "avaliacao":
        return {
          card: "border-purple-200 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-900/20",
          icon: "bg-purple-100 dark:bg-purple-800",
          iconColor: "text-purple-600 dark:text-purple-400",
          badge:
            "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-100",
        };
      default:
        return {
          card: "border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/20",
          icon: "bg-gray-100 dark:bg-gray-800",
          iconColor: "text-gray-600 dark:text-gray-400",
          badge:
            "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-100",
        };
    }
  };

  // Combinar consultas e diffs do prontuário em ordem cronológica
  const allEvents = [
    ...consultations.map((consultation) => ({
      type: "consultation" as const,
      date: consultation.date,
      data: consultation,
    })),
    ...medicalChartDiffs.map((diff) => ({
      type: "chart_diff" as const,
      date: diff.date,
      data: diff,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-medical">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <History className="h-4 w-4 sm:h-5 sm:w-5" />
          Histórico de Consultas e Prontuário
        </CardTitle>
        <CardDescription className="text-sm">
          Registro completo de todas as consultas, atendimentos e mudanças no
          prontuário
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {allEvents.map((event, index) => {
            if (event.type === "consultation") {
              const consultation = event.data as ConsultationRecord;
              const colors = getConsultationTypeColors(consultation.type);

              return (
                <Card
                  key={`consultation-${consultation.id}`}
                  className={`border ${colors.card}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 ${colors.icon} rounded-lg flex items-center justify-center`}
                        >
                          <Calendar className={`h-5 w-5 ${colors.iconColor}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {consultation.type === "consulta"
                              ? "Consulta"
                              : consultation.type === "retorno"
                              ? "Retorno"
                              : "Avaliação"}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(consultation.date)} •{" "}
                            {consultation.professional}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          consultation.status === "realizada"
                            ? "default"
                            : consultation.status === "agendada"
                            ? "secondary"
                            : "destructive"
                        }
                        className={
                          consultation.status === "realizada"
                            ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-200 dark:bg-green-900 dark:text-green-100"
                            : consultation.status === "agendada"
                            ? "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100"
                            : "bg-red-100 text-red-800 border-red-200 hover:bg-red-200 dark:bg-red-900 dark:text-red-100"
                        }
                      >
                        {consultation.status === "realizada"
                          ? "Realizada"
                          : consultation.status === "agendada"
                          ? "Agendada"
                          : "Cancelada"}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">
                      {consultation.observations}
                    </p>

                    {consultation.documents.length > 0 && (
                      <div className="border-t border-border/50 pt-3">
                        <h5 className="text-sm font-medium text-foreground mb-2">
                          Documentos:
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {consultation.documents.map((document) => (
                            <div
                              key={document.id}
                              className="flex items-center justify-between p-2 bg-muted/30 rounded-md"
                            >
                              <div className="flex items-center gap-2">
                                {getDocumentTypeIcon(document.type)}
                                <div>
                                  <p className="text-sm font-medium">
                                    {document.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {getDocumentTypeName(document.type)} •{" "}
                                    {formatDate(document.date)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    setViewingPdf(
                                      viewingPdf === document.id
                                        ? null
                                        : document.id
                                    )
                                  }
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    handleDownload(examplePdf, document.name)
                                  }
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        {viewingPdf &&
                          consultation.documents.some(
                            (d) => d.id === viewingPdf
                          ) && (
                            <div className="mt-4">
                              <iframe
                                src={examplePdf}
                                title={
                                  consultation.documents.find(
                                    (d) => d.id === viewingPdf
                                  )?.name
                                }
                                className="w-full h-[600px] rounded-md border"
                              />
                            </div>
                          )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            } else {
              // Diff do prontuário
              const diff = event.data as MedicalChartDiff;
              const isExpanded = expandedDiff === diff.consultationId;
              const colors = getConsultationTypeColors(diff.consultationType);

              return (
                <Card
                  key={`diff-${diff.consultationId}`}
                  className={`border ${colors.card}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 ${colors.icon} rounded-lg flex items-center justify-center`}
                        >
                          <FileText className={`h-5 w-5 ${colors.iconColor}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {diff.consultationType === "consulta"
                              ? "Consulta"
                              : diff.consultationType === "retorno"
                              ? "Retorno"
                              : "Avaliação"}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(diff.date)} • {diff.professional}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={colors.badge}>
                          {diff.changes.length} alteraç
                          {diff.changes.length === 1 ? "ão" : "ões"}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            setExpandedDiff(
                              isExpanded ? null : diff.consultationId
                            )
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">
                      {/* Mostrar observações da consulta ou deixar vazio se não houver */}
                      {diff.currentVersion.consultationData?.observations || ""}
                    </p>

                    {isExpanded && (
                      <div className="border-t border-border/50 pt-3 space-y-3">
                        <h5 className="text-sm font-medium text-foreground mb-2">
                          Alterações detalhadas:
                        </h5>
                        <div className="space-y-2">
                          {diff.changes.map((change, changeIndex) => (
                            <div
                              key={changeIndex}
                              className={`p-3 rounded-md border ${getChangeColor(
                                change.changeType
                              )}`}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                {getChangeIcon(change.changeType)}
                                <span className="text-sm font-medium">
                                  {change.fieldLabel}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {change.changeType === "added" &&
                                    "Adicionado"}
                                  {change.changeType === "modified" &&
                                    "Modificado"}
                                  {change.changeType === "removed" &&
                                    "Removido"}
                                </Badge>
                              </div>

                              {change.changeType === "added" && (
                                <div className="text-sm">
                                  <span className="font-medium text-green-700 dark:text-green-300">
                                    Novo valor:
                                  </span>
                                  <p className="text-green-600 dark:text-green-400 mt-1 whitespace-pre-wrap">
                                    {String(change.newValue)}
                                  </p>
                                </div>
                              )}

                              {change.changeType === "modified" && (
                                <div className="text-sm space-y-2">
                                  <div>
                                    <span className="font-medium text-red-700 dark:text-red-300">
                                      Valor anterior:
                                    </span>
                                    <p className="text-red-600 dark:text-red-400 mt-1 whitespace-pre-wrap">
                                      {String(change.previousValue)}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="font-medium text-green-700 dark:text-green-300">
                                      Novo valor:
                                    </span>
                                    <p className="text-green-600 dark:text-green-400 mt-1 whitespace-pre-wrap">
                                      {String(change.newValue)}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {change.changeType === "removed" && (
                                <div className="text-sm">
                                  <span className="font-medium text-red-700 dark:text-red-300">
                                    Valor removido:
                                  </span>
                                  <p className="text-red-600 dark:text-red-400 mt-1 whitespace-pre-wrap">
                                    {String(change.previousValue)}
                                  </p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            }
          })}
        </div>
      </CardContent>
    </Card>
  );
}
