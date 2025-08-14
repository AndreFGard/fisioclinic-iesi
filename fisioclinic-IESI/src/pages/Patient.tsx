import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  PatientHeader,
  PatientTabs,
  PatientData,
  ConsultationRecord,
  MedicalRecord,
  mockPatientData,
  mockConsultations,
  mockMedicalRecords,
  areaOptions,
  diagnosisOptions,
} from "@/components/patient";

export default function Patient() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState<PatientData>(mockPatientData);
  const [consultations] = useState<ConsultationRecord[]>(mockConsultations);
  const [medicalRecords] = useState<MedicalRecord[]>(mockMedicalRecords);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("personal-data");

  const handleInputChange = (field: keyof PatientData, value: any) => {
    setPatientData((prev) => ({
      ...prev,
      [field]: value,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto w-full">
        <PatientHeader patientData={patientData} onBack={handleBack} />

        <PatientTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          patientData={patientData}
          consultations={consultations}
          medicalRecords={medicalRecords}
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
