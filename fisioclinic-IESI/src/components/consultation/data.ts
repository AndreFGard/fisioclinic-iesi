import { TemplateOption } from "./types";
import escala_ashworth from "@/assets/escala-ashworth.png";

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

      // Conteúdos adicionais (renderizados como botão toggle)
      
      {
        id: "body_functions_deficiencies",
        type: "toggle",
        label: "Funções Corporais – Lista de deficiências",
        content: `1.	Mobilidade Passiva – Amplitude de Movimento (ADM)
- Muscular
o	Encurtamento estrutural/funcional
o	Tônus dependente (ver 6.)
- Tecido conectivo, tecidos conectivos (fáscia, cápsula articular etc)
- Neural
- Pele (tecido cicatricial)
- Edema, linfático	2.	Força muscular – Endurance
- Neurológico
- Inibitório
- Atrófico
- Cardíaco (ver 9.)
- Vascular (ver 9.)
- Pulmonar (ver 10.)

                                        
-
3.	Coordenação
- Padrões temporais/espaciais
- Intramuscular
- Intermuscular
- Destreza, acurácia terminal, habilidade, precisão
- Velocidade	4. Equilíbrio*
- Vestibular (ver 5.)
- Coordenação (ver 3.)
- Força muscular (ver 2.)
- Tônus (ver 6.)
- Sensibilidade (ver 5.)
- ADM (ver 1.)

*Manter a posição é uma “atividade” de acordo com a CIF
5.	 Sensibilidade
- Proprioceptiva
- Tátil
- Visual
- Vestibular 
- Auditiva	6. Tônus
- Hipotonicidade
o	Tônus postural
- Hipertonicidade
o	Espasticidade
o	Rigidez
o	Hipertonia reflexa – espasmo por dor
- Distonia
- Hiperatividade reflexa
7.	Dor – avalie qual estrutura
- Final da amplitude
- Arco de dor
- Dependente da carga
- Inflamatória
- Neural
- Muscular
- Outras	8. Funções neuropsicológicas
- Emocional
o	Insegurança, medo depressão, instabilidade emocional
- Atenção, concentração
- Apraxia
- Afasia
- Orientação espacial/temporal
- Consciência
- Déficits cognitivos
- Outros
8.	Sistema cardiovascular
- Função da circulação do corpo
- Força/endurance	10. Sistema pulmonar
 - Respiração
 - Força/endurance`,
      },

      
      {
        id: "appendix_fundamental_activities",
        type: "toggle",
        label: "Apêndice 1: Atividades Fundamentais",
        content: `Apêndice 1: Atividades Fundamentais

Essa lista descreve atividade de vida diária fundamentais. Se necessário adicione atividades para seu paciente*

Atividade	Independente (I)
Normal (N)
Modificado (M) descreva como	Possível apenas com assistência (leve assistência, moderada assistência, considerável assistência)	Impossível
Rolar de supino para direita ou esquerda 1,3			
Passar de deitado para sentado 1,3,6			
Manter-se sentado 1,3,6,7			
Sentado para de pé, de pé para sentado 2,6,7			
De pé 2,3,7			
De pé em Tandem, apoio em uma perna (D/E) 2			
Caminhar 3,5,6,7			
Caminhar rápido/correr 6			
Subir escadas 3,6,9			
Descer escadas 9			
Atividades básicas de vida diária (descrever qual atividade)			
Atividades de membro superior (descreva qual) 4,8			
 
Se não for possível avaliar o nível de independência da atividade, é possível avaliar o tempo ou distância que realizar a tarefa.

Se for apropriado verifique também atividades como: transferências, transições (mudanças da posição do corpo), manutenção de certas posições, andando em terreno irregular, descendo até o chão, manejo da cadeira de rodas, pegando objetos do chão, carregando objetos, ...

1.	Trunk Control Teste
2.	Berg Balance Scale
3.	Chedoke Mc Master Stroke Assessement
4.	Dash Test
5.	Functional Ambulation Categories
6.	Rivermead Motor Assessement
7.	Tinetti Test
8.	Action Reseach Arm Test
9.	Barthel Index
10.	Functional Independence Measure (FIM) and Functional Assessement Measure (FAM)`,
      },

      
      {
        id: "appendix_gait_assessment",
        type: "toggle",
        label: "Apêndice 2: Avaliação da Marcha",
        content: `Apêndice 2: Avaliação da Marcha

Ajuda necessária:
Velocidade habitual da marcha:          
                       	5m/10m/20m Teste de velocidade da marcha:

Comprimento do passo:


Fases da marcha – Esquerda

	Contato Inicial	Resposta à Carga	Apoio Médio	Apoio
Terminal	Pré balanço	Balanço Inicial	Balanço
Médio	Balanço Terminal
Cabeça								
Tronco								
Pelve								
Quadril								
Joelho								
Tornozelo/pé								
Artelhos								

Fases da marcha – Direita

	Contato Inicial	Resposta à Carga	Apoio Médio	Apoio
Terminal	Pré balanço	Balanço Inicial	Balanço
Médio	Balanço Terminal
Cabeça								
Tronco								
Pelve								
Quadril								
Joelho								
Tornozelo/pé								
Artelhos								

Teste para a marcha: Dynamic Gait Index, 6Minute Gait Test, Functional Walking Categories, FAC, TUG etc.`,
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
