"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import { FilaDeEsperaTable } from "@/components/table-fila-de-espera/data-table";
import { columns as columnsFactory } from "@/components/table-fila-de-espera/columns";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react"; 
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { FilaDeEspera as ApiFilaDeEspera, FilaDeEspera, getWaitingQueueData, replaceEntireWaitingQueueRow } from "@/lib/api";
import { Calendar } from "lucide-react"; // ou o ícone que você estiver usando

const Receptionist = () => {
  const [appointments, setAppointments] = useState<FilaDeEspera[]>([]);
  const [changesLog, setChangesLog] = useState<ApiFilaDeEspera[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await getWaitingQueueData();
      setAppointments(data);
    }
    fetchData();
  }, []);

  // Função para lidar com alterações em uma linha da tabela
  const handleRowChange = (change: ApiFilaDeEspera) => {
    // Adiciona a alteração ao log de alterações
    setChangesLog(prev => {
      const exists = prev.find(item => item.id === change.id);
      if (exists) {
        return prev.map(item => item.id === change.id ? change : item);
      } else {
        return [...prev, change];
      }
    });
    
    // Atualiza o estado local também
    setAppointments(prev => {
      // Converte o item da API para o formato local antes de atualizar
      const localChange = (change);
      return prev.map(item => item.id === localChange.id ? localChange : item);
    });
  };
  
  // Função para tratar alterações na prioridade
  const handlePriorityChange = (id: string, newPriority: string) => {
    setAppointments(prev =>
      prev.map(p => (p.id === id ? { ...p, prioridade: newPriority } : p))
    );
  };

  // Filtragem por nome ou telefones
  const filteredAppointments = appointments.filter(patient =>
    patient.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient["tel1"].includes(searchTerm) ||
    patient["tel2"].includes(searchTerm)
  );

  return (
    <div className="min-h-screen max-w-full bg-background">
      <NavBar setor="Recepção" />
      <div className="flex items-center justify-between border-b bg-card p-4">
        {/* Área de busca e contagem */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar por nome ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          <span className="text-sm text-muted-foreground">
            {filteredAppointments.length} de {appointments.length} pacientes
          </span>
        </div>


        {/* Botão Novo Paciente */}
        <Button onClick={() => navigate("/new-patient")}>
          <UserPlus className="mr-2 h-4 w-4" />
          Novo Paciente
        </Button>

        {/* Botão Novo Enfileirado */}
        <Button onClick={() => navigate("/new-enfileirado")}>
          <UserPlus className="mr-2 h-4 w-4" />
          Adicionar à fila
        </Button>

        {/* Botões de Ação */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => navigate("/lista-agendamentos")}
            className="flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            Agendamentos
          </Button>
          <Button onClick={() => navigate("/new-patient")}>
            <UserPlus className="mr-2 h-4 w-4" />
            Novo Paciente
          </Button>
        </div>

      </div>


      <div className="w-full px-4 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Fila de Espera</CardTitle>
          </CardHeader>
          <CardContent>
            <FilaDeEsperaTable
              columns={columnsFactory(
                (newData) => setAppointments(newData),
                handleRowChange,
                handlePriorityChange
              )}
              data={filteredAppointments}
              changesLog={changesLog}
              setChangesLog={setChangesLog}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Receptionist;
