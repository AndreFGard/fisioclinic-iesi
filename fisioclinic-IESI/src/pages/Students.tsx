"use client";

import { useState, useEffect } from "react";
import { Bell, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { PatientsTable } from "@/components/Physiotherapist/tables/patients-page/PatientsTable";
import {patientsColumns } from "@/components/Physiotherapist/tables/patients-page/Patients-columns";

import NavBar from "@/components/NavBar";
import { FilaDeEspera, getWaitingQueueData } from "@/lib/api";

// Tipos
interface StudentProps {
  student: string;
  setor: string;
}


// Dados mockados


// Componente principal
export default function Sudents({ student, setor }: StudentProps) {
  const [patientsInTreatment, setPatientsInTreatment] = useState<FilaDeEspera[]>([]);
  const [searchTermPatients, setSearchTermPatients] = useState("");

  useEffect(() => {
    // Filtra apenas pacientes que não estão na fila de espera
    getWaitingQueueData().then(data => {
      const pacientes = data.filter(p => p.situacao !== "Fila de espera");
      setPatientsInTreatment(pacientes);
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
      (patient["tel1"] && patient["tel1"].toLowerCase().includes(t)) ||
      (patient["tel2"] && patient["tel2"].toLowerCase().includes(t))
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
