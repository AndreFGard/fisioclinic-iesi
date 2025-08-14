import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, FileText } from "lucide-react";
import { ReactNode } from "react";

interface ConsultationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: ReactNode;
}

export function ConsultationTabs({
  activeTab,
  onTabChange,
  children,
}: ConsultationTabsProps) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={onTabChange}
      className="space-y-4 sm:space-y-6"
    >
      <TabsList className="grid w-full grid-cols-2 bg-card/80 backdrop-blur-sm h-auto p-1">
        <TabsTrigger
          value="consultation"
          className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 py-2 sm:px-4"
        >
          <ClipboardList className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Dados da Consulta</span>
          <span className="sm:hidden">Consulta</span>
        </TabsTrigger>
        <TabsTrigger
          value="template"
          className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 py-2 sm:px-4"
        >
          <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Fichas Especializadas</span>
          <span className="sm:hidden">Fichas</span>
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
}
