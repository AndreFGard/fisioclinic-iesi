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
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  Search,
  Plus,
  ArrowLeft,
  CalendarDays,
  User,
  Filter,
  Eye,
  Edit,
  Trash2,
  Save,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Interface para os agendamentos
interface AppointmentRecord {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  diagnosis: string;
  date: string;
  time: string;
  status: "agendado" | "confirmado" | "concluido" | "cancelado" | "faltou";
  professional?: string;
  createdAt: Date;
  observations?: string;
}

// Mock data para os agendamentos
const mockAppointments: AppointmentRecord[] = [
  {
    id: "1",
    patientId: "1",
    patientName: "Ana",
    patientAge: 35,
    diagnosis: "Fratura no braço",
    date: "2025-08-15",
    time: "09:00",
    status: "agendado",
    professional: "Dr. Carlos Silva",
    createdAt: new Date(2025, 7, 14, 10, 30),
    observations: "Primeira consulta pós-fratura",
  },
  {
    id: "2",
    patientId: "2",
    patientName: "Carlos Pereira",
    patientAge: 42,
    diagnosis: "Lesão no joelho",
    date: "2025-08-15",
    time: "14:00",
    status: "confirmado",
    professional: "Dra. Maria Santos",
    createdAt: new Date(2025, 7, 14, 8, 15),
    observations: "Retorno para avaliação",
  },
  {
    id: "3",
    patientId: "3",
    patientName: "Mariana mariano Lima",
    patientAge: 28,
    diagnosis: "Tendinite",
    date: "2025-08-16",
    time: "10:30",
    status: "agendado",
    professional: "Dr. João Almeida",
    createdAt: new Date(2025, 7, 14, 14, 45),
  },
  {
    id: "4",
    patientId: "4",
    patientName: "Lucas Fernandes",
    patientAge: 31,
    diagnosis: "Entorse no tornozelo",
    date: "2025-08-16",
    time: "16:00",
    status: "concluido",
    professional: "Dra. Ana Costa",
    createdAt: new Date(2025, 7, 13, 11, 20),
    observations: "Consulta realizada com sucesso",
  },
  {
    id: "5",
    patientId: "5",
    patientName: "Juliana Costa",
    patientAge: 45,
    diagnosis: "Hérnia de disco",
    date: "2025-08-17",
    time: "08:00",
    status: "cancelado",
    professional: "Dr. Roberto Martins",
    createdAt: new Date(2025, 7, 14, 16, 10),
    observations: "Cancelado pelo paciente",
  },
  {
    id: "6",
    patientId: "1",
    patientName: "Ana",
    patientAge: 35,
    diagnosis: "Fratura no braço",
    date: "2025-08-18",
    time: "15:30",
    status: "agendado",
    professional: "Dr. Carlos Silva",
    createdAt: new Date(2025, 7, 14, 12, 0),
    observations: "Consulta de acompanhamento",
  },
];

interface ListaAppointmentsProps {
  onBack?: () => void;
}

