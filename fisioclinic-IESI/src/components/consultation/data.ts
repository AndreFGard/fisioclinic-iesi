import { TemplateOption } from "./types";
import escala_ashworth from "@/assets/escala-ashworth.png";
import bodyFunctionsPDF from "@/assets/pdfs/Funções_Corporais-Lista_de_Deficiências.pdf";
import appendix1PDF from "@/assets/pdfs/Apêndice_1-Atividades_Fundamentais.pdf";
import appendix2PDF from "@/assets/pdfs/Apêndice_2-Avaliação_da_Marcha.pdf";

// Templates por área da clínica
export const clinicTemplates: TemplateOption[] = [
  {
    id: "neurofunctional-physiotherapy",
    name: "Ficha de Avaliação em Fisioterapia Neurofuncional",
    area: "neurologia",
    description:
      "Avaliação neurofuncional completa com dados pessoais, exame físico e plano de tratamento",
    fields: [
      {
        id: "personal_data_section",
        type: "header",
        label: "Dados Pessoais",
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
        label: "Informações relevantes adicionais",
        sublabel:
          "(como diagnóstico, contraindicações, bandeiras vermelhas, amarelas etc.)",
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
        label: "História da doença",
        sublabel:
          "(início, desenvolvimento desde o ictus, diagnóstico prévio e outras informações relevantes)",
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
        sublabel:
          "encontrar a razão para a limitação da atividade (Exame neurológico, testes específicos, ADM, força, tônus, dor e sensibilidade)",
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
        label: "Força muscular",
        sublabel: "(Proximal/intermediária/distal para MMSS e MMII)",
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
        consultImage: escala_ashworth,
        imageLabel: "Escala de Ashworth",
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
          "Após o exame físico e o teste-tratamento, qual a sua hipótese para a causa da deficiência que limita a atividade?",
        sublabel: "(Função e estrutura corporais)",
      },
      {
        id: "structural_test",
        type: "textarea",
        label: "Qual o teste para a causa da deficiência que você usou?",
        sublabel: "(nível estrutural)",
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

      // Tabela: Objetivos (Curto / Médio / Longo)

      {
        id: "treatment_objectives_table",
        type: "table",
        label: "Objetivos",
        rowHeader: false,
        rows: [""], // quantidade de linhas para preencher
        columns: ["Curto", "Médio", "Longo"],
      },

      // Seção: Reteste para o nível de atividade e estrutural
      {
        id: "retest_section",
        type: "header",
        label: "Reteste para o nível de atividade e estrutural",
      },
      // Tabela: Reteste (Datas 1..4) para duas linhas

      {
        id: "retest_activity_structural_table",
        type: "table",
        label: "",
        rowHeader: false,
        rows: [""],
        columns: [
          "Teste para a limitação da atividade",
          "Data 1",
          "Data 2",
          "Data 3",
          "Data 4",
        ],
      },

      {
        id: "retest_deficiency_cause_table",
        type: "table",
        label: "",
        rowHeader: false,
        rows: [""],
        columns: [
          "Teste para a causa da deficiência",
          "Data 1",
          "Data 2",
          "Data 3",
          "Data 4",
        ],
      },

      // Tabela: Plano de tratamento detalhado

      {
        id: "detailed_treatment_plan_table",
        type: "table",
        label: "Plano de tratamento",
        rows: [""],
        rowHeader: false,
        columns: [
          "Objetivo/razões/propostas",
          "Posição",
          "Padrões/movimento ou atividade",
          "Técnicas",
          "Outros",
        ],
      },
      {
        id: "evolution",
        type: "textarea",
        label: "Evolução",
        placeholder:
          "Registre aqui a evolução do paciente ao longo do tratamento",
      },
      // Conteúdos adicionais (renderizados como botão toggle com PDF)
      {
        id: "body_functions_deficiencies",
        type: "toggle",
        label: "Funções Corporais – Lista de deficiências",
        pdfUrl: bodyFunctionsPDF,
      },
      {
        id: "appendix_fundamental_activities",
        type: "toggle",
        label: "Apêndice 1: Atividades Fundamentais",
        pdfUrl: appendix1PDF,
      },
      {
        id: "appendix_gait_assessment",
        type: "toggle",
        label: "Apêndice 2: Avaliação da Marcha",
        pdfUrl: appendix2PDF,
      },
    ],
  },
];

export const mockPatientData = {
  id: "1",
  fullName: "Maria Silva Santos",
  area: "neurologia",
};
