import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

// Gerar horários de 30 em 30 minutos das 6:00 às 22:00
const generateTimeOptions = () => {
  const times = [];
  for (let hour = 6; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const hourStr = hour.toString().padStart(2, "0");
      const minuteStr = minute.toString().padStart(2, "0");
      const timeValue = `${hourStr}:${minuteStr}`;
      times.push(timeValue);
    }
  }
  return times;
};

const timeOptions = generateTimeOptions();

export function TimeSelect({
  value,
  onValueChange,
  placeholder = "Selecione o horário",
  className,
}: TimeSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn("w-full h-8 sm:h-11 text-xs sm:text-sm", className)}
      >
        <div className="flex items-center gap-1 sm:gap-2">
          <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent className="max-h-60">
        {timeOptions.map((time) => (
          <SelectItem key={time} value={time} className="text-xs sm:text-sm">
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
