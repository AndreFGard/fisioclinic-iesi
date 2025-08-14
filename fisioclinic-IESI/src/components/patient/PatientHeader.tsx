import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ArrowLeft, PlayCircle } from "lucide-react";
import { PatientData } from "./types";
import { getStatusBadge, calculateAge } from "./utils";

interface PatientHeaderProps {
  patientData: PatientData;
  onBack?: () => void;
}

export default function PatientHeader({
  patientData,
  onBack,
}: PatientHeaderProps) {
  const navigate = useNavigate();

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-medical mb-4 sm:mb-6">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack || (() => navigate("/"))}
              className="flex items-center gap-2 self-start"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-medical rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground truncate">
                  {patientData.fullName}
                </CardTitle>
                <CardDescription className="text-muted-foreground flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2 text-sm">
                  <span className="whitespace-nowrap">
                    {calculateAge(patientData.birthDate)} anos
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex-shrink-0">
                    {getStatusBadge(patientData.status)}
                  </div>
                </CardDescription>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2 w-full lg:w-auto">
            <Button
              onClick={() => navigate(`/consultation/${patientData.id}`)}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 w-full sm:w-auto"
            >
              <PlayCircle className="h-4 w-4" />
              <span className="sm:inline">Iniciar Atendimento</span>
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
