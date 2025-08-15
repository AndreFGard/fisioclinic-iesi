import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Calendar,
  Clock,
  Search,
  User,
  ArrowLeft,
  Save,
  CalendarDays,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getWaitingQueueData, type FilaDeEspera } from "@/lib/api";

// Mock data para testes - baseado nos dados do backend
const mockPatients: FilaDeEspera[] = [
  {
    id: "1",
    nome: "Ana",
    idade: 35,
    tel1: "(11) 91234-5678",
    tel2: "(11) 99876-5432",
    bairro: "Centro",
    diagnostico: "Fratura no braço",
    disciplina: "Ortopedia",
    hospital: "Hospital São Lucas",
    doutor: "Dr. Ricardo Lima",
    procura: "2025-08-10",
    situacao: "Em tratamento",
    prioridade: "alta",
  },
  {
    id: "2",
    nome: "Carlos Pereira",
    idade: 42,
    tel1: "(21) 92345-6789",
    tel2: "(21) 98765-4321",
    bairro: "Jardim das Flores",
    diagnostico: "Lesão no joelho",
    disciplina: "Fisioterapia",
    hospital: "Hospital Santa Maria",
    doutor: "Dra. Fernanda Costa",
    procura: "2025-08-11",
    situacao: "Concluído",
    prioridade: "média",
  },
  {
    id: "3",
    nome: "Marianix limix Lima",
    idade: 28,
    tel1: "(31) 93456-7890",
    tel2: "(31) 97654-3210",
    bairro: "Bairro Verde",
    diagnostico: "Tendinite",
    disciplina: "Fisioterapia",
    hospital: "Hospital das Clínicas",
    doutor: "Dr. João Almeida",
    procura: "2025-08-12",
    situacao: "Fila de espera",
    prioridade: "baixa",
  },
  {
    id: "4",
    nome: "Lucas Fernandes",
    idade: 31,
    tel1: "(41) 94567-8901",
    tel2: "(41) 96543-2109",
    bairro: "Centro",
    diagnostico: "Entorse no tornozelo",
    disciplina: "Ortopedia",
    hospital: "Hospital Regional",
    doutor: "Dra. Camila Rocha",
    procura: "2025-08-12",
    situacao: "Em tratamento",
    prioridade: "média",
  },
  {
    id: "5",
    nome: "Juliana Costa",
    idade: 45,
    tel1: "(51) 95678-9012",
    tel2: "(51) 97654-3210",
    bairro: "Bairro Alto",
    diagnostico: "Hérnia de disco",
    disciplina: "Neurologia",
    hospital: "Hospital Central",
    doutor: "Dr. Roberto Martins",
    procura: "2025-08-13",
    situacao: "Concluído",
    prioridade: "alta",
  },
];

// Tipos baseados no schema do banco
interface ScheduleItem {
  dateSchedule: string;
  hour: string;
}

interface appointmentSchema {
  patientId: string;
  name: string;
  schedule: ScheduleItem[];
}

interface appointmentProps {
  onBack?: () => void;
}

