import { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { TemplateField } from "./types";

interface TemplateFieldRendererProps {
  field: TemplateField;
  value: any;
  onFieldChange: (fieldId: string, value: any) => void;
}

export function TemplateFieldRenderer({
  field,
  value,
  onFieldChange,
}: TemplateFieldRendererProps) {
  const [showConsultImage, setShowConsultImage] = useState(false);
  const [openToggles, setOpenToggles] = useState<Record<string, boolean>>({}); // novo

  // Para headers, renderizamos o título e sublabel se existir
  if (field.type === "header") {
    return (
      <div className="mb-4 mt-6 first:mt-0">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900">
          {field.label}
        </h3>
        {field.sublabel && (
          <p className="text-xs text-muted-foreground mt-1 mb-2 italic">
            {field.sublabel}
          </p>
        )}
        <div className="border-b border-gray-200 mt-2"></div>
      </div>
    );
  }

  const isToggleOpen = openToggles[field.id] ?? false;

  const renderField = () => {
    switch (field.type) {
      case "text":
      case "number":
        return (
          <Input
            type={field.type}
            value={value}
            onChange={(e) => onFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className="h-8 sm:h-11 text-xs sm:text-sm"
          />
        );

      case "textarea":
        return (
          <Textarea
            value={value}
            onChange={(e) => onFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className="min-h-[60px] sm:min-h-[100px] text-xs sm:text-sm resize-none"
          />
        );

      case "select":
        return (
          <Select
            value={value}
            onValueChange={(val) => onFieldChange(field.id, val)}
          >
            <SelectTrigger className="h-8 sm:h-11 text-xs sm:text-sm">
              <SelectValue
                placeholder={`Selecione ${field.label.toLowerCase()}`}
              />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className="text-xs sm:text-sm"
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "radio":
        return (
          <RadioGroup
            value={value}
            onValueChange={(val) => onFieldChange(field.id, val)}
            className="flex flex-col space-y-1 sm:space-y-2"
          >
            {field.options?.map((option) => (
              <div
                key={option}
                className="flex items-center space-x-1 sm:space-x-2"
              >
                <RadioGroupItem
                  value={option}
                  id={`${field.id}-${option}`}
                  className="h-3 w-3 sm:h-4 sm:w-4"
                />
                <Label
                  htmlFor={`${field.id}-${option}`}
                  className="text-xs sm:text-sm"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "checkbox":
        const checkedValues = Array.isArray(value) ? value : [];
        return (
          <div className="flex flex-col space-y-1 sm:space-y-2">
            {field.options?.map((option) => (
              <div
                key={option}
                className="flex items-center space-x-1 sm:space-x-2"
              >
                <Checkbox
                  id={`${field.id}-${option}`}
                  checked={checkedValues.includes(option)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onFieldChange(field.id, [...checkedValues, option]);
                    } else {
                      onFieldChange(
                        field.id,
                        checkedValues.filter((v: string) => v !== option)
                      );
                    }
                  }}
                  className="h-3 w-3 sm:h-4 sm:w-4"
                />
                <Label
                  htmlFor={`${field.id}-${option}`}
                  className="text-xs sm:text-sm"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );

      case "date":
        return (
          <DatePicker
            date={value ? new Date(value) : undefined}
            setDate={(date) => onFieldChange(field.id, date)}
            placeholder={field.placeholder || "Selecione uma data"}
            fromYear={1920}
            toYear={new Date().getFullYear() + 1}
            fromDate={new Date(1920, 0, 1)}
            toDate={new Date(new Date().getFullYear() + 1, 11, 31)}
            closeOnSelect
            showFooterActions
            className="h-8 sm:h-11"
          />
        );

      case "table": {
        const cfg = field as any;
        const columns: string[] = cfg.columns || [];
        const rows: string[] = cfg.rows || [];
        const rowHeader: boolean = cfg.rowHeader ?? true;
        const tableValue =
          (value as Record<string, Record<string, string>>) || {};

        const handleCellChange = (
          rowKey: string,
          colKey: string,
          cellVal: string
        ) => {
          const next = {
            ...(tableValue || {}),
            [rowKey]: { ...(tableValue?.[rowKey] || {}), [colKey]: cellVal },
          };
          onFieldChange(field.id, next);
        };

        return (
          <div className="w-full overflow-x-auto">
            <table className="w-full table-auto border-collapse text-xs sm:text-sm">
              <thead>
                <tr>
                  {rowHeader && (
                    <th className="border border-gray-200 bg-gray-50 px-2 py-1 text-left font-medium w-36"></th>
                  )}
                  {columns.map((col) => (
                    <th
                      key={col}
                      className="border border-gray-200 bg-gray-50 px-2 py-1 text-left font-medium"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => {
                  const rk = rowHeader ? row : `row_${idx}`;
                  return (
                    <tr key={rk}>
                      {rowHeader && (
                        <th
                          scope="row"
                          className="border border-gray-200 bg-gray-50 px-2 py-1 text-left font-normal align-top"
                        >
                          {row || ""}
                        </th>
                      )}
                      {columns.map((col) => (
                        <td
                          key={col}
                          className="border border-gray-200 p-1 align-top"
                        >
                          <Textarea
                            value={tableValue?.[rk]?.[col] ?? ""}
                            onChange={(e) =>
                              handleCellChange(rk, col, e.target.value)
                            }
                            className="min-h-[40px] sm:min-h-[60px] text-xs sm:text-sm resize-y"
                            placeholder=""
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      }

      case "toggle": {
        return isToggleOpen ? (
          <div className="mt-2 p-3 border border-gray-200 rounded-lg bg-gray-50 text-xs sm:text-sm whitespace-pre-wrap overflow-x-auto">
            {(field as any).content}
          </div>
        ) : null;
      }

      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={field.id} className="text-xs sm:text-sm">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {field.consultImage && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowConsultImage(!showConsultImage)}
            className="h-6 px-2 text-xs"
          >
            {showConsultImage ? (
              <>
                <EyeOff className="h-3 w-3 mr-1" />
                Ocultar
              </>
            ) : (
              <>
                <Eye className="h-3 w-3 mr-1" />
                Consultar {field.imageLabel}
              </>
            )}
          </Button>
        )}
        {field.type === "toggle" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setOpenToggles((prev) => ({ ...prev, [field.id]: !isToggleOpen }))
            }
            className="h-6 px-2 text-xs"
          >
            {isToggleOpen ? (
              <>
                <EyeOff className="h-3 w-3 mr-1" />
                Ocultar
              </>
            ) : (
              <>
                <Eye className="h-3 w-3 mr-1" />
                Mostrar
              </>
            )}
          </Button>
        )}
      </div>
      {field.sublabel && (
        <p className="text-xs text-muted-foreground mt-1 mb-2">
          {field.sublabel}
        </p>
      )}
      {renderField()}
      {/* consultImage movida para baixo do input */}
      {field.consultImage && showConsultImage && (
        <div className="mt-3 p-2 border border-gray-200 rounded-lg flex flex-col items-center">
          <img
            src={field.consultImage}
            alt={`Imagem de consulta para ${field.label}`}
            className="max-w-full h-auto rounded mx-auto"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              (e.currentTarget
                .nextElementSibling as HTMLElement)!.style.display = "block";
            }}
          />
          <div className="hidden text-xs text-muted-foreground text-center py-4">
            Imagem não disponível
          </div>
        </div>
      )}
    </div>
  );
}
