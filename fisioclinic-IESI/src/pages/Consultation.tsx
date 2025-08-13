import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import {
  ArrowLeft,
  Save,
  FileText,
  Stethoscope,
  ClipboardList,
  Download,
  User,
  Calendar,
  Hospital,
  CheckCircle,
} from "lucide-react";

interface ConsultationData {
  patientId: string;
  date: Date;
  time: string;
  professional: string;
  area: string;
  type: "consulta" | "retorno" | "avaliacao";
  observations: string;
  symptoms: string;
  diagnosis: string;
  treatment: string;
  nextAppointment?: Date;
  selectedTemplate: string;
  templateData: Record<string, any>;
}

interface TemplateOption {
  id: string;
  name: string;
  area: string;
  description: string;
  fields: TemplateField[];
}

interface TemplateField {
  id: string;
  type:
    | "text"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio"
    | "number"
    | "date";
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

// Templates por área da clínica
const clinicTemplates: TemplateOption[] = [
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

const mockPatientData = {
  id: "1",
  fullName: "Maria Silva Santos",
  area: "ortopedia",
};

export default function Consultation() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [consultationData, setConsultationData] = useState<ConsultationData>({
    patientId: id || "",
    date: new Date(),
    time: new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    professional: "Dr. João Silva",
    area: mockPatientData.area,
    type: "consulta",
    observations: "",
    symptoms: "",
    diagnosis: "",
    treatment: "",
    selectedTemplate: "",
    templateData: {},
  });

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("consultation");
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateOption | null>(null);

  // Filtrar templates pela área do paciente
  const availableTemplates = clinicTemplates.filter(
    (template) =>
      template.area === consultationData.area || template.area === "geral"
  );

  const handleInputChange = (field: keyof ConsultationData, value: any) => {
    setConsultationData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = clinicTemplates.find((t) => t.id === templateId);
    setSelectedTemplate(template || null);
    setConsultationData((prev) => ({
      ...prev,
      selectedTemplate: templateId,
      templateData: {},
    }));
  };

  const handleTemplateFieldChange = (fieldId: string, value: any) => {
    setConsultationData((prev) => ({
      ...prev,
      templateData: {
        ...prev.templateData,
        [fieldId]: value,
      },
    }));
  };

  const handleSaveConsultation = async () => {
    setIsLoading(true);
    try {
      // Aqui você implementaria a lógica de salvamento
      console.log("Dados da consulta:", consultationData);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Consulta registrada com sucesso!");
      navigate(`/patient/${id}`);
    } catch (error) {
      console.error("Erro ao salvar consulta:", error);
      alert("Erro ao salvar consulta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderTemplateField = (field: TemplateField) => {
    const value = consultationData.templateData[field.id] || "";

    switch (field.type) {
      case "text":
      case "number":
        return (
          <Input
            type={field.type}
            value={value}
            onChange={(e) =>
              handleTemplateFieldChange(field.id, e.target.value)
            }
            placeholder={field.placeholder}
            required={field.required}
            className="h-11"
          />
        );

      case "textarea":
        return (
          <Textarea
            value={value}
            onChange={(e) =>
              handleTemplateFieldChange(field.id, e.target.value)
            }
            placeholder={field.placeholder}
            required={field.required}
            className="min-h-[100px]"
          />
        );

      case "select":
        return (
          <Select
            value={value}
            onValueChange={(val) => handleTemplateFieldChange(field.id, val)}
          >
            <SelectTrigger className="h-11">
              <SelectValue
                placeholder={`Selecione ${field.label.toLowerCase()}`}
              />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "radio":
        return (
          <RadioGroup
            value={value}
            onValueChange={(val) => handleTemplateFieldChange(field.id, val)}
            className="flex flex-col space-y-2"
          >
            {field.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${field.id}-${option}`} />
                <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "checkbox":
        const checkedValues = Array.isArray(value) ? value : [];
        return (
          <div className="flex flex-col space-y-2">
            {field.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`${field.id}-${option}`}
                  checked={checkedValues.includes(option)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleTemplateFieldChange(field.id, [
                        ...checkedValues,
                        option,
                      ]);
                    } else {
                      handleTemplateFieldChange(
                        field.id,
                        checkedValues.filter((v: string) => v !== option)
                      );
                    }
                  }}
                />
                <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
              </div>
            ))}
          </div>
        );

      case "date":
        return (
          <DatePicker
            date={value ? new Date(value) : undefined}
            setDate={(date) => handleTemplateFieldChange(field.id, date)}
            placeholder={field.placeholder || "Selecione uma data"}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-medical mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(`/patient/${id}`)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar
                </Button>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-medical rounded-full flex items-center justify-center">
                    <Stethoscope className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-foreground">
                      Nova Consulta
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Paciente: {mockPatientData.fullName} • Área:{" "}
                      {consultationData.area}
                    </CardDescription>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSaveConsultation}
                disabled={isLoading}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Finalizar Consulta
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2 bg-card/80 backdrop-blur-sm">
            <TabsTrigger
              value="consultation"
              className="flex items-center gap-2"
            >
              <ClipboardList className="h-4 w-4" />
              Dados da Consulta
            </TabsTrigger>
            <TabsTrigger value="template" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Fichas Especializadas
            </TabsTrigger>
          </TabsList>

          {/* Aba de Dados da Consulta */}
          <TabsContent value="consultation">
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-medical">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5" />
                  Informações da Consulta
                </CardTitle>
                <CardDescription>
                  Registre os dados básicos da consulta
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Data da Consulta</Label>
                    <DatePicker
                      date={consultationData.date}
                      setDate={(date) => handleInputChange("date", date)}
                      placeholder="Selecione a data"
                    />
                  </div>

                  <div>
                    <Label htmlFor="time">Horário</Label>
                    <Input
                      id="time"
                      type="time"
                      value={consultationData.time}
                      onChange={(e) =>
                        handleInputChange("time", e.target.value)
                      }
                      className="h-11"
                    />
                  </div>

                  <div>
                    <Label htmlFor="type">Tipo de Consulta</Label>
                    <Select
                      value={consultationData.type}
                      onValueChange={(value) =>
                        handleInputChange("type", value)
                      }
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consulta">Consulta</SelectItem>
                        <SelectItem value="retorno">Retorno</SelectItem>
                        <SelectItem value="avaliacao">Avaliação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="professional">Profissional</Label>
                    <Input
                      id="professional"
                      value={consultationData.professional}
                      onChange={(e) =>
                        handleInputChange("professional", e.target.value)
                      }
                      placeholder="Nome do profissional"
                      className="h-11"
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="symptoms">Sintomas Apresentados</Label>
                    <Textarea
                      id="symptoms"
                      value={consultationData.symptoms}
                      onChange={(e) =>
                        handleInputChange("symptoms", e.target.value)
                      }
                      placeholder="Descreva os sintomas relatados pelo paciente"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="diagnosis">
                      Diagnóstico/Impressão Clínica
                    </Label>
                    <Textarea
                      id="diagnosis"
                      value={consultationData.diagnosis}
                      onChange={(e) =>
                        handleInputChange("diagnosis", e.target.value)
                      }
                      placeholder="Diagnóstico ou impressão clínica"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="treatment">Conduta/Tratamento</Label>
                    <Textarea
                      id="treatment"
                      value={consultationData.treatment}
                      onChange={(e) =>
                        handleInputChange("treatment", e.target.value)
                      }
                      placeholder="Conduta terapêutica e orientações"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="observations">Observações Gerais</Label>
                    <Textarea
                      id="observations"
                      value={consultationData.observations}
                      onChange={(e) =>
                        handleInputChange("observations", e.target.value)
                      }
                      placeholder="Observações adicionais sobre a consulta"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label>Próximo Agendamento</Label>
                    <DatePicker
                      date={consultationData.nextAppointment}
                      setDate={(date) =>
                        handleInputChange("nextAppointment", date)
                      }
                      placeholder="Selecione a data do próximo agendamento (opcional)"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba de Templates/Fichas */}
          <TabsContent value="template">
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-medical">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Fichas Especializadas por Área
                </CardTitle>
                <CardDescription>
                  Selecione um modelo de ficha específico para a área de{" "}
                  {consultationData.area}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {!selectedTemplate ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Selecione um Modelo de Ficha:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {availableTemplates.map((template) => (
                        <Card
                          key={template.id}
                          className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary/20"
                          onClick={() => handleTemplateSelect(template.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <FileText className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-foreground">
                                  {template.name}
                                </h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {template.description}
                                </p>
                                <Badge variant="outline" className="mt-2">
                                  {template.area}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {selectedTemplate.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedTemplate.description}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedTemplate(null)}
                      >
                        Trocar Modelo
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-6">
                      {selectedTemplate.fields.map((field) => (
                        <div key={field.id} className="space-y-2">
                          <Label htmlFor={field.id}>
                            {field.label}
                            {field.required && (
                              <span className="text-red-500 ml-1">*</span>
                            )}
                          </Label>
                          {renderTemplateField(field)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
