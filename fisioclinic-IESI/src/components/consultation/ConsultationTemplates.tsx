import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText } from "lucide-react";
import { TemplateOption, ConsultationData } from "./types";
import { TemplateSelection } from "./TemplateSelection";
import { TemplateForm } from "./TemplateForm";

interface ConsultationTemplatesProps {
  consultationData: ConsultationData;
  availableTemplates: TemplateOption[];
  selectedTemplate: TemplateOption | null;
  onTemplateSelect: (templateId: string) => void;
  onTemplateFieldChange: (fieldId: string, value: any) => void;
  onChangeTemplate: () => void;
}

export function ConsultationTemplates({
  consultationData,
  availableTemplates,
  selectedTemplate,
  onTemplateSelect,
  onTemplateFieldChange,
  onChangeTemplate,
}: ConsultationTemplatesProps) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-medical">
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
          Fichas Especializadas por Área
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Selecione um modelo de ficha específico para a área de{" "}
          {consultationData.area}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {!selectedTemplate ? (
          <TemplateSelection
            templates={availableTemplates}
            onTemplateSelect={onTemplateSelect}
          />
        ) : (
          <TemplateForm
            template={selectedTemplate}
            templateData={consultationData.templateData}
            onFieldChange={onTemplateFieldChange}
            onChangeTemplate={onChangeTemplate}
          />
        )}
      </CardContent>
    </Card>
  );
}
