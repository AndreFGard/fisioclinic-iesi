import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { DatePicker } from "@/components/ui/date-picker";
import { TimeSelect } from "@/components/TimeSelect";
import { ClipboardList } from "lucide-react";
import { ConsultationData } from "./types";

interface ConsultationBasicDataProps {
  consultationData: ConsultationData;
  onInputChange: (field: keyof ConsultationData, value: any) => void;
}

export function ConsultationBasicData({
  consultationData,
  onInputChange,
}: ConsultationBasicDataProps) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-medical">
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <ClipboardList className="h-4 w-4 sm:h-5 sm:w-5" />
          Informações da Consulta
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Registre os dados básicos da consulta
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-2">
            <Label htmlFor="date" className="text-xs sm:text-sm">
              Data da Consulta
            </Label>
            <DatePicker
              date={consultationData.date}
              setDate={(date) => onInputChange("date", date)}
              placeholder="Selecione a data da consulta"
              fromYear={2020}
              toYear={new Date().getFullYear() + 1}
              fromDate={new Date(2020, 0, 1)}
              toDate={new Date(new Date().getFullYear() + 1, 11, 31)}
              closeOnSelect
              showFooterActions
              className="h-8 sm:h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="text-xs sm:text-sm">
              Horário
            </Label>
            <TimeSelect
              value={consultationData.time}
              onValueChange={(value) => onInputChange("time", value)}
              placeholder="Selecione o horário"
              className="h-8 sm:h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-xs sm:text-sm">
              Tipo de Consulta
            </Label>
            <Select
              value={consultationData.type}
              onValueChange={(value) => onInputChange("type", value)}
            >
              <SelectTrigger className="h-8 sm:h-11 text-xs sm:text-sm">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consulta">Consulta</SelectItem>
                <SelectItem value="retorno">Retorno</SelectItem>
                <SelectItem value="avaliacao">Avaliação</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="professional" className="text-xs sm:text-sm">
              Fisioterapeuta Responsável
            </Label>
            <Input
              id="professional"
              value={consultationData.professional}
              onChange={(e) => onInputChange("professional", e.target.value)}
              placeholder="Nome do profissional"
              className="h-8 sm:h-11 text-xs sm:text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="students" className="text-xs sm:text-sm">
              Acadêmicos
            </Label>
            <Input
              id="students"
              value={consultationData.students || ""}
              onChange={(e) => onInputChange("students", e.target.value)}
              placeholder="Nome dos alunos"
              className="h-8 sm:h-11 text-xs sm:text-sm"
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-2">
            <Label htmlFor="observations" className="text-xs sm:text-sm">
              Observações Gerais
            </Label>
            <Textarea
              id="observations"
              value={consultationData.observations}
              onChange={(e) => onInputChange("observations", e.target.value)}
              placeholder="Observações adicionais sobre a consulta"
              className="min-h-[60px] sm:min-h-[100px] text-xs sm:text-sm resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs sm:text-sm">Próximo Agendamento</Label>
            <DatePicker
              date={consultationData.nextAppointment}
              setDate={(date) => onInputChange("nextAppointment", date)}
              placeholder="Selecione a data do próximo agendamento (opcional)"
              fromYear={new Date().getFullYear()}
              toYear={new Date().getFullYear() + 2}
              fromDate={new Date()}
              toDate={new Date(new Date().getFullYear() + 2, 11, 31)}
              closeOnSelect
              showFooterActions
              className="h-8 sm:h-11"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
