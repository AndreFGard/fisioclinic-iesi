"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import { FilaDeEsperaTable } from "@/components/table-fila-de-espera/data-table";
import { columns as columnsFactory} from "@/components/table-fila-de-espera/columns";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react"; // ou o ícone que você estiver usando
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { FilaDeEspera, getWaitingQueueData } from "@/lib/api";


const CommitChangesButton = ({ trigger }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Função para buscar ou atualizar dados
    async function fetchData() {
      console.log("Atualizando porque 'trigger' mudou:", trigger);
      const response = await fetch(`/api/data?param=${trigger}`);
      const result = await response.json();
      setData(result);
    }

    fetchData();
  }, [trigger]); // O efeito será executado sempre que 'trigger' mudar

  return (
    <div>
      <h1>Dados Atualizados</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};


const placeholderAppointments = [{
  id: "1",
  nome: "Ana DO PLACEHOLDER",
  idade: 28,
  "tel1": "(11) 91234-5678",
  "tel2": "(11) 99876-5432",
  bairro: "Centro",
  diagnostico: "Fratura no braço",
  disciplina: "Ortopedia",
  hospital: "Hospital São Lucas",
  "medico(a)": "Dr. Ricardo Lima",
  "data da procura": "2025-08-10",
  situacao: "Em tratamento",
},]
const ReceptionistDashboard = () => {
  const [appointments, setAppointments] = useState<FilaDeEspera[]>(placeholderAppointments);
  const [searchTerm, setSearchTerm] = useState("");
  const [changesLog, setChangesLog] = useState<FilaDeEspera[]>([]);
  const sendRowChange = (c: FilaDeEspera) => setChangesLog([...changesLog, c])


  async function fetchData() {
    const data = await getWaitingQueueData();
    setAppointments(data);
  }

  const navigate = useNavigate();
  useEffect(() => {
    changesLog;
    fetchData();
  }, []);

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
      </div>


      <div className="w-full px-4 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Fila de Espera</CardTitle>
          </CardHeader>
          <CardContent>
            <FilaDeEsperaTable
              columns={columnsFactory(setAppointments,sendRowChange)}
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

export default ReceptionistDashboard;
