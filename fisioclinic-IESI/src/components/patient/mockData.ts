import {
  PatientData,
  ConsultationRecord,
  MedicalRecord,
  SelectOption,
  MedicalChart,
  MedicalChartVersion,
  MedicalChartDiff,
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
  priority: "media", // Adicionar prioridade
  observations:
    "Paciente com histórico de dores lombares recorrentes. Apresenta melhora significativa após início do tratamento.",
};

// Segundo paciente para testes
export const mockPatientData2: PatientData = {
  id: "2",
  fullName: "Pedro Oliveira Costa",
  cpf: "987.654.321-00",
  birthDate: new Date(1978, 2, 28),
  gender: "masculino",
  cellphone: "(11) 77777-7777",
  cellphone2: "(11) 66666-6666",
  neighborhood: "Pinheiros",
  city: "São Paulo",
  diagnosis: "avc",
  area: "neurologia",
  hospital: "Hospital São Paulo",
  doctor: "Dra. Maria Fernanda",
  seekDate: new Date(2024, 1, 20),
  status: "aguardando",
  priority: "alta",
  observations:
    "Paciente pós-AVC em fase inicial de reabilitação. Apresenta hemiplegia à direita com necessidade de acompanhamento intensivo.",
};

// Função para obter dados do paciente por ID
export const getPatientData = (patientId: string): PatientData | null => {
  switch (patientId) {
    case "1":
      return mockPatientData;
    case "2":
      return mockPatientData2;
    default:
      return null;
  }
};

// Mock data das consultas - dados específicos por paciente
export const getConsultationsByPatient = (
  patientId: string
): ConsultationRecord[] => {
  switch (patientId) {
    case "1":
      return [];
    case "2":
      return [];
    default:
      return [];
  }
};

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

export const priorityOptions: SelectOption[] = [
  { value: "baixa", label: "Baixa" },
  { value: "media", label: "Média" },
  { value: "alta", label: "Alta" },
  { value: "urgente", label: "Urgente" },
];

// Função para obter prontuário por paciente
export const getMedicalChartByPatient = (
  patientId: string
): MedicalChart | null => {
  switch (patientId) {
    case "1":
      return mockExistingMedicalChart;
    case "2":
      return mockExistingMedicalChart2;
    default:
      return null;
  }
};

// Função para obter diffs do prontuário por paciente
export const getMedicalChartDiffsByPatient = (
  patientId: string
): MedicalChartDiff[] => {
  switch (patientId) {
    case "1":
      return mockMedicalChartDiffs;
    case "2":
      return mockMedicalChartDiffs2;
    default:
      return [];
  }
};

// Mock data do prontuário
export const mockMedicalChart: MedicalChart | null = null; // Inicialmente null - será criado ao iniciar primeiro atendimento

// Dados para prontuário já existente (paciente 1)
export const mockExistingMedicalChart: MedicalChart = {
  id: "chart-1",
  patientId: "1",
  status: "ativo",
  createdAt: new Date(2024, 7, 10),
  updatedAt: new Date(2024, 7, 24),
  currentVersion: {
    id: "version-2",
    versionNumber: 2,
    consultationData: {
      date: new Date(2024, 7, 24),
      time: "14:00",
      professional: "Dr. Carlos Lima",
      students: "João Pedro, Maria Silva",
      area: "neurologia",
      type: "retorno",
      observations: "Retorno - paciente apresenta melhora significativa",
    },
    templateData: {
      main_complaint:
        "Dor lombar com irradiação para MID, melhora com o tratamento",
      disease_history:
        "História da lombalgia iniciada há 6 meses. Tratamento em andamento com boa evolução.",
      medical_diagnosis_cid: "M54.5 - Lombalgia",
      rom_passive_active: "MMII: Flexão de quadril D: 90°, E: 95°",
      muscle_strength_detailed:
        "Força grau 4 em flexores de quadril bilateralmente",
      evolution:
        "Paciente evolui com melhora da dor. Redução de 8/10 para 3/10 na EVA.",
    },
    templateId: "neurofunctional-physiotherapy",
    templateName: "Ficha de Avaliação em Fisioterapia Neurofuncional",
    professional: "Dr. Carlos Lima",
    date: new Date(2024, 7, 24),
    isActive: true,
  },
  versions: [
    {
      id: "version-1",
      versionNumber: 1,
      consultationData: {
        date: new Date(2024, 7, 10),
        time: "10:00",
        professional: "Dra. Ana Costa",
        students: "",
        area: "neurologia",
        type: "consulta",
        observations: "Primeira consulta - avaliação inicial",
      },
      templateData: {
        main_complaint: "Dor lombar com irradiação para MID",
        disease_history: "História da lombalgia iniciada há 6 meses",
        medical_diagnosis_cid: "M54.5 - Lombalgia",
        rom_passive_active: "MMII: Flexão de quadril D: 80°, E: 85°",
        muscle_strength_detailed:
          "Força grau 3 em flexores de quadril bilateralmente",
        evolution: "Primeira avaliação",
      },
      templateId: "neurofunctional-physiotherapy",
      templateName: "Ficha de Avaliação em Fisioterapia Neurofuncional",
      professional: "Dra. Ana Costa",
      date: new Date(2024, 7, 10),
      isActive: false,
    },
    {
      id: "version-2",
      versionNumber: 2,
      consultationData: {
        date: new Date(2024, 7, 24),
        time: "14:00",
        professional: "Dr. Carlos Lima",
        students: "João Pedro, Maria Silva",
        area: "neurologia",
        type: "retorno",
        observations: "Retorno - paciente apresenta melhora significativa",
      },
      templateData: {
        main_complaint:
          "Dor lombar com irradiação para MID, melhora com o tratamento",
        disease_history:
          "História da lombalgia iniciada há 6 meses. Tratamento em andamento com boa evolução.",
        medical_diagnosis_cid: "M54.5 - Lombalgia",
        rom_passive_active: "MMII: Flexão de quadril D: 90°, E: 95°",
        muscle_strength_detailed:
          "Força grau 4 em flexores de quadril bilateralmente",
        evolution:
          "Paciente evolui com melhora da dor. Redução de 8/10 para 3/10 na EVA.",
      },
      templateId: "neurofunctional-physiotherapy",
      templateName: "Ficha de Avaliação em Fisioterapia Neurofuncional",
      professional: "Dr. Carlos Lima",
      date: new Date(2024, 7, 24),
      isActive: true,
    },
  ],
};