export default function appointments({ onBack }: appointmentProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<FilaDeEspera[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<FilaDeEspera[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<FilaDeEspera | null>(
    null
  );
  const [appointment, setAppointment] = useState<appointmentSchema>({
    patientId: "",
    name: "",
    schedule: [{ dateSchedule: "", hour: "" }],
  });

  // Opções de horário disponíveis
  const timeOptions = [
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
  ];

  // Carregar pacientes ao montar o componente
  useEffect(() => {
    const loadPatients = async () => {
      try {
        console.log("Carregando pacientes...");

        // Para testes, usar dados mockados
        // Para produção, descomentar a linha abaixo e comentar a linha do mock
        // const patientsData = await getWaitingQueueData();
        const patientsData = mockPatients; // Usando dados mockados para teste

        console.log("Pacientes carregados:", patientsData);
        setPatients(patientsData);
      } catch (error) {
        console.error("Erro ao carregar pacientes:", error);
      }
    };

    loadPatients();
  }, []);

  // Filtrar pacientes baseado no termo de busca
  useEffect(() => {
    console.log(
      "Filtrando pacientes - termo:",
      searchTerm,
      "pacientes:",
      patients.length
    );
    if (searchTerm.trim() === "") {
      setFilteredPatients([]);
    } else {
      const filtered = patients.filter((patient) =>
        patient.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log("Resultados filtrados:", filtered);
      setFilteredPatients(filtered.slice(0, 5)); // Limitar a 5 resultados
    }
  }, [searchTerm, patients]);

  const handlePatientSelect = (patient: FilaDeEspera) => {
    setSelectedPatient(patient);
    setSearchTerm(patient.nome);
    setFilteredPatients([]);
    setAppointment((prev) => ({
      ...prev,
      patientId: patient.id,
      name: patient.nome,
    }));
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (value.trim() === "") {
      setSelectedPatient(null);
      setAppointment((prev) => ({
        ...prev,
        patientId: "",
        name: "",
      }));
    }
  };

  const handleInputChange = (field: keyof appointmentSchema, value: any) => {
    setAppointment((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleScheduleChange = (
    index: number,
    field: keyof ScheduleItem,
    value: string
  ) => {
    setAppointment((prev) => ({
      ...prev,
      schedule: prev.schedule.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Criar o objeto de agendamento
      const newAppointment = {
        id: Date.now().toString(), // ID temporário
        patientId: appointment.patientId,
        patientName: appointment.name,
        patientAge: selectedPatient?.idade || 0,
        diagnosis: selectedPatient?.diagnostico || "",
        date: appointment.schedule[0]?.dateSchedule || "",
        time: appointment.schedule[0]?.hour || "",
        status: "agendado" as const,
        professional: selectedPatient?.doutor || "",
        createdAt: new Date(),
        observations: "Agendamento criado pelo sistema",
      };

      console.log("Salvando agendamento:", newAppointment);

      // Carregar agendamentos existentes e adicionar o novo
      const existingAppointments = JSON.parse(
        localStorage.getItem("appointments") || "[]"
      );
      const updatedAppointments = [...existingAppointments, newAppointment];

      // Salvar no localStorage
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

      // Simulando delay da API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Sucesso - ir para a lista de agendamentos
      navigate("/lista-agendamentos");
    } catch (error) {
      console.error("Erro ao salvar appointment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };

  const handleDateChange = (index: number, date: Date | undefined) => {
    if (date) {
      // Corrigir o problema de fuso horário
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const dateString = `${year}-${month}-${day}`;

      handleScheduleChange(index, "dateSchedule", dateString);
    }
  };

  const parseDate = (dateString: string): Date | undefined => {
    if (!dateString) return undefined;

    // Evitar problemas de fuso horário usando a data local
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // month - 1 porque Date usa base 0 para meses
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-purple-50/80 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-medical mb-6">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack || (() => navigate("/lista-agendamentos"))}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar
                </Button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-medical rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                      Agendamento de Consultas
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-sm">
                      Agende consultas para pacientes do sistema
                    </CardDescription>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSave}
                disabled={isLoading || !selectedPatient}
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
                    Salvar Agendamento
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Formulário Principal */}
        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-medical">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Dados do Paciente
            </CardTitle>
            <CardDescription>
              Busque e selecione o paciente, depois configure o horário do
              agendamento
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 p-4 sm:p-6">
            {/* SEÇÃO 1: DADOS DO PACIENTE */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground">
                    Identificação do Paciente
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Dados básicos para identificação
                  </p>
                </div>
              </div>

              <div className="relative">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">
                    Nome do Paciente
                  </Label>
                  <Input
                    id="name"
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Digite o nome do paciente para buscar..."
                    className="h-11 text-sm"
                  />
                </div>

                {/* Dropdown de resultados de busca */}
                {filteredPatients.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredPatients.map((patient) => (
                      <div
                        key={patient.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => handlePatientSelect(patient)}
                      >
                        <div className="font-medium text-sm">
                          {patient.nome}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {patient.id} | {patient.bairro} |{" "}
                          {patient.diagnostico}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Informações do paciente selecionado */}
                {selectedPatient && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-sm text-blue-900 mb-2">
                      Paciente Selecionado:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="font-medium">Nome:</span>{" "}
                        {selectedPatient.nome}
                      </div>
                      <div>
                        <span className="font-medium">ID:</span>{" "}
                        {selectedPatient.id}
                      </div>
                      <div>
                        <span className="font-medium">Idade:</span>{" "}
                        
                      </div>
                      <div>
                        <span className="font-medium">Telefone:</span>{" "}
                        {selectedPatient.tel1}
                      </div>
                      <div>
                        <span className="font-medium">Bairro:</span>{" "}
                        {selectedPatient.bairro}
                      </div>
                      <div>
                        <span className="font-medium">Diagnóstico:</span>{" "}
                        {selectedPatient.diagnostico}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Separator className="my-6" />

            {/* SEÇÃO 2: appointmentS */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground">
                    Horário do Agendamento
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Configure a data e horário da consulta
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Card className="border border-border/50">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">
                          Data da Consulta
                        </Label>
                        <DatePicker
                          date={parseDate(
                            appointment.schedule[0]?.dateSchedule
                          )}
                          setDate={(date) => handleDateChange(0, date)}
                          placeholder="Selecione a data"
                          fromDate={new Date()}
                          toYear={new Date().getFullYear() + 1}
                          closeOnSelect
                          showFooterActions
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Horário</Label>
                        <Select
                          value={appointment.schedule[0]?.hour || ""}
                          onValueChange={(value) =>
                            handleScheduleChange(0, "hour", value)
                          }
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Selecione o horário" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeOptions.map((time) => (
                              <SelectItem key={time} value={time}>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  {time}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Resumo */}
            {selectedPatient && (
              <>
                <Separator className="my-6" />
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Resumo do Agendamento
                  </h3>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Paciente:</span>
                        <p className="text-muted-foreground">
                          {selectedPatient.nome}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">ID:</span>
                        <p className="text-muted-foreground">
                          {selectedPatient.id}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Idade:</span>
                        <p className="text-muted-foreground">
                          {selectedPatient.idade} anos
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Diagnóstico:</span>
                        <p className="text-muted-foreground">
                          {selectedPatient.diagnostico}
                        </p>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="font-medium">Consulta agendada:</span>
                        <div className="mt-2">
                          {appointment.schedule[0]?.dateSchedule &&
                          appointment.schedule[0]?.hour ? (
                            <div className="text-muted-foreground">
                              {new Date(
                                appointment.schedule[0].dateSchedule
                              ).toLocaleDateString("pt-BR")}{" "}
                              às {appointment.schedule[0].hour}
                            </div>
                          ) : (
                            <div className="text-muted-foreground">
                              Nenhuma consulta agendada
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