export default function ListaAppointments({ onBack }: ListaAppointmentsProps) {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    AppointmentRecord[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todos");

  // Estados para os modais
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentRecord | null>(null);
  const [editingAppointment, setEditingAppointment] =
    useState<AppointmentRecord | null>(null);

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

  // Carregar agendamentos ao montar o componente
  useEffect(() => {
    const loadAppointments = () => {
      // Verificar se há uma flag indicando que os dados foram inicializados
      const isInitialized = localStorage.getItem("appointmentsInitialized");

      if (!isInitialized) {
        // Primeira vez - salvar dados mock no localStorage
        localStorage.setItem("appointments", JSON.stringify(mockAppointments));
        localStorage.setItem("appointmentsInitialized", "true");
        setAppointments(mockAppointments);
      } else {
        // Carregar apenas do localStorage
        const savedAppointments = JSON.parse(
          localStorage.getItem("appointments") || "[]"
        );

        // Converter datas de string para Date nos agendamentos salvos
        const parsedSavedAppointments = savedAppointments.map((apt: any) => ({
          ...apt,
          createdAt: new Date(apt.createdAt),
        }));

        setAppointments(parsedSavedAppointments);
      }
    };

    loadAppointments();
  }, []);

  // Filtrar agendamentos baseado na busca e status
  useEffect(() => {
    let filtered = appointments;

    // Filtrar por nome do paciente
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((appointment) =>
        appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por status
    if (filterStatus !== "todos") {
      filtered = filtered.filter(
        (appointment) => appointment.status === filterStatus
      );
    }

    setFilteredAppointments(filtered);
  }, [searchTerm, filterStatus, appointments]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      agendado: { color: "bg-blue-100 text-blue-800", label: "Agendado" },
      confirmado: { color: "bg-green-100 text-green-800", label: "Confirmado" },
      concluido: { color: "bg-gray-100 text-gray-800", label: "Concluído" },
      cancelado: { color: "bg-red-100 text-red-800", label: "Cancelado" },
      faltou: { color: "bg-orange-100 text-orange-800", label: "Faltou" },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] ||
      statusConfig.agendado;

    return <Badge className={`${config.color} border-0`}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString("pt-BR");
  };

  const handleStatusChange = (appointmentId: string, newStatus: string) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status: newStatus as any }
          : appointment
      )
    );
  };

  const handleNewAppointment = () => {
    navigate("/agendamento");
  };

  const handleViewDetails = (appointmentId: string) => {
    const appointment = appointments.find((a) => a.id === appointmentId);
    if (appointment) {
      setSelectedAppointment(appointment);
      setViewModalOpen(true);
    }
  };

  const handleEditAppointment = (appointmentId: string) => {
    const appointment = appointments.find((a) => a.id === appointmentId);
    if (appointment) {
      setEditingAppointment({ ...appointment });
      setEditModalOpen(true);
    }
  };

  const handleSaveEdit = () => {
    if (editingAppointment) {
      const updatedAppointments = appointments.map((appointment) =>
        appointment.id === editingAppointment.id
          ? editingAppointment
          : appointment
      );

      // Atualizar estado local
      setAppointments(updatedAppointments);

      // Salvar no localStorage
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

      setEditModalOpen(false);
      setEditingAppointment(null);
    }
  };

  const handleCancelEdit = () => {
    setEditModalOpen(false);
    setEditingAppointment(null);
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    if (confirm("Tem certeza que deseja excluir este agendamento?")) {
      const updatedAppointments = appointments.filter(
        (appointment) => appointment.id !== appointmentId
      );

      // Atualizar estado local
      setAppointments(updatedAppointments);

      // Salvar no localStorage
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-purple-50/80 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-medical mb-6">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack || (() => navigate("/receptionist"))}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar
                </Button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-medical rounded-full flex items-center justify-center">
                    <CalendarDays className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                      Lista de Agendamentos
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-sm">
                      Gerencie todos os agendamentos de consultas
                    </CardDescription>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleNewAppointment}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                Novo Agendamento
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Filtros e Busca */}
        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-medical mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Buscar por paciente
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Digite o nome do paciente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Filtrar por status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todos">Todos os status</option>
                  <option value="agendado">Agendado</option>
                  <option value="confirmado">Confirmado</option>
                  <option value="concluido">Concluído</option>
                  <option value="cancelado">Cancelado</option>
                  <option value="faltou">Faltou</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-medical">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold">{appointments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-medical">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Agendados</p>
                  <p className="text-2xl font-bold">
                    {appointments.filter((a) => a.status === "agendado").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-medical">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Concluídos
                  </p>
                  <p className="text-2xl font-bold">
                    {
                      appointments.filter((a) => a.status === "concluido")
                        .length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-medical">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Cancelados
                  </p>
                  <p className="text-2xl font-bold">
                    {
                      appointments.filter((a) => a.status === "cancelado")
                        .length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Agendamentos */}
        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-medical">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Agendamentos ({filteredAppointments.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Diagnóstico</TableHead>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Profissional</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {appointment.patientName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {appointment.patientAge} anos • ID:{" "}
                            {appointment.patientId}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{appointment.diagnosis}</span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {formatDate(appointment.date)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {appointment.time}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {appointment.professional || "Não definido"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(appointment.status)}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-500">
                          {formatDateTime(appointment.createdAt)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(appointment.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleEditAppointment(appointment.id)
                            }
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleDeleteAppointment(appointment.id)
                            }
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredAppointments.length === 0 && (
              <div className="p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum agendamento encontrado
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || filterStatus !== "todos"
                    ? "Tente ajustar os filtros de busca."
                    : "Nenhum agendamento foi criado ainda."}
                </p>
                <Button
                  onClick={handleNewAppointment}
                  className="flex items-center gap-2 mx-auto"
                >
                  <Plus className="h-4 w-4" />
                  Criar Primeiro Agendamento
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal de Visualização de Detalhes */}
        <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Detalhes do Agendamento
              </DialogTitle>
              <DialogDescription>
                Informações completas do agendamento selecionado
              </DialogDescription>
            </DialogHeader>

            {selectedAppointment && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Paciente
                    </Label>
                    <p className="text-sm font-medium">
                      {selectedAppointment.patientName}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Idade
                    </Label>
                    <p className="text-sm">
                      {selectedAppointment.patientAge} anos
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      ID do Paciente
                    </Label>
                    <p className="text-sm">{selectedAppointment.patientId}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Diagnóstico
                    </Label>
                    <p className="text-sm">{selectedAppointment.diagnosis}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Data
                    </Label>
                    <p className="text-sm">
                      {formatDate(selectedAppointment.date)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Horário
                    </Label>
                    <p className="text-sm">{selectedAppointment.time}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Profissional
                    </Label>
                    <p className="text-sm">
                      {selectedAppointment.professional || "Não definido"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Status
                    </Label>
                    <div className="mt-1">
                      {getStatusBadge(selectedAppointment.status)}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-sm font-medium text-gray-600">
                      Criado em
                    </Label>
                    <p className="text-sm">
                      {formatDateTime(selectedAppointment.createdAt)}
                    </p>
                  </div>
                  {selectedAppointment.observations && (
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium text-gray-600">
                        Observações
                      </Label>
                      <p className="text-sm">
                        {selectedAppointment.observations}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal de Edição */}
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Editar Agendamento
              </DialogTitle>
              <DialogDescription>
                Altere as informações do agendamento
              </DialogDescription>
            </DialogHeader>

            {editingAppointment && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-date" className="text-sm font-medium">
                      Data
                    </Label>
                    <Input
                      id="edit-date"
                      type="date"
                      value={editingAppointment.date}
                      onChange={(e) =>
                        setEditingAppointment({
                          ...editingAppointment,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-time" className="text-sm font-medium">
                      Horário
                    </Label>
                    <Select
                      value={editingAppointment.time}
                      onValueChange={(value) =>
                        setEditingAppointment({
                          ...editingAppointment,
                          time: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor="edit-professional"
                      className="text-sm font-medium"
                    >
                      Profissional
                    </Label>
                    <Input
                      id="edit-professional"
                      value={editingAppointment.professional || ""}
                      onChange={(e) =>
                        setEditingAppointment({
                          ...editingAppointment,
                          professional: e.target.value,
                        })
                      }
                      placeholder="Nome do profissional"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="edit-status"
                      className="text-sm font-medium"
                    >
                      Status
                    </Label>
                    <Select
                      value={editingAppointment.status}
                      onValueChange={(value) =>
                        setEditingAppointment({
                          ...editingAppointment,
                          status: value as AppointmentRecord["status"],
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agendado">Agendado</SelectItem>
                        <SelectItem value="confirmado">Confirmado</SelectItem>
                        <SelectItem value="concluido">Concluído</SelectItem>
                        <SelectItem value="cancelado">Cancelado</SelectItem>
                        <SelectItem value="faltou">Faltou</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label
                      htmlFor="edit-observations"
                      className="text-sm font-medium"
                    >
                      Observações
                    </Label>
                    <Input
                      id="edit-observations"
                      value={editingAppointment.observations || ""}
                      onChange={(e) =>
                        setEditingAppointment({
                          ...editingAppointment,
                          observations: e.target.value,
                        })
                      }
                      placeholder="Observações adicionais"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleCancelEdit}
                    className="flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleSaveEdit}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <Save className="h-4 w-4" />
                    Salvar Alterações
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
