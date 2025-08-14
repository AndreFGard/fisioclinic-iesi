import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { TemplateOption } from "./types";

interface TemplateSelectionProps {
  templates: TemplateOption[];
  onTemplateSelect: (templateId: string) => void;
}

export function TemplateSelection({
  templates,
  onTemplateSelect,
}: TemplateSelectionProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-base sm:text-lg font-semibold">
        Selecione um Modelo de Ficha:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary/20"
            onClick={() => onTemplateSelect(template.id)}
          >
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="h-3 w-3 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground text-sm sm:text-base truncate">
                    {template.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                    {template.description}
                  </p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {template.area}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