// Dados para prontuário já existente (paciente 2)
export const mockExistingMedicalChart2: MedicalChart = {
  id: "chart-2",
  patientId: "2",
  status: "ativo",
  createdAt: new Date(2024, 7, 5),
  updatedAt: new Date(2024, 7, 29),
  currentVersion: {
    id: "version-2-3",
    versionNumber: 3,
    consultationData: {
      date: new Date(2024, 7, 29),
      time: "16:00",
      professional: "Dra. Patricia Mendes",
      students: "Ana Beatriz, Carlos Eduardo",
      area: "neurologia",
      type: "retorno",
      observations:
        "Retorno - paciente demonstra pequenos progressos na mobilidade",
    },
    templateData: {
      main_complaint:
        "Hemiplegia à direita pós-AVC, dificuldade de mobilização, progressos lentos mas consistentes",
      disease_history:
        "Paciente sofreu AVC isquêmico há 4 meses. Iniciou fisioterapia há 3 semanas. Evolução gradual da mobilidade.",
      medical_diagnosis_cid: "I63.9 - Infarto cerebral não especificado",
      rom_passive_active:
        "MSD: Flexão de ombro: 45°, Flexão de cotovelo: 80°, MID: Flexão de quadril: 60°",
      muscle_strength_detailed:
        "MSD: Força grau 2 em flexores de ombro, grau 3 em flexores de cotovelo. MID: Força grau 2 em flexores de quadril",
      muscle_tone:
        "Hipertonia em MSD e MID, grau 2 na escala de Ashworth modificada",
      balance:
        "Sentado: mantém por 10 segundos com apoio. Em pé: não consegue manter sem auxílio",
      coordination:
        "Descoordenação importante em MSD, tremor intencional presente",
      functional_assessment:
        "Dependente para AVDs, necessita auxílio total para transferências",
      treatment_goals:
        "Melhorar mobilidade ativa, reduzir hipertonia, treinar transferências",
      treatment_plan:
        "Exercícios de mobilização passiva e ativa-assistida, alongamentos, treino de equilíbrio sentado",
      evolution:
        "Paciente apresenta pequenos progressos. Melhora discreta da mobilidade ativa de MSD.",
    },
    templateId: "neurofunctional-physiotherapy",
    templateName: "Ficha de Avaliação em Fisioterapia Neurofuncional",
    professional: "Dra. Patricia Mendes",
    date: new Date(2024, 7, 29),
    isActive: true,
  },
  versions: [
    {
      id: "version-2-1",
      versionNumber: 1,
      consultationData: {
        date: new Date(2024, 7, 5),
        time: "09:00",
        professional: "Dr. Roberto Silva",
        students: "",
        area: "neurologia",
        type: "avaliacao",
        observations: "Avaliação neurológica inicial pós-AVC",
      },
      templateData: {
        main_complaint:
          "Hemiplegia à direita pós-AVC, dificuldade de mobilização",
        disease_history: "Paciente sofreu AVC isquêmico há 4 meses",
        medical_diagnosis_cid: "I63.9 - Infarto cerebral não especificado",
        rom_passive_active:
          "MSD: Flexão de ombro: 30°, Flexão de cotovelo: 60°, MID: Flexão de quadril: 40°",
        muscle_strength_detailed:
          "MSD: Força grau 1 em flexores de ombro, grau 2 em flexores de cotovelo. MID: Força grau 1 em flexores de quadril",
        muscle_tone:
          "Hipertonia em MSD e MID, grau 3 na escala de Ashworth modificada",
        balance:
          "Sentado: não consegue manter sem apoio. Em pé: impossível sem auxílio total",
        coordination: "Descoordenação severa em MSD",
        functional_assessment: "Totalmente dependente para AVDs",
        treatment_goals:
          "Reduzir hipertonia, iniciar mobilização passiva, melhorar controle de tronco",
        treatment_plan:
          "Posicionamento, mobilização passiva, exercícios respiratórios",
        evolution: "Avaliação inicial",
      },
      templateId: "neurofunctional-physiotherapy",
      templateName: "Ficha de Avaliação em Fisioterapia Neurofuncional",
      professional: "Dr. Roberto Silva",
      date: new Date(2024, 7, 5),
      isActive: false,
    },
    {
      id: "version-2-2",
      versionNumber: 2,
      consultationData: {
        date: new Date(2024, 7, 15),
        time: "14:30",
        professional: "Dra. Patricia Mendes",
        students: "Ana Beatriz",
        area: "neurologia",
        type: "consulta",
        observations:
          "Primeira consulta de fisioterapia - início dos exercícios",
      },
      templateData: {
        main_complaint:
          "Hemiplegia à direita pós-AVC, dificuldade de mobilização, início do tratamento",
        disease_history:
          "Paciente sofreu AVC isquêmico há 4 meses. Iniciou fisioterapia hoje.",
        medical_diagnosis_cid: "I63.9 - Infarto cerebral não especificado",
        rom_passive_active:
          "MSD: Flexão de ombro: 35°, Flexão de cotovelo: 70°, MID: Flexão de quadril: 50°",
        muscle_strength_detailed:
          "MSD: Força grau 1 em flexores de ombro, grau 2 em flexores de cotovelo. MID: Força grau 2 em flexores de quadril",
        muscle_tone:
          "Hipertonia em MSD e MID, grau 2-3 na escala de Ashworth modificada",
        balance:
          "Sentado: mantém por 5 segundos com apoio. Em pé: não consegue manter sem auxílio",
        coordination: "Descoordenação importante em MSD",
        functional_assessment:
          "Dependente para AVDs, auxílio total para transferências",
        treatment_goals:
          "Melhorar amplitude de movimento, reduzir hipertonia, iniciar controle de tronco",
        treatment_plan:
          "Mobilização passiva e ativa-assistida, alongamentos, exercícios de controle de tronco",
        evolution: "Primeira sessão de fisioterapia. Paciente colaborativo.",
      },
      templateId: "neurofunctional-physiotherapy",
      templateName: "Ficha de Avaliação em Fisioterapia Neurofuncional",
      professional: "Dra. Patricia Mendes",
      date: new Date(2024, 7, 15),
      isActive: false,
    },
    {
      id: "version-2-3",
      versionNumber: 3,
      consultationData: {
        date: new Date(2024, 7, 29),
        time: "16:00",
        professional: "Dra. Patricia Mendes",
        students: "Ana Beatriz, Carlos Eduardo",
        area: "neurologia",
        type: "retorno",
        observations:
          "Retorno - paciente demonstra pequenos progressos na mobilidade",
      },
      templateData: {
        main_complaint:
          "Hemiplegia à direita pós-AVC, dificuldade de mobilização, progressos lentos mas consistentes",
        disease_history:
          "Paciente sofreu AVC isquêmico há 4 meses. Iniciou fisioterapia há 3 semanas. Evolução gradual da mobilidade.",
        medical_diagnosis_cid: "I63.9 - Infarto cerebral não especificado",
        rom_passive_active:
          "MSD: Flexão de ombro: 45°, Flexão de cotovelo: 80°, MID: Flexão de quadril: 60°",
        muscle_strength_detailed:
          "MSD: Força grau 2 em flexores de ombro, grau 3 em flexores de cotovelo. MID: Força grau 2 em flexores de quadril",
        muscle_tone:
          "Hipertonia em MSD e MID, grau 2 na escala de Ashworth modificada",
        balance:
          "Sentado: mantém por 10 segundos com apoio. Em pé: não consegue manter sem auxílio",
        coordination:
          "Descoordenação importante em MSD, tremor intencional presente",
        functional_assessment:
          "Dependente para AVDs, necessita auxílio total para transferências",
        treatment_goals:
          "Melhorar mobilidade ativa, reduzir hipertonia, treinar transferências",
        treatment_plan:
          "Exercícios de mobilização passiva e ativa-assistida, alongamentos, treino de equilíbrio sentado",
        evolution:
          "Paciente apresenta pequenos progressos. Melhora discreta da mobilidade ativa de MSD.",
      },
      templateId: "neurofunctional-physiotherapy",
      templateName: "Ficha de Avaliação em Fisioterapia Neurofuncional",
      professional: "Dra. Patricia Mendes",
      date: new Date(2024, 7, 29),
      isActive: true,
    },
  ],
};

// Histórico de diferenças entre consultas - paciente 1
export const mockMedicalChartDiffs: MedicalChartDiff[] = [];

// Histórico de diferenças entre consultas - paciente 2
export const mockMedicalChartDiffs2: MedicalChartDiff[] = [];
