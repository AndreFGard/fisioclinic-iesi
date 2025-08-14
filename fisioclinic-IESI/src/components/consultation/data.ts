import { TemplateOption } from "./types";

// Templates por área da clínica
export const clinicTemplates: TemplateOption[] = [
  {
    id: "neuro-basic",
    name: "Ficha Neurológica Básica",
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
    id: "ortho-basic",
    name: "Ficha Ortopédica Básica",
    area: "ortopedia",
    description: "Avaliação ortopédica com amplitude de movimento e força",
    fields: [
      {
        id: "pain_scale",
        type: "select",
        label: "Escala de Dor (0-10)",
        required: true,
        options: [
          "0 - Sem dor",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10 - Dor insuportável",
        ],
      },
      {
        id: "range_motion",
        type: "textarea",
        label: "Amplitude de Movimento",
        placeholder: "Descreva a ADM por articulações",
        required: true,
      },
      {
        id: "muscle_strength",
        type: "textarea",
        label: "Força Muscular",
        placeholder: "Avaliação da força muscular (escala 0-5)",
      },
      {
        id: "special_tests",
        type: "checkbox",
        label: "Testes Especiais Positivos",
        options: [
          "Teste de Lasègue",
          "Teste de McMurray",
          "Teste de Hawkins",
          "Teste de Neer",
          "Teste de Phalen",
        ],
      },
      {
        id: "posture",
        type: "radio",
        label: "Avaliação Postural",
        options: [
          "Normal",
          "Alterações Leves",
          "Alterações Moderadas",
          "Alterações Graves",
        ],
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
  area: "ortopedia",
};
