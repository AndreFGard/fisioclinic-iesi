import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Save, Stethoscope } from "lucide-react";
import { PatientData } from "./types";

interface ConsultationHeaderProps {
  patientData: PatientData;
  area: string;
  onBack: () => void;
  onSave: () => void;
  isLoading: boolean;
}

export function ConsultationHeader({
  patientData,
  area,
  onBack,
  onSave,
  isLoading,
}: ConsultationHeaderProps) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-medical mb-4 sm:mb-6">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2 self-start"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-medical rounded-full flex items-center justify-center flex-shrink-0">
                <Stethoscope className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground truncate">
                  Nova Consulta
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  <span className="block sm:inline">
                    Paciente: {patientData.fullName}
                  </span>
                  <span className="hidden sm:inline"> • </span>
                  <span className="block sm:inline">Área: {area}</span>
                </CardDescription>
              </div>
            </div>
          </div>

          <Button
            onClick={onSave}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 w-full lg:w-auto"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span className="sm:inline">Finalizar Consulta</span>
              </>
            )}
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
