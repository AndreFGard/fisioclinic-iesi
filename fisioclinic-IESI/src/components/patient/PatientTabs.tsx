import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCheck, History, ClipboardList } from "lucide-react";
import {
  PatientData,
  ConsultationRecord,
  MedicalRecord,
  SelectOption,
} from "./types";
import PersonalDataTab from "./tabs/PersonalDataTab";
import HistoryTab from "./tabs/HistoryTab";
import MedicalRecordsTab from "./tabs/MedicalRecordsTab";

interface PatientTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  patientData: PatientData;
  consultations: ConsultationRecord[];
  medicalRecords: MedicalRecord[];
  isEditing: boolean;
  isLoading: boolean;
  areaOptions: SelectOption[];
  diagnosisOptions: SelectOption[];
  onInputChange: (field: keyof PatientData, value: any) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function PatientTabs({
  activeTab,
  onTabChange,
  patientData,
  consultations,
  medicalRecords,
  isEditing,
  isLoading,
  areaOptions,
  diagnosisOptions,
  onInputChange,
  onEdit,
  onSave,
  onCancel,
}: PatientTabsProps) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={onTabChange}
      className="space-y-4 sm:space-y-6"
    >
      <TabsList className="grid w-full grid-cols-3 bg-card/80 backdrop-blur-sm h-auto p-1">
        <TabsTrigger
          value="personal-data"
          className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 py-2 sm:px-4"
        >
          <UserCheck className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Dados Pessoais</span>
          <span className="sm:hidden">Dados Pessoais</span>
        </TabsTrigger>
        <TabsTrigger
          value="history"
          className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 py-2 sm:px-4"
        >
          <History className="h-3 w-3 sm:h-4 sm:w-4" />
          Histórico
        </TabsTrigger>
        <TabsTrigger
          value="medical-records"
          className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 py-2 sm:px-4"
        >
          <ClipboardList className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Prontuário</span>
          <span className="sm:hidden">Prontuário</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="personal-data">
        <PersonalDataTab
          patientData={patientData}
          isEditing={isEditing}
          isLoading={isLoading}
          areaOptions={areaOptions}
          diagnosisOptions={diagnosisOptions}
          onInputChange={onInputChange}
          onEdit={onEdit}
          onSave={onSave}
          onCancel={onCancel}
        />
      </TabsContent>

      <TabsContent value="history">
        <HistoryTab consultations={consultations} />
      </TabsContent>

      <TabsContent value="medical-records">
        <MedicalRecordsTab medicalRecords={medicalRecords} />
      </TabsContent>
    </Tabs>
  );
}
