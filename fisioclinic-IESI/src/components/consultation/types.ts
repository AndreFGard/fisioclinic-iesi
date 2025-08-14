export interface ConsultationData {
  patientId: string;
  date: Date;
  time: string;
  professional: string;
  students: string;
  area: string;
  type: "consulta" | "retorno" | "avaliacao";
  observations: string;
  nextAppointment?: Date;
  selectedTemplate: string;
  templateData: Record<string, any>;
  // Novos campos para controle do prontuário
  isCreatingChart?: boolean; // Se é a primeira consulta criando o prontuário
  isEditingChart?: boolean; // Se está editando um prontuário existente
  existingChartData?: Record<string, any>; // Dados do prontuário existente para pré-preenchimento
}

export interface TemplateOption {
  id: string;
  name: string;
  area: string;
  description: string;
  fields: TemplateField[];
}

export interface TemplateField {
  id: string;
  type:
    | "text"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio"
    | "number"
    | "date"
    | "header"
    | "table"
    | "toggle";
  label: string;
  sublabel?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  consultImage?: string; // URL da imagem para consulta;
  imageLabel?: string;
  rows?: string[];
  columns?: string[];
  rowHeader?: boolean;
  pdfUrl?: string;
}

export interface PatientData {
  id: string;
  fullName: string;
  area: string;
}
