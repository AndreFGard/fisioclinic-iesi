"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { ptBR } from "date-fns/locale";
import type { Matcher } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  fromYear?: number;
  toYear?: number;
  placeholder?: string;
  fromDate?: Date;
  toDate?: Date;
  disabled?: Matcher | Matcher[];
  closeOnSelect?: boolean;
  showFooterActions?: boolean;
  todayLabel?: string;
  clearLabel?: string;
  invalid?: boolean;
  className?: string;
}

export function DatePicker({
  date,
  setDate,
  fromYear,
  toYear,
  placeholder,
  fromDate,
  toDate,
  disabled,
  closeOnSelect = true,
  showFooterActions = true,
  todayLabel = "Hoje",
  clearLabel = "Limpar",
  invalid,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (d?: Date) => {
    setDate(d);
    if (closeOnSelect) setOpen(false);
  };

  const setToday = () => {
    const today = new Date();
    setDate(today);
    setOpen(false);
  };

  const clear = () => {
    setDate(undefined);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal h-8 sm:h-11 text-xs sm:text-sm",
            invalid && "border-destructive focus-visible:ring-destructive",
            !date && "text-muted-foreground",
            className
          )}
          aria-invalid={invalid ? true : undefined}
          aria-label={
            date
              ? `Data selecionada: ${format(date, "dd/MM/yyyy", {
                  locale: ptBR,
                })}`
              : "Abrir seletor de data"
          }
        >
          <CalendarIcon className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          {date ? (
            format(date, "dd/MM/yyyy", { locale: ptBR })
          ) : (
            <span className="truncate">
              {placeholder ?? "Selecione a data"}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" sideOffset={6}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          captionLayout="dropdown"
          fromYear={fromYear}
          toYear={toYear}
          fromDate={fromDate}
          toDate={toDate}
          disabled={disabled}
          locale={ptBR}
          labels={{
            labelMonthDropdown: () => "Mês",
            labelYearDropdown: () => "Ano",
            labelPrevious: () => "Mês anterior",
            labelNext: () => "Próximo mês",
          }}
          initialFocus
        />
        {showFooterActions && (
          <div className="flex items-center justify-between gap-1 sm:gap-2 border-t p-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={setToday}
              className="text-xs sm:text-sm px-2 sm:px-3"
            >
              {todayLabel}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clear}
              className="text-xs sm:text-sm px-2 sm:px-3"
            >
              {clearLabel}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
