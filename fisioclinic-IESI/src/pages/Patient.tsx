import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  PatientHeader,
  PatientTabs,
  PatientData,
  ConsultationRecord,
  MedicalRecord,
  getPatientData,
  getConsultationsByPatient,
  getMedicalChartByPatient,
  getMedicalChartDiffsByPatient,
  areaOptions,
  diagnosisOptions,
  priorityOptions,
} from "@/components/patient";
import { useMedicalChart } from "@/hooks/useMedicalChart";

export default function Patient() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [consultations, setConsultations] = useState<ConsultationRecord[]>([]);
  const [mockDiffs, setMockDiffs] = useState<any[]>([]);

  // Usar o hook customizado para gerenciar o prontuário
  const {
    medicalChart,
    isLoading: chartLoading,
    diffs,
  } = useMedicalChart(id || "1");

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("personal-data");

  // Carregar dados do paciente baseado no ID
  useEffect(() => {
    if (id) {
      const patient = getPatientData(id);
      if (patient) {
        setPatientData(patient);

        // Carregar consultas do paciente
        const patientConsultations = getConsultationsByPatient(id);
        setConsultations(patientConsultations);

        // Carregar diffs mockados para o paciente (se existirem e não houver dados no localStorage)
        const patientDiffs = getMedicalChartDiffsByPatient(id);
        setMockDiffs(patientDiffs);
      } else {
        // Paciente não encontrado, redirecionar ou mostrar erro
        navigate("/");
      }
    }
  }, [id, navigate]);

  // Se os dados do paciente ainda não foram carregados, mostrar loading
  if (!patientData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Carregando dados do paciente...
          </p>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: keyof PatientData, value: any) => {
    setPatientData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePriorityChange = (priority: string) => {
    setPatientData((prev) => ({
      ...prev,
      priority: priority as "baixa" | "media" | "alta" | "urgente",
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Aqui você implementaria a lógica de salvamento
      console.log("Dados atualizados:", patientData);

      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsEditing(false);
      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      alert("Erro ao atualizar dados. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleBack = () => {
    navigate("/");
  };

  // Usar prontuário do localStorage se existir, senão usar dados mockados
  const currentMedicalChart =
    medicalChart || getMedicalChartByPatient(id || "");
  const currentDiffs = diffs.length > 0 ? diffs : mockDiffs;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto w-full">
        <PatientHeader
          patientData={patientData}
          priorityOptions={priorityOptions}
          onBack={handleBack}
          onPriorityChange={handlePriorityChange}
        />

        <PatientTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          patientData={patientData}
          consultations={consultations}
          medicalRecords={[]}
          medicalChart={currentMedicalChart}
          medicalChartDiffs={currentDiffs}
          isEditing={isEditing}
          isLoading={isLoading}
          areaOptions={areaOptions}
          diagnosisOptions={diagnosisOptions}
          onInputChange={handleInputChange}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
