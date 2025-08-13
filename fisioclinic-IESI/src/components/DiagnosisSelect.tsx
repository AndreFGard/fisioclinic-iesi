import * as React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

export interface Option {
  value: string;
  label: string;
}

interface DiagnosisSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  allowCreate?: boolean;
  createLabel?(text: string): string;
  className?: string;
}

export function DiagnosisSelect({
  value,
  onChange,
  options,
  placeholder = "Selecione o diagnóstico",
  allowCreate = true,
  createLabel = (t) => `Adicionar "${t}"`,
  className,
}: DiagnosisSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const selected = options.find((o) => o.value === value);
  const display = selected?.label ?? (value ? value : "");

  const normalizedQuery = query.trim();
  const exists = options.some(
    (o) => o.value.toLowerCase() === normalizedQuery.toLowerCase()
  );

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  const handleCreate = () => {
    if (!normalizedQuery) return;
    onChange(normalizedQuery);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "h-11 w-full justify-between font-normal text-primary-foreground hover:text-primary-foreground group",
            className
          )}
        >
          <span
            className={cn(
              !display && "text-muted-foreground group-hover:text-white"
            )}
          >
            {display || placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeholder}
            value={query}
            onValueChange={setQuery}
          />
          <CommandEmpty>
            {allowCreate && normalizedQuery && !exists ? (
              <div className="p-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={handleCreate}
                >
                  <Plus className="mr-2 h-4 w-4" />{" "}
                  {createLabel(normalizedQuery)}
                </Button>
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">
                Nenhum resultado
              </span>
            )}
          </CommandEmpty>
          <CommandGroup>
            {options.map((opt) => (
              <CommandItem
                key={opt.value}
                value={opt.value}
                onSelect={() => handleSelect(opt.value)}
                className="font-normal"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === opt.value ? "opacity-100" : "opacity-0"
                  )}
                />
                <span className="font-normal">{opt.label}</span>
              </CommandItem>
            ))}
            {allowCreate && normalizedQuery && !exists && (
              <CommandItem
                value={`__create__:${normalizedQuery}`}
                onSelect={handleCreate}
                className="font-normal"
              >
                <Plus className="mr-2 h-4 w-4" />{" "}
                <span className="font-normal">
                  {createLabel(normalizedQuery)}
                </span>
              </CommandItem>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default DiagnosisSelect;
