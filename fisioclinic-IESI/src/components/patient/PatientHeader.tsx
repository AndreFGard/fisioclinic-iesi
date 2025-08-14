import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, ArrowLeft, PlayCircle, Edit3, Check, X } from "lucide-react";
import { PatientData, SelectOption } from "./types";
import { getStatusBadge, calculateAge, getPriorityBadge } from "./utils";

interface PatientHeaderProps {
  patientData: PatientData;
  priorityOptions: SelectOption[];
  onBack?: () => void;
  onPriorityChange?: (priority: string) => void;
}

export default function PatientHeader({
  patientData,
  priorityOptions,
  onBack,
  onPriorityChange,
}: PatientHeaderProps) {
  const navigate = useNavigate();
  const [isEditingPriority, setIsEditingPriority] = useState(false);
  const [tempPriority, setTempPriority] = useState(patientData.priority);

  const handleSavePriority = () => {
    if (onPriorityChange) {
      onPriorityChange(tempPriority);
    }
    setIsEditingPriority(false);
  };

  const handleCancelPriority = () => {
    setTempPriority(patientData.priority);
    setIsEditingPriority(false);
  };

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
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0">
                      {getStatusBadge(patientData.status)}
                    </div>
                    <span className="hidden sm:inline">•</span>
                    <div className="flex items-center gap-1">
                      {!isEditingPriority ? (
                        <>
                          {getPriorityBadge(patientData.priority)}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsEditingPriority(true)}
                            className="h-6 w-6 p-0 ml-1"
                          >
                            <Edit3 className="h-3 w-3" />
                          </Button>
                        </>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Select
                            value={tempPriority}
                            onValueChange={(value) =>
                              setTempPriority(
                                value as "baixa" | "media" | "alta" | "urgente"
                              )
                            }
                          >
                            <SelectTrigger className="h-6 w-20 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {priorityOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                  className="text-xs"
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleSavePriority}
                            className="h-6 w-6 p-0 text-green-600"
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCancelPriority}
                            className="h-6 w-6 p-0 text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
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
