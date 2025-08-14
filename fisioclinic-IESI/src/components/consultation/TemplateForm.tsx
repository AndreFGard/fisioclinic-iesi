import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TemplateOption } from "./types";
import { TemplateFieldRenderer } from "./TemplateFieldRenderer";
import logo from "@/assets/logo.png";

interface TemplateFormProps {
  template: TemplateOption;
  templateData: Record<string, any>;
  onFieldChange: (fieldId: string, value: any) => void;
  onChangeTemplate: () => void;
}

// Componente do header
function Header() {
  return (
    <div className="mb-6 p-4 border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={logo} alt="UFPE Logo" className="w-12 h-12 object-contain" />
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Universidade Federal de Pernambuco
            </h1>
            <p className="text-sm text-muted-foreground">
              Departamento de Fisioterapia
            </p>
          </div>
        </div>
      </div>
    </div>
  );
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
        <Header />
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
