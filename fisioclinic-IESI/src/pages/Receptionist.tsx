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
import { FilaDeEspera as ApiFilaDeEspera, replaceEntireWaitingQueueRow } from "@/lib/api";

// Interface para os dados locais da fila de espera
interface LocalFilaDeEspera {
  id: string;
  nome: string;
  idade: number;
  "telefone-1": string;
  "telefone-2": string;
  bairro: string;
  diagnostico: string;
  disciplina: string;
  hospital: string;
  "medico(a)": string;
  "data da procura": string;
  situacao: string;
  prioridade: string;
}

// Função para converter do formato local para o formato da API
function convertToApiFormat(local: LocalFilaDeEspera): ApiFilaDeEspera {
  return {
    id: local.id,
    nome: local.nome,
    idade: local.idade,
    tel1: local["telefone-1"],
    tel2: local["telefone-2"],
    bairro: local.bairro,
    diagnostico: local.diagnostico,
    disciplina: local.disciplina,
    hospital: local.hospital,
    "medico(a)": local["medico(a)"],
    "data da procura": local["data da procura"],
    situacao: local.situacao,
    prioridade: local.prioridade
  };
}

// Função para converter do formato da API para o formato local
function convertFromApiFormat(api: ApiFilaDeEspera): LocalFilaDeEspera {
  return {
    id: api.id,
    nome: api.nome,
    idade: api.idade,
    "telefone-1": api.tel1,
    "telefone-2": api.tel2,
    bairro: api.bairro,
    diagnostico: api.diagnostico,
    disciplina: api.disciplina,
    hospital: api.hospital,
    "medico(a)": api["medico(a)"],
    "data da procura": api["data da procura"],
    situacao: api.situacao,
    prioridade: api.prioridade
  };
}


// Função para buscar dados (simulação de API)
async function getData(): Promise<LocalFilaDeEspera[]> {
  return [
    {
      id: "1",
      nome: "Ana Souza",
      idade: 28,
      "telefone-1": "(11) 91234-5678",
      "telefone-2": "(11) 99876-5432",
      bairro: "Centro",
      diagnostico: "Fratura no braço",
      disciplina: "Ortopedia",
      hospital: "Hospital São Lucas",
      "medico(a)": "Dr. Ricardo Lima",
      "data da procura": "2025-08-10",
      situacao: "Em tratamento",
      prioridade: "alta"
    },
    {
      id: "2",
      nome: "Carlos Pereira",
      idade: 45,
      "telefone-1": "(21) 92345-6789",
      "telefone-2": "(21) 98765-4321",
      bairro: "Jardim das Flores",
      diagnostico: "Lesão no joelho",
      disciplina: "Fisioterapia",
      hospital: "Hospital Santa Maria",
      "medico(a)": "Dra. Fernanda Costa",
      "data da procura": "2025-08-11",
      situacao: "Concluído",
      prioridade: "média"
    },
    {
      id: "3",
      nome: "Mariana Lima",
      idade: 34,
      "telefone-1": "(31) 93456-7890",
      "telefone-2": "(31) 97654-3210",
      bairro: "Bairro Verde",
      diagnostico: "Tendinite",
      disciplina: "Fisioterapia",
      hospital: "Hospital das Clínicas",
      "medico(a)": "Dr. João Almeida",
      "data da procura": "2025-08-12",
      situacao: "Fila de espera",
      prioridade: "alta"
    },
    {
      id: "4",
      nome: "Lucas Fernandes",
      idade: 22,
      "telefone-1": "(41) 94567-8901",
      "telefone-2": "(41) 96543-2109",
      bairro: "Centro",
      diagnostico: "Entorse no tornozelo",
      disciplina: "Ortopedia",
      hospital: "Hospital Regional",
      "medico(a)": "Dra. Camila Rocha",
      "data da procura": "2025-08-12",
      situacao: "Em tratamento",
      prioridade: "baixa"
    },
    {
      id: "5",
      nome: "Juliana Costa",
      idade: 50,
      "telefone-1": "(51) 95678-9012",
      "telefone-2": "(51) 97654-3210",
      bairro: "Bairro Alto",
      diagnostico: "Hérnia de disco",
      disciplina: "Neurologia",
      hospital: "Hospital Central",
      "medico(a)": "Dr. Roberto Martins",
      "data da procura": "2025-08-13",
      situacao: "Concluído",
      prioridade: "alta"
    },
    {
      id: "6",
      nome: "Roberto Silva",
      idade: 60,
      "telefone-1": "(61) 91234-5678",
      "telefone-2": "(61) 99876-5432",
      bairro: "Centro",
      diagnostico: "Fratura na perna",
      disciplina: "Ortopedia",
      hospital: "Hospital São Lucas",
      "medico(a)": "Dr. Ricardo Lima",
      "data da procura": "2025-08-10",
      situacao: "Em tratamento",
      prioridade: "baixa"
    },
    {
      id: "7",
      nome: "Patrícia Gomes",
      idade: 38,
      "telefone-1": "(71) 91234-5678",
      "telefone-2": "(71) 99876-5432",
      bairro: "Centro",
      diagnostico: "Fratura no braço",
      disciplina: "Ortopedia",
      hospital: "Hospital São Lucas",
      "medico(a)": "Dr. Ricardo Lima",
      "data da procura": "2025-08-10",
      situacao: "Em tratamento",
      prioridade: "baixa"
    },
  ];
}

const Receptionist = () => {
  const [appointments, setAppointments] = useState<LocalFilaDeEspera[]>([]);
  const [changesLog, setChangesLog] = useState<ApiFilaDeEspera[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
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
      const localChange = convertFromApiFormat(change);
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
    patient["telefone-1"].includes(searchTerm) ||
    patient["telefone-2"].includes(searchTerm)
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
      </div>


      <div className="w-full px-4 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Fila de Espera</CardTitle>
          </CardHeader>
          <CardContent>
            <FilaDeEsperaTable
              columns={columnsFactory(
                (newData) => setAppointments(newData as unknown as LocalFilaDeEspera[]),
                handleRowChange,
                handlePriorityChange
              )}
              data={filteredAppointments.map(item => convertToApiFormat(item))}
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
