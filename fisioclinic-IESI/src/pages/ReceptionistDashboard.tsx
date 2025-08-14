"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import { FilaDeEsperaTable } from "@/components/table-fila-de-espera/data-table";
import { columns as columnsFactory, FilaDeEspera } from "@/components/table-fila-de-espera/columns";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react"; // ou o ícone que você estiver usando
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";


// Função para buscar dados (simulação de API)
async function getData(): Promise<FilaDeEspera[]> {
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
    },
    {
      id: "8",
      nome: "Fernando Alves",
      idade: 55,
      "telefone-1": "(81) 91234-5678",
      "telefone-2": "(81) 99876-5432",
      bairro: "Boa Vista",
      diagnostico: "Artrose",
      disciplina: "Reumatologia",
      hospital: "Hospital Boa Vista",
      "medico(a)": "Dra. Paula Mendes",
      "data da procura": "2025-08-14",
      situacao: "Em tratamento",
    },
    {
      id: "9",
      nome: "Sofia Martins",
      idade: 29,
      "telefone-1": "(91) 91234-5678",
      "telefone-2": "(91) 99876-5432",
      bairro: "Centro",
      diagnostico: "Luxação no ombro",
      disciplina: "Ortopedia",
      hospital: "Hospital São Lucas",
      "medico(a)": "Dr. Ricardo Lima",
      "data da procura": "2025-08-15",
      situacao: "Fila de espera",
    },
    {
      id: "10",
      nome: "Eduardo Ramos",
      idade: 40,
      "telefone-1": "(31) 91234-5678",
      "telefone-2": "(31) 99876-5432",
      bairro: "Bairro Novo",
      diagnostico: "Lesão muscular",
      disciplina: "Fisioterapia",
      hospital: "Hospital das Clínicas",
      "medico(a)": "Dr. João Almeida",
      "data da procura": "2025-08-16",
      situacao: "Em tratamento",
    },
    {
      id: "11",
      nome: "Camila Oliveira",
      idade: 36,
      "telefone-1": "(21) 91234-5678",
      "telefone-2": "(21) 99876-5432",
      bairro: "Jardim das Flores",
      diagnostico: "Torcicolo",
      disciplina: "Fisioterapia",
      hospital: "Hospital Santa Maria",
      "medico(a)": "Dra. Fernanda Costa",
      "data da procura": "2025-08-17",
      situacao: "Concluído",
    },
    {
      id: "12",
      nome: "Bruno Castro",
      idade: 48,
      "telefone-1": "(41) 91234-5678",
      "telefone-2": "(41) 99876-5432",
      bairro: "Centro",
      diagnostico: "Fratura no tornozelo",
      disciplina: "Ortopedia",
      hospital: "Hospital Regional",
      "medico(a)": "Dra. Camila Rocha",
      "data da procura": "2025-08-18",
      situacao: "Em tratamento",
    },
    {
      id: "13",
      nome: "Larissa Mendes",
      idade: 32,
      "telefone-1": "(51) 91234-5678",
      "telefone-2": "(51) 99876-5432",
      bairro: "Bairro Alto",
      diagnostico: "Escoliose",
      disciplina: "Ortopedia",
      hospital: "Hospital Central",
      "medico(a)": "Dr. Roberto Martins",
      "data da procura": "2025-08-19",
      situacao: "Fila de espera",
    },
    {
      id: "14",
      nome: "Marcelo Dias",
      idade: 52,
      "telefone-1": "(61) 91234-5678",
      "telefone-2": "(61) 99876-5432",
      bairro: "Centro",
      diagnostico: "Hérnia inguinal",
      disciplina: "Cirurgia",
      hospital: "Hospital São Lucas",
      "medico(a)": "Dr. Ricardo Lima",
      "data da procura": "2025-08-20",
      situacao: "Concluído",
    },
    {
      id: "15",
      nome: "Renata Farias",
      idade: 27,
      "telefone-1": "(71) 91234-5678",
      "telefone-2": "(71) 99876-5432",
      bairro: "Centro",
      diagnostico: "Tendinite",
      disciplina: "Fisioterapia",
      hospital: "Hospital São Lucas",
      "medico(a)": "Dr. Ricardo Lima",
      "data da procura": "2025-08-21",
      situacao: "Em tratamento",
    },
    {
      id: "16",
      nome: "Gustavo Lima",
      idade: 44,
      "telefone-1": "(81) 91234-5678",
      "telefone-2": "(81) 99876-5432",
      bairro: "Boa Vista",
      diagnostico: "Lesão no quadril",
      disciplina: "Ortopedia",
      hospital: "Hospital Boa Vista",
      "medico(a)": "Dra. Paula Mendes",
      "data da procura": "2025-08-22",
      situacao: "Fila de espera",
    },
    {
      id: "17",
      nome: "Isabela Santos",
      idade: 31,
      "telefone-1": "(91) 91234-5678",
      "telefone-2": "(91) 99876-5432",
      bairro: "Centro",
      diagnostico: "Fratura no pé",
      disciplina: "Ortopedia",
      hospital: "Hospital São Lucas",
      "medico(a)": "Dr. Ricardo Lima",
      "data da procura": "2025-08-23",
      situacao: "Em tratamento",
    },
    // Novos pacientes adicionados
    {
      id: "18",
      nome: "Thiago Moreira",
      idade: 41,
      "telefone-1": "(11) 93456-7890",
      "telefone-2": "(11) 97654-3210",
      bairro: "Vila Nova",
      diagnostico: "Lesão no ombro",
      disciplina: "Ortopedia",
      hospital: "Hospital São Lucas",
      "medico(a)": "Dr. Ricardo Lima",
      "data da procura": "2025-08-24",
      situacao: "Fila de espera",
    },
    {
      id: "19",
      nome: "Beatriz Nunes",
      idade: 26,
      "telefone-1": "(21) 94567-8901",
      "telefone-2": "(21) 96543-2109",
      bairro: "Jardim América",
      diagnostico: "Tendinite",
      disciplina: "Fisioterapia",
      hospital: "Hospital Santa Maria",
      "medico(a)": "Dra. Fernanda Costa",
      "data da procura": "2025-08-25",
      situacao: "Em tratamento",
    },
    {
      id: "20",
      nome: "Rafael Teixeira",
      idade: 39,
      "telefone-1": "(31) 95678-9012",
      "telefone-2": "(31) 97654-3210",
      bairro: "Bairro Industrial",
      diagnostico: "Fratura no braço",
      disciplina: "Ortopedia",
      hospital: "Hospital das Clínicas",
      "medico(a)": "Dr. João Almeida",
      "data da procura": "2025-08-26",
      situacao: "Concluído",
    },
    {
      id: "21",
      nome: "Amanda Pires",
      idade: 33,
      "telefone-1": "(41) 91234-5678",
      "telefone-2": "(41) 99876-5432",
      bairro: "Centro",
      diagnostico: "Lesão muscular",
      disciplina: "Fisioterapia",
      hospital: "Hospital Regional",
      "medico(a)": "Dra. Camila Rocha",
      "data da procura": "2025-08-27",
      situacao: "Em tratamento",
    },
    {
      id: "22",
      nome: "Felipe Cardoso",
      idade: 47,
      "telefone-1": "(51) 91234-5678",
      "telefone-2": "(51) 99876-5432",
      bairro: "Bairro Alto",
      diagnostico: "Artrose",
      disciplina: "Reumatologia",
      hospital: "Hospital Central",
      "medico(a)": "Dr. Roberto Martins",
      "data da procura": "2025-08-28",
      situacao: "Fila de espera",
    },
    {
      id: "23",
      nome: "Letícia Barbosa",
      idade: 29,
      "telefone-1": "(61) 91234-5678",
      "telefone-2": "(61) 99876-5432",
      bairro: "Centro",
      diagnostico: "Hérnia de disco",
      disciplina: "Neurologia",
      hospital: "Hospital São Lucas",
      "medico(a)": "Dr. Ricardo Lima",
      "data da procura": "2025-08-29",
      situacao: "Em tratamento",
    },
    {
      id: "24",
      nome: "João Pedro Araújo",
      idade: 36,
      "telefone-1": "(71) 91234-5678",
      "telefone-2": "(71) 99876-5432",
      bairro: "Centro",
      diagnostico: "Luxação no ombro",
      disciplina: "Ortopedia",
      hospital: "Hospital São Lucas",
      "medico(a)": "Dr. Ricardo Lima",
      "data da procura": "2025-08-30",
      situacao: "Concluído",
    },
    {
      id: "25",
      nome: "Marta Cunha",
      idade: 53,
      "telefone-1": "(81) 91234-5678",
      "telefone-2": "(81) 99876-5432",
      bairro: "Boa Vista",
      diagnostico: "Lesão no joelho",
      disciplina: "Fisioterapia",
      hospital: "Hospital Boa Vista",
      "medico(a)": "Dra. Paula Mendes",
      "data da procura": "2025-08-31",
      situacao: "Fila de espera",
    }
  ];
}

const ReceptionistDashboard = () => {
  const [appointments, setAppointments] = useState<FilaDeEspera[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setAppointments(data);
    }
    fetchData();
  }, []);

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
        <Button onClick={() => navigate("/")}>
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
              columns={columnsFactory(setAppointments)}
              data={filteredAppointments}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
