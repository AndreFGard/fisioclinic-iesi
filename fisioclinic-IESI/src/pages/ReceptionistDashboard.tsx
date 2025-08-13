import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import NavBar from "@/components/NavBar";
import { DataTable } from "@/components/table-fila-de-espera/data-table"; // ajuste o caminho
import { columns, FilaDeEspera } from "@/components/table-fila-de-espera/columns"; // ajuste o caminho
import { 
  UserPlus, 
  Users, 
  UserCog, 
  Clock, 
  Search,
  Bell,
  LogOut,
  Calendar,
  Phone,
  Mail
} from "lucide-react";

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
      situacao: "Pendente",
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
  ];
}


const ReceptionistDashboard = () => {
  const [appointments, setAppointments] = useState<FilaDeEspera[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data: FilaDeEspera[] = await getData();
      setAppointments(data);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavBar setor="Recepção" />

      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Agendamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={appointments} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
