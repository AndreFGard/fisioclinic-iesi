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
import { Calendar, Download, Eye, History } from "lucide-react";
import { ConsultationRecord } from "../types";
import { getDocumentTypeIcon, getDocumentTypeName, formatDate } from "../utils";
import examplePdf from "@/assets/pdfs/example.pdf";

interface HistoryTabProps {
  consultations: ConsultationRecord[];
}

export default function HistoryTab({ consultations }: HistoryTabProps) {
  const [viewingPdf, setViewingPdf] = useState<string | null>(null);

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-medical">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <History className="h-4 w-4 sm:h-5 sm:w-5" />
          Histórico de Consultas
        </CardTitle>
        <CardDescription className="text-sm">
          Registro completo de todas as consultas e atendimentos
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {consultations.map((consultation) => (
            <Card key={consultation.id} className="border border-border/50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
