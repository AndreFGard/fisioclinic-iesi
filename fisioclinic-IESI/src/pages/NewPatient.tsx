import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {toast} from "@/components/ui/use-toast"
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
import AreaSelect from "@/components/AreaSelect";
import DiagnosisSelect from "@/components/DiagnosisSelect";
import { DatePicker } from "@/components/ui/date-picker";
import { UserPlus, MapPin, Save, Stethoscope, ArrowLeft } from "lucide-react";

import { createEnfileirado, createPatient, PatientData } from "@/lib/api";
const emptyPatient: PatientData = {
  nome: "",
  cpf: "",
  id: "",
  nascimento: undefined,
  genero: "",
  tel1: "",
  tel2: "",
  bairro: "",
  cidade: "",
  diagnostico: "",
  disciplina: "",
  hospital: "",
  doutor: "",
  procura: undefined,
  situacao: "",
  obs: "",
};

const initialPatientData: PatientData = {
  nome: "Maria da Silva",
  cpf: "123.456.789-00",
  id: "",
  nascimento: new Date(1985, 4, 15),
  genero: "feminino",
  tel1: "(81) 91234-5678",
  tel2: "(81) 99876-5432",
  bairro: "Boa Viagem",
  cidade: "Recife",
  diagnostico: "lombalgia",
  disciplina: "ortopedia",
  hospital: "Hospital das Clínicas",
  doutor: "Dr. João Pereira",
  procura: new Date(2024, 2, 10),
  situacao: "Em tratamento",
  obs: "Paciente apresenta dor lombar crônica há 2 anos. Encaminhada para fisioterapia após avaliação médica.",
};


