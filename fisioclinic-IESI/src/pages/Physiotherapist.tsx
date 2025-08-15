"use client";

import { useState, useEffect } from "react";
import { Bell, Clock, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FilaDeEsperaTable } from "@/components/table-fila-de-espera/data-table";
import { columns as columnsFactory } from "@/components/table-fila-de-espera/columns";

import { PatientsTable } from "@/components/Physiotherapist/tables/patients-page/PatientsTable";
import {patientsColumns } from "@/components/Physiotherapist/tables/patients-page/Patients-columns";

import { StudentsTable } from "@/components/Physiotherapist/tables/students-page/StudentsTable";
import { Students, studentsColumns } from "@/components/Physiotherapist/tables/students-page/Students-columns";

import NavBar from "@/components/NavBar";

// Tipos
interface PhysiotherapistProps {
  physiotherapist: string;
  setor: string;
}

// Importação do tipo FilaDeEspera da API
import { FilaDeEspera as ApiFilaDeEspera, FilaDeEspera, getPatient, getPatientList, getWaitingQueueData } from "@/lib/api";



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



// Componente principal
export default function Physiotherapist({ physiotherapist, setor }: PhysiotherapistProps) {
  const [waitingQueue, setWaitingQueue] = useState<FilaDeEspera[]>([]);
  const [patientsInTreatment, setPatientsInTreatment] = useState<FilaDeEspera[]>([]);
  const [students, setStudents] = useState<Students[]>([]);
  const [searchTermStudents, setSearchTermStudents] = useState("");
  const [searchTermQueue, setSearchTermQueue] = useState("");
  const [searchTermPatients, setSearchTermPatients] = useState("");
  const [changesLog, setChangesLog] = useState<ApiFilaDeEspera[]>([]);

  useEffect(() => {
    // Fila de espera e pacientes
    async function a() {
      const data = await getWaitingQueueData();
      const fila = data.filter(p => p.situacao === "Fila de espera");
      //const pacientes = data.filter(p => p.situacao !== "Fila de espera");
      const pacientes = await getPatientList();

      setWaitingQueue(fila);
      setPatientsInTreatment(pacientes as unknown as FilaDeEspera[]);

      // Estudantes
      const estudantes = await getDataEstudantes();
      setStudents(estudantes);
    }
    a();
  }, []);


  const handlePriorityChange = (id: string, newPriority: string) => {
    setPatientsInTreatment(prev =>
      prev.map(p => (p.id === id ? { ...p, prioridade: newPriority } : p))
    );
  };
  
  // Função para lidar com alterações na tabela de fila de espera
  const handleRowChange = (change: ApiFilaDeEspera) => {
    // Adiciona a alteração ao log de alterações se ainda não existir
    setChangesLog(prev => {
      // Verifica se já existe uma alteração para este ID
      const exists = prev.find(item => item.id === change.id);
      if (exists) {
        // Atualiza a alteração existente
        return prev.map(item => item.id === change.id ? change : item);
      } else {
        // Adiciona uma nova alteração
        return [...prev, change];
      }
    });
    
    // Atualiza o estado local também
    setWaitingQueue(prev => {
      // Converte o item da API para o formato local antes de atualizar
      const localChange = (change);
      return prev.map(item => item.id === localChange.id ? localChange : item);
    });
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
      item["tel1"].toLowerCase().includes(t) ||
      item["tel2"].toLowerCase().includes(t) ||
      item.diagnostico.toLowerCase().includes(t) ||
      item.bairro.toLowerCase().includes(t)
    );
  }

  function filterPatients(patients: FilaDeEspera[], term: string) {
    const t = term.toLowerCase();
    return patients.filter(patient =>
      patient.nome.toLowerCase().includes(t) ||
      (patient["tel1"] && patient["tel1"].toLowerCase().includes(t)) ||
      (patient["tel2"] && patient["tel2"].toLowerCase().includes(t))
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
                  columns={columnsFactory(
                    (newData) => setWaitingQueue(newData as unknown as FilaDeEspera[]),
                    handleRowChange,
                    handlePriorityChange
                  )}
                  data={filteredQueue.map(item => (item))}
                  changesLog={changesLog}
                  setChangesLog={setChangesLog}
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
