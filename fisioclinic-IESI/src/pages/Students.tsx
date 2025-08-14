"use client";

import { useState, useEffect } from "react";
import { Bell, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { PatientsTable } from "@/components/Physiotherapist/tables/patients-page/PatientsTable";
import { Pacients, patientsColumns } from "@/components/Physiotherapist/tables/patients-page/Patients-columns";

import NavBar from "@/components/NavBar";

// Tipos
interface StudentProps {
  student: string;
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
    }
  ];
}

// Componente principal
export default function Sudents({ student, setor }: StudentProps) {
  const [patientsInTreatment, setPatientsInTreatment] = useState<Pacients[]>([]);
  const [searchTermPatients, setSearchTermPatients] = useState("");

  useEffect(() => {
    // Filtra apenas pacientes que não estão na fila de espera
    geteDataFilaDeEspera().then(data => {
      const pacientes = data.filter(p => p.situacao !== "Fila de espera");
      setPatientsInTreatment(pacientes as Pacients[]);
    });
  }, []);

  const handlePriorityChange = (id: string, newPriority: string) => {
    setPatientsInTreatment(prev =>
      prev.map(p => (p.id === id ? { ...p, prioridade: newPriority } : p))
    );
  };

  const { columns } = patientsColumns(handlePriorityChange);

  const filteredPatients = patientsInTreatment.filter(patient => {
    const t = searchTermPatients.toLowerCase();
    return (
      patient.nome.toLowerCase().includes(t) ||
      (patient["telefone-1"] && patient["telefone-1"].toLowerCase().includes(t)) ||
      (patient["telefone-2"] && patient["telefone-2"].toLowerCase().includes(t))
    );
  });

  return (
    <div className="min-h-screen max-w-full bg-background">
      <NavBar setor="Fisioterapeuta" />
      <div className="mx-auto max-w-[95%] space-y-6">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-foreground gap-10px pt-4">
            {student} - {setor}
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

        {/* Aba de pacientes */}
        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="patients" className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
              Pacientes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patients">
            <Card>
              <CardHeader>
                <CardTitle>Em atendimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Buscar por nome, telefone..."
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
        </Tabs>
      </div>
    </div>
  );
}
