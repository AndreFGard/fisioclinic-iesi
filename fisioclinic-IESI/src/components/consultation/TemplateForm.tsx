import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TemplateOption } from "./types";
import { TemplateFieldRenderer } from "./TemplateFieldRenderer";

interface TemplateFormProps {
  template: TemplateOption;
  templateData: Record<string, any>;
  onFieldChange: (fieldId: string, value: any) => void;
  onChangeTemplate: () => void;
}

export function TemplateForm({
  template,
  templateData,
  onFieldChange,
  onChangeTemplate,
}: TemplateFormProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h3 className="text-base sm:text-lg font-semibold">
            {template.name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {template.description}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={onChangeTemplate}
          className="w-full sm:w-auto text-xs sm:text-sm"
        >
          Trocar Modelo
        </Button>
      </div>

      <Separator />

      <div className="space-y-4 sm:space-y-6">
        {template.fields.map((field) => (
          <TemplateFieldRenderer
            key={field.id}
            field={field}
            value={templateData[field.id] || ""}
            onFieldChange={onFieldChange}
          />
        ))}
      </div>
    </div>
  );
}
