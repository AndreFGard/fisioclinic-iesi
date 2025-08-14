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
      nome: "Ana Souza",
      semestre: 5,
    },
    {
      id: "2",
      nome: "Mariana Lima",
      semestre: 6,
    },
    {
      id: "3",
      nome: "Lucas Pereira",
      semestre: 4,
    },
    {
      id: "4",
      nome: "Carlos Silva",
      semestre: 7,
    },
    {
      id: "5",
      nome: "Juliana Alves",
      semestre: 8,
    },
    {
      id: "6",
      nome: "Fernanda Dias",
      semestre: 3,
    },
    {
      id: "7",
      nome: "Rafael Costa",
      semestre: 2,
    },
    {
      id: "8",
      nome: "Patrícia Gomes",
      semestre: 1,
    },
    {
      id: "9",
      nome: "Bruno Martins",
      semestre: 6,
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
  const [searchTermStudents, setSearchTermStudents] = useState("");
  const [searchTermQueue, setSearchTermQueue] = useState("");
  const [searchTermPatients, setSearchTermPatients] = useState("");

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

  // Funções de filtragem
  function filterStudents(students: Students[], term: string) {
    const t = term.toLowerCase();
    return students.filter(student =>
      student.nome.toLowerCase().includes(t) ||
      student.semestre.toString().includes(t)
    );
  }

  function filterQueue(queue: FilaDeEspera[], term: string) {
    const t = term.toLowerCase();
    return queue.filter(item =>
      item.nome.toLowerCase().includes(t) ||
      item["telefone-1"].toLowerCase().includes(t) ||
      item["telefone-2"].toLowerCase().includes(t) ||
      item.diagnostico.toLowerCase().includes(t) ||
      item.bairro.toLowerCase().includes(t)
    );
  }

  function filterPatients(patients: Pacients[], term: string) {
    const t = term.toLowerCase();
    return patients.filter(patient =>
      patient.nome.toLowerCase().includes(t) ||
      (patient["telefone-1"] && patient["telefone-1"].toLowerCase().includes(t)) ||
      (patient["telefone-2"] && patient["telefone-2"].toLowerCase().includes(t))
    );
  }

  // Filtrados
  const filteredStudents = filterStudents(students, searchTermStudents);
  const filteredQueue = filterQueue(waitingQueue, searchTermQueue);
  const filteredPatients = filterPatients(patientsInTreatment, searchTermPatients);

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
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
              Pacientes
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
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    <input
                      type="text"
                      placeholder="Buscar por nome, telefone, diagnóstico ou bairro..."
                      value={searchTermQueue}
                      onChange={e => setSearchTermQueue(e.target.value)}
                      className="pl-10 w-80 border rounded-md py-2"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {filteredQueue.length} de {waitingQueue.length} pacientes na fila
                  </span>
                </div>
                <FilaDeEsperaTable
                  columns={columnsFactory(setWaitingQueue)}
                  data={filteredQueue}
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
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    <input
                      type="text"
                      placeholder="Buscar por nome, telefone, diagnóstico ou bairro..."
                      value={searchTermPatients}
                      onChange={e => setSearchTermPatients(e.target.value)}
                      className="pl-10 w-80 border rounded-md py-2"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {filteredPatients.length} de {patientsInTreatment.length} pacientes
                  </span>
                </div>
                <PatientsTable data={filteredPatients} columns={columns} />
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
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    <input
                      type="text"
                      placeholder="Buscar por nome ou semestre..."
                      value={searchTermStudents}
                      onChange={e => setSearchTermStudents(e.target.value)}
                      className="pl-10 w-80 border rounded-md py-2"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {filteredStudents.length} de {students.length} estudantes
                  </span>
                </div>
                <StudentsTable
                  data={filteredStudents} columns={studentsColumns}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
