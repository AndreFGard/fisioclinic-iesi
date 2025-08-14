import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TabsContent } from "@/components/ui/tabs";
import {
  ConsultationHeader,
  ConsultationTabs,
  ConsultationBasicData,
  ConsultationTemplates,
  ConsultationData,
  TemplateOption,
  clinicTemplates,
  mockPatientData,
} from "@/components/consultation";

export default function Consultation() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [consultationData, setConsultationData] = useState<ConsultationData>({
    patientId: id || "",
    date: new Date(),
    time: new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    professional: "",
    students: "",
    area: mockPatientData.area,
    type: "consulta",
    observations: "",
    selectedTemplate: "",
    templateData: {},
  });

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("consultation");
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateOption | null>(null);

  // Filtrar templates pela área do paciente
  const availableTemplates = clinicTemplates.filter(
    (template) =>
      template.area === consultationData.area || template.area === "geral"
  );

  const handleInputChange = (field: keyof ConsultationData, value: any) => {
    setConsultationData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = clinicTemplates.find((t) => t.id === templateId);
    setSelectedTemplate(template || null);
    setConsultationData((prev) => ({
      ...prev,
      selectedTemplate: templateId,
      templateData: {},
    }));
  };

  const handleTemplateFieldChange = (fieldId: string, value: any) => {
    setConsultationData((prev) => ({
      ...prev,
      templateData: {
        ...prev.templateData,
        [fieldId]: value,
      },
    }));
  };

  const handleSaveConsultation = async () => {
    setIsLoading(true);
    try {
      // Aqui você implementaria a lógica de salvamento
      console.log("Dados da consulta:", consultationData);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Consulta registrada com sucesso!");
      navigate(`/patient/${id}`);
    } catch (error) {
      console.error("Erro ao salvar consulta:", error);
      alert("Erro ao salvar consulta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate(`/patient/${id}`);
  };

  const handleChangeTemplate = () => {
    setSelectedTemplate(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto w-full space-y-4 sm:space-y-6">
        {/* Header */}
        <ConsultationHeader
          patientData={mockPatientData}
          area={consultationData.area}
          onBack={handleBack}
          onSave={handleSaveConsultation}
          isLoading={isLoading}
        />

        {/* Main Content */}
        <ConsultationTabs activeTab={activeTab} onTabChange={setActiveTab}>
          {/* Aba de Dados da Consulta */}
          <TabsContent value="consultation" className="space-y-4 sm:space-y-6">
            <ConsultationBasicData
              consultationData={consultationData}
              onInputChange={handleInputChange}
            />
          </TabsContent>

          {/* Aba de Templates/Fichas */}
          <TabsContent value="template" className="space-y-4 sm:space-y-6">
            <ConsultationTemplates
              consultationData={consultationData}
              availableTemplates={availableTemplates}
              selectedTemplate={selectedTemplate}
              onTemplateSelect={handleTemplateSelect}
              onTemplateFieldChange={handleTemplateFieldChange}
              onChangeTemplate={handleChangeTemplate}
            />
          </TabsContent>
        </ConsultationTabs>
      </div>
    </div>
  );
}
