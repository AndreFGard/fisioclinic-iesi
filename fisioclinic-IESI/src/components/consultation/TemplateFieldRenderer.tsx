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

      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={field.id} className="text-xs sm:text-sm">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderField()}
    </div>
  );
}
