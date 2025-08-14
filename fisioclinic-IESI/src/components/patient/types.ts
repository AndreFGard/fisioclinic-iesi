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
