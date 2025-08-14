import { TemplateOption } from "./types";

// Templates por área da clínica
export const clinicTemplates: TemplateOption[] = [
  {
    id: "neuro-basic",
    name: "(EXEMPLO) Ficha Neurológica Básica",
    area: "neurologia",
    description: "Avaliação neurológica padrão com testes motores e cognitivos",
    fields: [
      {
        id: "glasgow",
        type: "select",
        label: "Escala de Glasgow",
        required: true,
        options: [
          "15 - Normal",
          "14",
          "13",
          "12",
          "11",
          "10",
          "9",
          "8",
          "7",
          "6",
          "5",
          "4",
          "3",
        ],
      },
      {
        id: "reflexes",
        type: "checkbox",
        label: "Reflexos Alterados",
        options: ["Patelar", "Aquileu", "Bicipital", "Tricipital", "Babinski"],
      },
      {
        id: "motor_strength",
        type: "textarea",
        label: "Força Motora",
        placeholder: "Descreva a avaliação da força motora por segmentos",
        required: true,
      },
      {
        id: "sensitivity",
        type: "textarea",
        label: "Sensibilidade",
        placeholder: "Avaliação da sensibilidade táctil, dolorosa e vibratória",
      },
      {
        id: "coordination",
        type: "radio",
        label: "Coordenação",
        options: [
          "Normal",
          "Alterada - Leve",
          "Alterada - Moderada",
          "Alterada - Grave",
        ],
      },
    ],
  },
  {
    id: "neurofunctional-physiotherapy",
    name: "Ficha de Avaliação em Fisioterapia Neurofuncional",
    area: "neurologia",
    description:
      "Avaliação neurofuncional completa com dados pessoais, exame físico e plano de tratamento",
    fields: [
      {
        id: "therapist_student",
        type: "text",
        label: "Terapeuta/aluno",
        required: true,
      },
      {
        id: "personal_data_section",
        type: "header",
        label: "Dados Pessoais",
      },
      {
        id: "birth_date",
        type: "date",
        label: "Data de Nascimento",
        required: true,
      },
      {
        id: "age",
        type: "number",
        label: "Idade",
        required: true,
      },
      {
        id: "marital_status",
        type: "select",
        label: "Estado Civil",
        options: [
          "Solteiro(a)",
          "Casado(a)",
          "Divorciado(a)",
          "Viúvo(a)",
          "União Estável",
        ],
      },
      {
        id: "occupations_hobbies",
        type: "textarea",
        label: "Ocupações/Hobbies",
      },
      {
        id: "dominance",
        type: "radio",
        label: "Dominância",
        options: ["Destro", "Canhoto", "Ambidestro"],
      },
      {
        id: "address",
        type: "textarea",
        label: "Endereço",
      },
      {
        id: "phones",
        type: "text",
        label: "Telefones",
      },
      {
        id: "household_members",
        type: "number",
        label: "Número de moradores no domicílio",
      },
      {
        id: "family_provider",
        type: "radio",
        label: "Exerce função de provedor(a) na família?",
        options: ["Sim", "Não"],
      },
      {
        id: "medical_diagnosis_cid",
        type: "text",
        label: "Diagnóstico médico (CID)",
        required: true,
      },
      {
        id: "surgery",
        type: "radio",
        label: "Cirurgia",
        options: ["Sim", "Não"],
      },
      {
        id: "surgery_date",
        type: "date",
        label: "Data da Cirurgia",
      },
      {
        id: "relevant_medications",
        type: "textarea",
        label: "Medicações relevantes",
      },
      {
        id: "additional_info",
        type: "textarea",
        label:
          "Informações relevantes adicionais (como diagnóstico, contraindicações, bandeiras vermelhas, amarelas etc.)",
      },
      {
        id: "information_source",
        type: "select",
        label: "Fonte de Informação",
        options: ["Paciente", "Família", "Cuidador", "Outro"],
      },
      {
        id: "caregiver_type",
        type: "select",
        label: "Cuidador",
        options: [
          "Não possui",
          "Ajuda não paga",
          "Empregado não pago",
          "Profissional pago",
        ],
      },
      {
        id: "therapeutic_type",
        type: "select",
        label: "Terapêutica",
        options: [
          "Nenhuma",
          "Tratamento ambulatorial",
          "Tratamento domiciliar",
          "Ambos ambulatorial e domiciliar",
          "Internação hospitalar/institucional",
        ],
      },
      {
        id: "immediate_observation_section",
        type: "header",
        label: "Observação Imediata",
      },
      {
        id: "room_entry",
        type: "radio",
        label: "Entrada na sala",
        options: [
          "Deambula com independência",
          "Deambula com auxílio",
          "Cadeirante",
        ],
      },
      {
        id: "room_entry_aid",
        type: "text",
        label: "Qual auxílio?",
      },
      {
        id: "facial_expression",
        type: "radio",
        label: "Expressão facial",
        options: ["Alerta", "Temerosa", "Apática"],
      },
      {
        id: "eye_contact",
        type: "radio",
        label: "Contato visual com terapeuta",
        options: ["Mantém", "Não mantém"],
      },
      {
        id: "communication",
        type: "radio",
        label: "Comunicação",
        options: ["Presente", "Ausente"],
      },
      {
        id: "communication_explanation",
        type: "textarea",
        label: "Explique a comunicação",
      },
      {
        id: "postural_pattern",
        type: "textarea",
        label: "Padrão postural",
      },
      {
        id: "main_complaint",
        type: "textarea",
        label: "Queixa Principal",
        required: true,
      },
      {
        id: "cif_desire",
        type: "textarea",
        label: "Desejo no nível atividade e participação da CIF (funcional)",
      },
      {
        id: "disease_history",
        type: "textarea",
        label:
          "História da doença (início, desenvolvimento desde o ictus, diagnóstico prévio e outras informações relevantes)",
        required: true,
      },
      {
        id: "pathological_history",
        type: "textarea",
        label: "História patológica pregressa",
      },
      {
        id: "personal_family_history",
        type: "textarea",
        label: "Antecedentes pessoais, familiares",
      },
      {
        id: "activity_level_section",
        type: "header",
        label: "Nível de atividade/AVD's",
      },
      {
        id: "independent_tasks",
        type: "textarea",
        label: "Tarefas que o paciente consegue fazer independentemente",
      },
      {
        id: "almost_independent_tasks",
        type: "textarea",
        label: "Tarefas que o paciente quase consegue fazer independentemente",
      },
      {
        id: "limited_activity",
        type: "textarea",
        label:
          "Decida qual a atividade está limitada e o que você quer melhorar no paciente",
      },
      {
        id: "short_term_goal",
        type: "textarea",
        label: "Objetivo a curto prazo (SMART)",
        placeholder:
          "S - Específico, M - Mensurável, A - Atingível, R - Relevante, T - Temporal",
      },
      {
        id: "activity_level_test",
        type: "textarea",
        label: "Teste para o nível de atividade",
      },
      {
        id: "structural_level_section",
        type: "header",
        label:
          "Nível estrutural – Exame físico da função e estrutura corporais",
      },
      {
        id: "general_inspection",
        type: "textarea",
        label: "Inspeção geral",
      },
      {
        id: "rom_passive_active",
        type: "textarea",
        label: "Amplitude de movimento passiva e ativa",
      },
      {
        id: "muscle_strength_detailed",
        type: "textarea",
        label:
          "Força muscular (Proximal/intermediária/distal para MMSS e MMII)",
      },
      {
        id: "coordination",
        type: "textarea",
        label: "Coordenação",
      },
      {
        id: "superficial_reflexes",
        type: "textarea",
        label: "Reflexos Superficiais",
      },
      {
        id: "deep_reflexes",
        type: "textarea",
        label: "Reflexos Profundos",
      },
      {
        id: "muscle_tone",
        type: "textarea",
        label: "Tônus",
      },
      {
        id: "superficial_sensitivity",
        type: "textarea",
        label: "Sensibilidade Superficial",
      },
      {
        id: "deep_sensitivity",
        type: "textarea",
        label: "Sensibilidade Profunda",
      },
      {
        id: "combined_sensitivity",
        type: "textarea",
        label: "Sensibilidade Combinada",
      },
      {
        id: "pain_presence",
        type: "textarea",
        label: "Presença de dor",
      },
      {
        id: "cranial_nerves",
        type: "textarea",
        label: "Nervos cranianos",
      },
      {
        id: "speech_language_cognition",
        type: "textarea",
        label: "Fala, linguagem, estado mental e cognição",
      },
      {
        id: "physical_exam_observations",
        type: "textarea",
        label: "Observações do exame físico",
      },
      {
        id: "deficiency_hypothesis",
        type: "textarea",
        label:
          "Após o exame físico e o teste-tratamento, qual a sua hipótese para a causa da deficiência que limita a atividade",
      },
      {
        id: "structural_test",
        type: "textarea",
        label:
          "Qual o teste para a causa da deficiência que você usou (nível estrutural)?",
      },
      {
        id: "positive_points",
        type: "textarea",
        label: "Listar os pontos positivos",
      },
      {
        id: "home_conduct",
        type: "textarea",
        label: "Prescrever uma conduta domiciliar",
      },
      {
        id: "treatment_plan_section",
        type: "header",
        label: "Plano de Tratamento",
      },
      {
        id: "short_term_objectives",
        type: "textarea",
        label: "Objetivos de Curto Prazo",
      },
      {
        id: "medium_term_objectives",
        type: "textarea",
        label: "Objetivos de Médio Prazo",
      },
      {
        id: "long_term_objectives",
        type: "textarea",
        label: "Objetivos de Longo Prazo",
      },
      {
        id: "academics",
        type: "text",
        label: "Acadêmicos",
      },
      {
        id: "responsible_teacher",
        type: "text",
        label: "Professora responsável",
      },
      {
        id: "evolution",
        type: "textarea",
        label: "Evolução",
        placeholder:
          "Registre aqui a evolução do paciente ao longo do tratamento",
      },
    ],
  },
  {
    id: "resp-basic",
    name: "Ficha Respiratória Básica",
    area: "respiratoria",
    description:
      "Avaliação respiratória com capacidade pulmonar e padrão respiratório",
    fields: [
      {
        id: "respiratory_rate",
        type: "number",
        label: "Frequência Respiratória (rpm)",
        required: true,
      },
      {
        id: "saturation",
        type: "number",
        label: "Saturação de O2 (%)",
        required: true,
      },
      {
        id: "breathing_pattern",
        type: "radio",
        label: "Padrão Respiratório",
        options: [
          "Normal",
          "Taquipneia",
          "Bradipneia",
          "Dispneia",
          "Ortopneia",
        ],
      },
      {
        id: "chest_expansion",
        type: "textarea",
        label: "Expansibilidade Torácica",
        placeholder: "Avaliação da expansibilidade em diferentes regiões",
      },
      {
        id: "auscultation",
        type: "checkbox",
        label: "Ausculta Pulmonar",
        options: [
          "Murmúrio Vesicular Normal",
          "Sibilos",
          "Roncos",
          "Estertores",
          "Diminuição do MV",
        ],
      },
    ],
  },
  {
    id: "cardio-basic",
    name: "Ficha Cardiológica Básica",
    area: "cardiologia",
    description:
      "Avaliação cardiovascular com sinais vitais e capacidade funcional",
    fields: [
      {
        id: "heart_rate",
        type: "number",
        label: "Frequência Cardíaca (bpm)",
        required: true,
      },
      {
        id: "blood_pressure",
        type: "text",
        label: "Pressão Arterial (mmHg)",
        placeholder: "Ex: 120/80",
        required: true,
      },
      {
        id: "functional_class",
        type: "radio",
        label: "Classe Funcional (NYHA)",
        options: ["Classe I", "Classe II", "Classe III", "Classe IV"],
      },
      {
        id: "exercise_tolerance",
        type: "textarea",
        label: "Tolerância ao Exercício",
        placeholder: "Descreva a capacidade de exercício do paciente",
      },
      {
        id: "cardiac_rhythm",
        type: "radio",
        label: "Ritmo Cardíaco",
        options: [
          "Sinusal Regular",
          "Sinusal Irregular",
          "Fibrilação Atrial",
          "Outro",
        ],
      },
    ],
  },
];

export const mockPatientData = {
  id: "1",
  fullName: "Maria Silva Santos",
  area: "neurologia",
};
