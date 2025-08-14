import { useState, useEffect } from "react";
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
// Usar o hook personalizado para gerenciar o prontuário
import { useMedicalChart } from "@/hooks/useMedicalChart";

export default function Consultation() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Usar o hook customizado para gerenciar o prontuário
  const {
    medicalChart: existingChart,
    createMedicalChart,
    updateMedicalChart,
  } = useMedicalChart(id || "1");

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
    // Novos campos para controle do prontuário
    isCreatingChart: !existingChart, // Se não existe prontuário, está criando
    isEditingChart: !!existingChart, // Se existe prontuário, está editando
    existingChartData: existingChart?.currentVersion.templateData || {},
  });

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("consultation");
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateOption | null>(null);
  const [isChangingTemplate, setIsChangingTemplate] = useState(false);

  // Filtrar templates pela área do paciente
  const availableTemplates = clinicTemplates.filter(
    (template) =>
      template.area === consultationData.area || template.area === "geral"
  );

  // Atualizar estados quando o prontuário existente mudar
  useEffect(() => {
    setConsultationData((prev) => ({
      ...prev,
      isCreatingChart: !existingChart,
      isEditingChart: !!existingChart,
      existingChartData: existingChart?.currentVersion.templateData || {},
    }));
  }, [existingChart]);

  // Pre-selecionar template se existe prontuário (apenas na inicialização)
  useEffect(() => {
    if (
      existingChart &&
      !selectedTemplate &&
      consultationData.selectedTemplate === "" &&
      !isChangingTemplate
    ) {
      const existingTemplate = clinicTemplates.find(
        (t) => t.id === existingChart.currentVersion.templateId
      );
      if (existingTemplate) {
        setSelectedTemplate(existingTemplate);
        setConsultationData((prev) => ({
          ...prev,
          selectedTemplate: existingTemplate.id,
          templateData: { ...existingChart.currentVersion.templateData },
        }));
      }
    }
  }, [existingChart, isChangingTemplate]);

  const handleInputChange = (field: keyof ConsultationData, value: any) => {
    setConsultationData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = clinicTemplates.find((t) => t.id === templateId);
    setSelectedTemplate(template || null);
    setIsChangingTemplate(false); // Reset do estado de mudança

    setConsultationData((prev) => ({
      ...prev,
      selectedTemplate: templateId,
      templateData: consultationData.isEditingChart
        ? { ...prev.existingChartData } // Mantém dados existentes se editando
        : {}, // Limpa se criando novo
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
      if (!selectedTemplate) {
        alert("Por favor, selecione um template antes de salvar.");
        return;
      }

      console.log("Dados da consulta:", consultationData);

      if (consultationData.isCreatingChart) {
        console.log("Criando primeiro prontuário...");
        const newChart = createMedicalChart(
          consultationData,
          consultationData.templateData,
          selectedTemplate.id,
          selectedTemplate.name
        );
        console.log("Prontuário criado:", newChart);
      } else if (consultationData.isEditingChart && existingChart) {
        console.log("Atualizando prontuário existente...");
        const { chart, diff } = updateMedicalChart(
          consultationData,
          consultationData.templateData,
          selectedTemplate.id,
          selectedTemplate.name,
          existingChart.currentVersion
        );
        console.log("Prontuário atualizado:", chart);
        console.log("Mudanças detectadas:", diff);
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const successMessage = consultationData.isCreatingChart
        ? "Consulta registrada e prontuário criado com sucesso!"
        : "Consulta registrada e prontuário atualizado com sucesso!";

      alert(successMessage);
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
    setIsChangingTemplate(true);
    setSelectedTemplate(null);
    setConsultationData((prev) => ({
      ...prev,
      selectedTemplate: "",
      templateData: prev.isEditingChart ? { ...prev.existingChartData } : {},
    }));
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

        {/* Indicador do estado do prontuário */}
        {consultationData.isCreatingChart && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                Criando primeiro prontuário do paciente
              </span>
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              Esta consulta iniciará o prontuário médico do paciente com os
              dados preenchidos.
            </p>
          </div>
        )}

        {consultationData.isEditingChart && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Editando prontuário existente
              </span>
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              As alterações feitas serão registradas no histórico do prontuário.
            </p>
          </div>
        )}

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
