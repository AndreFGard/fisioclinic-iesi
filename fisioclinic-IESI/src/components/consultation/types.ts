export interface ConsultationData {
  patientId: string;
  date: Date;
  time: string;
  professional: string;
  student: string
  area: string;
  type: "consulta" | "retorno" | "avaliacao";
  observations: string;
  nextAppointment?: Date;
  selectedTemplate: string;
  templateData: Record<string, any>;
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
    | "header";
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface PatientData {
  id: string;
  fullName: string;
  area: string;
}
