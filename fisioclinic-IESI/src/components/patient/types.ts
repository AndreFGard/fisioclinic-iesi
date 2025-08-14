export interface PatientData {
  id: string;
  // Dados pessoais
  fullName: string;
  cpf: string;
  birthDate: Date | undefined;
  gender: string;

  // Contato
  cellphone: string;
  cellphone2: string;
  neighborhood: string;
  city: string;

  // Dados clínicos
  diagnosis: string;
  area: string;
  hospital: string;
  doctor: string;
  seekDate: Date | undefined;
  status: string;
  priority: "baixa" | "media" | "alta" | "urgente"; // Novo campo de prioridade
  observations: string;
}

export interface ConsultationRecord {
  id: string;
  date: Date;
  type: "consulta" | "retorno" | "avaliacao";
  professional: string;
  observations: string;
  documents: DocumentRecord[];
  status: "realizada" | "agendada" | "cancelada";
}

export interface DocumentRecord {
  id: string;
  type: "atestado" | "declaracao" | "receita" | "exame" | "relatorio";
  name: string;
  date: Date;
  url?: string;
}

export interface MedicalRecord {
  id: string;
  type:
    | "ficha-atendimento"
    | "declaracao"
    | "atestado"
    | "receita"
    | "relatorio";
  title: string;
  date: Date;
  professional: string;
  status: "ativo" | "arquivado";
  downloadUrl?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

// Novo tipo para o prontuário
export interface MedicalChart {
  id: string;
  patientId: string;
  currentVersion: MedicalChartVersion;
  versions: MedicalChartVersion[];
  status: "ativo" | "arquivado";
  createdAt: Date;
  updatedAt: Date;
}

export interface MedicalChartVersion {
  id: string;
  versionNumber: number;
  consultationData: any; // Dados básicos da consulta (da aba consultation)
  templateData: any; // Dados do template preenchido
  templateId: string;
  templateName: string;
  professional: string;
  date: Date;
  isActive: boolean;
}

// Histórico de diferenças entre versões
export interface MedicalChartDiff {
  consultationId: string;
  consultationType: "consulta" | "retorno" | "avaliacao"; // Tipo da consulta que gerou a mudança
  previousVersion?: MedicalChartVersion;
  currentVersion: MedicalChartVersion;
  changes: ChartFieldChange[];
  date: Date;
  professional: string;
}

export interface ChartFieldChange {
  fieldId: string;
  fieldLabel: string;
  previousValue: any;
  newValue: any;
  changeType: "added" | "modified" | "removed";
}
