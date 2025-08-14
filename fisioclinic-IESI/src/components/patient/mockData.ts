import {
  PatientData,
  ConsultationRecord,
  MedicalRecord,
  SelectOption,
} from "./types";

// Mock data - em um ambiente real, isso viria de uma API
export const mockPatientData: PatientData = {
  id: "1",
  fullName: "Maria Silva Santos",
  cpf: "123.456.789-00",
  birthDate: new Date(1985, 5, 15),
  gender: "feminino",
  cellphone: "(11) 99999-9999",
  cellphone2: "(11) 8888-8888",
  neighborhood: "Vila Madalena",
  city: "São Paulo",
  diagnosis: "lombalgia",
  area: "ortopedia",
  hospital: "Hospital das Clínicas",
  doctor: "Dr. João Silva",
  seekDate: new Date(2024, 0, 15),
  status: "em-tratamento",
  observations:
    "Paciente com histórico de dores lombares recorrentes. Apresenta melhora significativa após início do tratamento.",
};

export const mockConsultations: ConsultationRecord[] = [
  {
    id: "1",
    date: new Date(2024, 7, 10),
    type: "consulta",
    professional: "Dra. Ana Costa",
    observations: "Primeira consulta. Avaliação inicial da lombalgia.",
    documents: [
      {
        id: "1",
        type: "relatorio",
        name: "Relatório de Avaliação Inicial",
        date: new Date(2024, 7, 10),
      },
    ],
    status: "realizada",
  },
  {
    id: "2",
    date: new Date(2024, 7, 17),
    type: "retorno",
    professional: "Dra. Ana Costa",
    observations: "Retorno - paciente apresenta melhora nos sintomas.",
    documents: [
      {
        id: "2",
        type: "atestado",
        name: "Atestado Médico",
        date: new Date(2024, 7, 17),
      },
    ],
    status: "realizada",
  },
  {
    id: "3",
    date: new Date(2024, 7, 20),
    type: "consulta",
    professional: "Dr. Carlos Lima",
    observations: "Sessão de fisioterapia agendada.",
    documents: [],
    status: "agendada",
  },
];

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: "1",
    type: "ficha-atendimento",
    title: "Ficha de Atendimento - Consulta Inicial",
    date: new Date(2024, 7, 10),
    professional: "Dra. Ana Costa",
    status: "ativo",
  },
  {
    id: "2",
    type: "declaracao",
    title: "Declaração de Comparecimento",
    date: new Date(2024, 7, 17),
    professional: "Dra. Ana Costa",
    status: "ativo",
  },
  {
    id: "3",
    type: "atestado",
    title: "Atestado Médico - 3 dias",
    date: new Date(2024, 7, 17),
    professional: "Dra. Ana Costa",
    status: "ativo",
  },
  {
    id: "4",
    type: "relatorio",
    title: "Relatório de Evolução",
    date: new Date(2024, 7, 24),
    professional: "Dr. Carlos Lima",
    status: "ativo",
  },
];

export const areaOptions: SelectOption[] = [
  { value: "ortopedia", label: "Ortopedia" },
  { value: "neurologia", label: "Neurologia" },
  { value: "cardiologia", label: "Cardiologia" },
  { value: "pediatria", label: "Pediatria" },
  { value: "geriatria", label: "Geriatria" },
  { value: "uroginecologia", label: "Uroginecologia" },
  { value: "respiratoria", label: "Respiratória" },
  { value: "esportiva", label: "Esportiva" },
  { value: "reumatologia", label: "Reumatologia" },
  { value: "outras", label: "Outras" },
];

export const diagnosisOptions: SelectOption[] = [
  { value: "demanda-espontanea", label: "Demanda Espontânea" },
  { value: "lombalgia", label: "Lombalgia" },
  { value: "lesao-ligamentar", label: "Lesão ligamentar" },
  { value: "avc", label: "AVC" },
  { value: "pneumopatia", label: "Pneumopatia" },
  { value: "fratura", label: "Fratura" },
  { value: "tendinite", label: "Tendinite" },
];
