"use client";

import { useState, useEffect } from "react";
import { Bell, Clock, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FilaDeEsperaTable } from "@/components/table-fila-de-espera/data-table";
import { columns as columnsFactory } from "@/components/table-fila-de-espera/columns";

import { PatientsTable } from "@/components/Physiotherapist/tables/patients-page/PatientsTable";
import { Pacients, patientsColumns } from "@/components/Physiotherapist/tables/patients-page/Patients-columns";

import { StudentsTable } from "@/components/Physiotherapist/tables/students-page/StudentsTable";
import { Students, studentsColumns } from "@/components/Physiotherapist/tables/students-page/Students-columns";

import NavBar from "@/components/NavBar";

// Tipos
interface PhysiotherapistProps {
  physiotherapist: string;
  setor: string;
}

interface FilaDeEspera {
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

// Dados mockados
async function getDataEstudantes(): Promise<Students[]> {
  return [
    {
      id: "1",
      name: "Ana Souza",
      semester: "5",
      specialization: "Fisioterapia",
      status: "Ativo",
      university: "Universidade de São Paulo",
      supervisor: "Prof. Dr. João Silva",
      startDate: "2020-02-10",
      performance: "Bom",
      observations: "Nenhuma"
    },
    {
      id: "2",
      name: "Mariana Lima",
      semester: "6",
      specialization: "Fisioterapia",
      status: "Ativo",
      university: "Universidade Estadual de Campinas",
      supervisor: "Prof. Dr. Carlos Oliveira",
      startDate: "2019-08-15",
      performance: "Ótimo",
      observations: "Participa de projetos de extensão"
    },
    {
      id: "3",
      name: "Lucas Pereira",
      semester: "4",
      specialization: "Fisioterapia",
      status: "Inativo",
      university: "Universidade Federal de Minas Gerais",
      supervisor: "Prof. Dr. Ana Costa",
      startDate: "2021-01-20",
      performance: "Regular",
      observations: "Reprovado em disciplinas"
    }
  ];
}

async function geteDataFilaDeEspera(): Promise<FilaDeEspera[]> {
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
      prioridade: "média"
    },
    {
      id: "4",
      nome: "Carlos Silva",
      idade: 45,
      "telefone-1": "(41) 91234-5678",
      "telefone-2": "(41) 99876-5432",
      bairro: "Bairro Azul",
      diagnostico: "Lesão muscular",
      disciplina: "Fisioterapia",
      hospital: "Hospital Santa Cruz",
      "medico(a)": "Dr. Ana Paula",
      "data da procura": "2025-08-15",
      situacao: "Em tratamento",
      prioridade: "baixa"
    },
    {
      id: "5",
      nome: "Lucas Pereira",
      idade: 52,
      "telefone-1": "(21) 92345-6789",
      "telefone-2": "(21) 98765-4321",
      bairro: "Copacabana",
      diagnostico: "Hérnia de disco",
      disciplina: "Neurologia",
      hospital: "Hospital Central",
      "medico(a)": "Dr. Fernanda Costa",
      "data da procura": "2025-08-18",
      situacao: "Fila de espera",
      prioridade: "alta"
    },
    {
      id: "6",
      nome: "Juliana Alves",
      idade: 39,
      "telefone-1": "(85) 93456-1234",
      "telefone-2": "(85) 97654-5678",
      bairro: "Meireles",
      diagnostico: "Luxação no ombro",
      disciplina: "Ortopedia",
      hospital: "Hospital Regional",
      "medico(a)": "Dr. Paulo Mendes",
      "data da procura": "2025-08-20",
      situacao: "Em tratamento",
      prioridade: "média"
    },
    {
      id: "7",
      nome: "Fernanda Dias",
      idade: 31,
      "telefone-1": "(62) 91234-8765",
      "telefone-2": "(62) 99876-5432",
      bairro: "Setor Oeste",
      diagnostico: "Artrose",
      disciplina: "Reumatologia",
      hospital: "Hospital Goiânia",
      "medico(a)": "Dr. Lucas Martins",
      "data da procura": "2025-08-22",
      situacao: "Fila de espera",
      prioridade: "baixa"
    },
    {
      id: "8",
      nome: "Rafael Costa",
      idade: 47,
      "telefone-1": "(19) 93456-7890",
      "telefone-2": "(19) 97654-3210",
      bairro: "Jardim das Flores",
      diagnostico: "Lesão no joelho",
      disciplina: "Fisioterapia",
      hospital: "Hospital Campinas",
      "medico(a)": "Dr. Mariana Lopes",
      "data da procura": "2025-08-25",
      situacao: "Em tratamento",
      prioridade: "alta"
    },
    {
      id: "9",
      nome: "Patrícia Gomes",
      idade: 29,
      "telefone-1": "(27) 91234-5678",
      "telefone-2": "(27) 99876-5432",
      bairro: "Praia do Canto",
      diagnostico: "Entorse de tornozelo",
      disciplina: "Ortopedia",
      hospital: "Hospital Vitória",
      "medico(a)": "Dr. Eduardo Silva",
      "data da procura": "2025-08-28",
      situacao: "Fila de espera",
      prioridade: "média"
    }
  ];
}

// Componente principal
export default function Physiotherapist({ physiotherapist, setor }: PhysiotherapistProps) {
  const [waitingQueue, setWaitingQueue] = useState<FilaDeEspera[]>([]);
  const [patientsInTreatment, setPatientsInTreatment] = useState<Pacients[]>([]);
  const [students, setStudents] = useState<Students[]>([]);

  useEffect(() => {
    // Fila de espera e pacientes
    geteDataFilaDeEspera().then(data => {
      const fila = data.filter(p => p.situacao === "Fila de espera");
      const pacientes = data.filter(p => p.situacao !== "Fila de espera");

      setWaitingQueue(fila);
      setPatientsInTreatment(pacientes as Pacients[]);
    });

    // Estudantes
    getDataEstudantes().then(data => {
      setStudents(data);
    });
  }, []);

  const handlePriorityChange = (id: string, newPriority: string) => {
    setPatientsInTreatment(prev =>
      prev.map(p => (p.id === id ? { ...p, prioridade: newPriority } : p))
    );
  };

  const { columns } = patientsColumns(handlePriorityChange);

  return (
    <div className="min-h-screen max-w-full bg-background">
      <NavBar setor="Fisioterapeuta" />
      <div className="mx-auto max-w-[95%] space-y-6">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-foreground gap-10px pt-4">
            {physiotherapist} - {setor}
          </p>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />{" "}
              {new Date().toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="queue" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />Fila de Espera
            </TabsTrigger>
            <TabsTrigger value="patients" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />Pacientes
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />Estudantes
            </TabsTrigger>
          </TabsList>

          {/* Fila de Espera */}
          <TabsContent value="queue">
            <Card>
              <CardHeader>
                <CardTitle>Fila de Espera</CardTitle>
              </CardHeader>
              <CardContent>
                <FilaDeEsperaTable
                  columns={columnsFactory(setWaitingQueue)}
                  data={waitingQueue}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pacientes */}
          <TabsContent value="patients">
            <Card>
              <CardHeader>
                <CardTitle>Em atendimento</CardTitle>
              </CardHeader>
              <CardContent>
                <PatientsTable data={patientsInTreatment} columns={columns} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Estudantes */}
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />Estudantes em Supervisão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StudentsTable
                  data={students}
                  columns={studentsColumns}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