export default function NewPatient({ val }: { val: string }) {
    const funfun = (val == "pat") ? createPatient : createEnfileirado;
  const [patientData, setPatientData] =
    useState<PatientData>(initialPatientData);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState<{
    nascimento?: boolean;
    procura?: boolean;
    situacao?: boolean;
  }>({});

  const areaOptions = [
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

  const diagnosisOptions = [
    { value: "demanda-espontanea", label: "Demanda Espontânea" },
    { value: "lombalgia", label: "Lombalgia" },
    { value: "lesao-ligamentar", label: "Lesão ligamentar" },
    { value: "avc", label: "AVC" },
    { value: "pneumopatia", label: "Pneumopatia" },
    { value: "fratura", label: "Fratura" },
    { value: "tendinite", label: "Tendinite" },
  ];

  const handleInputChange = (field: keyof PatientData, value: any) => {
    setPatientData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica dos campos obrigatórios
    if (
      !patientData.nome ||
      !patientData.nascimento ||
      !patientData.bairro ||
      !patientData.cidade
    ) {
      alert(
        "Por favor, preencha todos os campos obrigatórios na seção de Dados Pessoais e Endereço."
      );
      setTouched((t) => ({ ...t, nascimento: true }));
      return;
    }

    if (!patientData.tel1) {
      alert("Por favor, preencha pelo menos o campo de celular.");
      return;
    }

    if (!patientData.procura || !patientData.situacao) {
      alert("Por favor, preencha a Data da Procura e a Situação.");
      setTouched((t) => ({ ...t, procura: true, situacao: true }));
      return;
    }

    setIsLoading(true);

    try {
      // Aqui você implementaria a lógica de salvamento
      const patientId =  await funfun(patientData);
      console.log(JSON.stringify(patientId))
      toast({
              title: "Sucesso",
              description: `Paciente atualizado com sucesso com id: ${patientId["id"]}`,
            });
      if (val != "pat"){ navigate("/receptionist")}
      else {navigate(`/patient/${patientId['id']}`)}
      return;
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);
      alert("Erro ao cadastrar paciente. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-5xl mx-auto">
        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-medical">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div className="flex-1" />
            </div>
            <div className="mx-auto w-16 h-16 bg-gradient-medical rounded-full flex items-center justify-center">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Cadastro de Novo Paciente
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Preencha as informações nos campos abaixo
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* SEÇÃO 1: DADOS PESSOAIS */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <UserPlus className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Dados Pessoais
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Informações básicas do paciente
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="nome">
                      Nome Completo <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="nome"
                      value={patientData.nome}
                      onChange={(e) =>
                        handleInputChange("nome", e.target.value)
                      }
                      placeholder="Digite o nome completo"
                      className="h-11"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      value={patientData.cpf}
                      onChange={(e) => handleInputChange("cpf", e.target.value)}
                      placeholder="000.000.000-00"
                      className="h-11"
                    />
                  </div>

                  <div>
                    <Label>
                      Data de Nascimento <span className="text-red-500">*</span>
                    </Label>
                    <DatePicker
                      date={patientData.nascimento}
                      setDate={(date) => {
                        handleInputChange("nascimento", date);
                        setTouched((t) => ({ ...t, nascimento: true }));
                      }}
                      placeholder="Selecione a data de nascimento"
                      fromYear={1920}
                      toYear={new Date().getFullYear()}
                      fromDate={new Date(1920, 0, 1)}
                      toDate={new Date()}
                      closeOnSelect
                      showFooterActions
                      invalid={touched.nascimento && !patientData.nascimento}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label>Gênero</Label>
                    <Select
                      value={patientData.genero}
                      onValueChange={(value) =>
                        handleInputChange("genero", value)
                      }
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Selecione o gênero" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="feminino">Feminino</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                        <SelectItem value="nao-informar">
                          Prefiro não informar
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              {/* SEÇÃO 2: CONTATO E ENDEREÇO */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Contato e Endereço
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Informações de contato e localização
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tel1">
                      Telefone <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="tel1"
                      value={patientData.tel1}
                      onChange={(e) =>
                        handleInputChange("tel1", e.target.value)
                      }
                      placeholder="(00) 00000-0000"
                      className="h-11"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="tel2">Telefone 2</Label>
                    <Input
                      id="tel2"
                      value={patientData.tel2}
                      onChange={(e) =>
                        handleInputChange("tel2", e.target.value)
                      }
                      placeholder="(00) 00000-0000"
                      className="h-11"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bairro">
                      Bairro <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="bairro"
                      value={patientData.bairro}
                      onChange={(e) =>
                        handleInputChange("bairro", e.target.value)
                      }
                      placeholder="Bairro"
                      className="h-11"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="cidade">
                      Cidade <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="cidade"
                      value={patientData.cidade}
                      onChange={(e) =>
                        handleInputChange("cidade", e.target.value)
                      }
                      placeholder="Cidade"
                      className="h-11"
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              {/* SEÇÃO 3: DADOS CLÍNICOS */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Stethoscope className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Dados Clínicos
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Informações médicas e de tratamento
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="diagnostico">Diagnóstico</Label>
                    <DiagnosisSelect
                      value={patientData.diagnostico}
                      onChange={(value) =>
                        handleInputChange("diagnostico", value)
                      }
                      options={diagnosisOptions}
                      placeholder="Selecione ou digite para adicionar"
                    />
                  </div>

                  <div>
                    <Label htmlFor="area">Área</Label>
                    <AreaSelect
                      value={patientData.disciplina}
                      onChange={(value) => handleInputChange("disciplina", value)}
                      options={areaOptions}
                      placeholder="Selecione ou digite para adicionar"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hospital">Hospital</Label>
                    <Input
                      id="hospital"
                      value={patientData.hospital}
                      onChange={(e) =>
                        handleInputChange("hospital", e.target.value)
                      }
                      placeholder="Nome do hospital"
                      className="h-11"
                    />
                  </div>

                  <div>
                    <Label htmlFor="doutor">Médico</Label>
                    <Input
                      id="doutor"
                      value={patientData.doutor}
                      onChange={(e) =>
                        handleInputChange("doutor", e.target.value)
                      }
                      placeholder="Nome do médico"
                      className="h-11"
                    />
                  </div>

                  <div>
                    <Label>
                      Data da Procura <span className="text-red-500">*</span>
                    </Label>
                    <DatePicker
                      date={patientData.procura}
                      setDate={(date) => {
                        handleInputChange("procura", date);
                        setTouched((t) => ({ ...t, procura: true }));
                      }}
                      placeholder="Selecione a data da procura"
                      fromYear={2020}
                      toYear={new Date().getFullYear() + 1}
                      fromDate={new Date(2020, 0, 1)}
                      toDate={new Date(new Date().getFullYear() + 1, 11, 31)}
                      closeOnSelect
                      showFooterActions
                      invalid={touched.procura && !patientData.procura}
                    />
                  </div>

                  <div>
                    <Label htmlFor="situacao">
                      Situação <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={patientData.situacao}
                      onValueChange={(value) => {
                        handleInputChange("situacao", value);
                        setTouched((t) => ({ ...t, situacao: true }));
                      }}
                    >
                      <SelectTrigger
                        className={cn(
                          "h-11",
                          touched.situacao &&
                            !patientData.situacao &&
                            "border-destructive focus-visible:ring-destructive"
                        )}
                        aria-invalid={
                          touched.situacao && !patientData.situacao
                            ? true
                            : undefined
                        }
                      >
                        <SelectValue placeholder="Selecione a situação" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primeira-consulta">
                          Primeira Consulta
                        </SelectItem>
                        <SelectItem value="Em tratamento">
                          Em Tratamento
                        </SelectItem>
                        <SelectItem value="retorno">Retorno</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="aguardando">Aguardando</SelectItem>
                        <SelectItem value="cancelado">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="obs">Observações</Label>
                    <Textarea
                      id="obs"
                      value={patientData.obs}
                      onChange={(e) =>
                        handleInputChange("obs", e.target.value)
                      }
                      placeholder="Observações gerais sobre o paciente ou tratamento"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </div>

              {/* BOTÃO DE SUBMIT */}
              <div className="flex justify-end pt-6 border-t">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 px-8 py-3 h-auto"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Cadastrar Paciente
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
