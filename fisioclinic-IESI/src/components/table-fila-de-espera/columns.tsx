"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, ArrowUpDown } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import * as React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
}  from '@/components/ui/dialog'
import { Input } from "@/components/ui/input"
import { WaitingQueueRowChange, FilaDeEspera, replaceEntireWaitingQueueRow } from "@/lib/api"


export function EditPatientDialog({ patient, setChange }: { patient: FilaDeEspera; setChange: (updatedPatient: FilaDeEspera) => void }) {
  const [editedPatient, setEditedPatient] = React.useState<FilaDeEspera>(patient);

  const handleInputChange = (field: keyof FilaDeEspera, value: string | number) => {
    setEditedPatient((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Paciente</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={editedPatient.nome}
            onChange={(e) => handleInputChange("nome", e.target.value)}
            placeholder="Nome"
          />
          <Input
            type="number"
            value={editedPatient.idade}
            onChange={(e) => handleInputChange("idade", Number(e.target.value))}
            placeholder="Idade"
          />
          <Input
            value={editedPatient["telefone-1"]}
            onChange={(e) => handleInputChange("telefone-1", e.target.value)}
            placeholder="Telefone 1"
          />
          <Input
            value={editedPatient["telefone-2"]}
            onChange={(e) => handleInputChange("telefone-2", e.target.value)}
            placeholder="Telefone 2"
          />
          <Input
            value={editedPatient.bairro}
            onChange={(e) => handleInputChange("bairro", e.target.value)}
            placeholder="Bairro"
          />
          <Input
            value={editedPatient.diagnostico}
            onChange={(e) => handleInputChange("diagnostico", e.target.value)}
            placeholder="Diagnóstico"
          />
          <Input
            value={editedPatient.disciplina}
            onChange={(e) => handleInputChange("disciplina", e.target.value)}
            placeholder="Disciplina"
          />
          <Input
            value={editedPatient.hospital}
            onChange={(e) => handleInputChange("hospital", e.target.value)}
            placeholder="Hospital"
          />
          <Input
            value={editedPatient["medico(a)"]}
            onChange={(e) => handleInputChange("medico(a)", e.target.value)}
            placeholder="Médico(a)"
          />
          <Input
            type="date"
            value={editedPatient["data da procura"]}
            onChange={(e) => handleInputChange("data da procura", e.target.value)}
            placeholder="Data da Procura"
          />
          <Input
            value={editedPatient.situacao}
            onChange={(e) => handleInputChange("situacao", e.target.value)}
            placeholder="Situação"
          />
        </div>
        <DialogFooter>
          <DialogClose>
            <Button
              onClick={async () => {
                try {
                  // Call API to update the entire patient record
                  await replaceEntireWaitingQueueRow(editedPatient);
                  
                  // Update local state via callback
                  setChange(editedPatient);
                  
                  toast({
                    title: "Sucesso",
                    description: "Paciente atualizado com sucesso",
                  });
                } catch (error) {
                  console.error("Erro ao atualizar paciente:", error);
                  toast({
                    title: "Erro",
                    description: "Falha ao atualizar paciente",
                    variant: "destructive",
                  });
                }
              }}
            >
              Salvar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function handleDeleteToast(
  patient: FilaDeEspera,
  setData: React.Dispatch<React.SetStateAction<FilaDeEspera[]>>
) {
  const toastInstance = toast({
    title: "Excluir paciente",
    description: `Deseja excluir ${patient.nome}?`,
    action: (
      <Button
        variant="destructive"
        size="sm"
        onClick={() => {
          setData(prev => prev.filter(p => p.id !== patient.id))
          toastInstance.dismiss()
        }}
      >
        Confirmar
      </Button>
    ),
  })
}

// Função de filtro personalizada para igualdade exata
const equalsFilter = (row: any, columnId: string, filterValue: string) => {
  const value = row.getValue(columnId)
  if (!filterValue) return true
  return value === filterValue
}

export const columns = (
  setData: React.Dispatch<React.SetStateAction<FilaDeEspera[]>>,
  logRowChange: (change: WaitingQueueRowChange) => void
): ColumnDef<FilaDeEspera>[] => [
    { accessorKey: "nome", header: "Nome" },
    {
      accessorKey: "idade",
      header: () => <div className="text-center">Idade</div>,
      cell: ({ row }) => <div className="text-center font-medium">{row.getValue("idade")} anos</div>,
    },
    { accessorKey: "telefone-1", header: "Telefone 1" },
    { accessorKey: "telefone-2", header: "Telefone 2" },
    { accessorKey: "bairro", header: "Bairro" },
    { accessorKey: "diagnostico", header: "Diagnóstico" },
    { accessorKey: "disciplina", header: "Disciplina", filterFn: equalsFilter },
    { accessorKey: "hospital", header: "Hospital" },
    { accessorKey: "medico(a)", header: "Médico(a)" },
    {
      accessorKey: "data da procura",
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className={`text-center transition-colors duration-200
            ${column.getIsSorted() ? "text-black-600" : "text-black-600 hover:text-blue-600"}
            hover:bg-transparent focus:bg-transparent active:bg-transparent text-black-600`}
          >
            Data da Procura
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>

        );
      },
      cell: ({ row }) => {
        const rawDate = row.getValue("data da procura") as string;
        if (!rawDate) return "";
        const date = new Date(rawDate);
        return (
          <div className="text-center">
            {format(date, "dd/MM/yyyy", { locale: ptBR })}
          </div>
        );
      },
      sortingFn: (rowA, rowB, columnId) => {
        const dateA = new Date(rowA.getValue(columnId));
        const dateB = new Date(rowB.getValue(columnId));
        return dateA.getTime() - dateB.getTime();
      },
    },
    {
      accessorKey: "situacao",
      header: () => (
        <div className="text-center font-medium">Situação</div>
      ),
      filterFn: equalsFilter,
      cell: ({ row }) => {
        const value = row.getValue("situacao") as string;
        const options = [
          "Fila de espera",
          "Em tratamento",
          "Triagem",
          "Concluído",
          "Não compareceu",
          "Sem contato"
        ];
        const colorMap: Record<string, string> = {
          "Fila de espera": "bg-yellow-100 text-yellow-800",
          "Em tratamento": "bg-blue-100 text-blue-800",
          "Triagem": "bg-purple-100 text-purple-800",
          "Concluído": "bg-green-100 text-green-800",
          "Não compareceu": "bg-red-100 text-red-800",
          "Sem contato": "bg-gray-200 text-gray-800",
        };

        const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
          const novoStatus = e.target.value;
          setData(prev =>
            prev.map(item =>
              item.id === row.original.id ? { ...item, situacao: novoStatus } : item
            )
          );

          logRowChange({
            id: row.original.id, // Log the row ID
            fieldName: "situacao", // Log the field name
            newValue: novoStatus, // Log the new value
          });

          console.log(`row id is ${row.original.id}`)
        };

        return (
          <div className="flex justify-center">
            <select
              value={value}
              onChange={handleChange}
              className={`rounded-full p-1 font-medium border  text-center ${colorMap[value] || ""}`}
            >
              {options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const patient = row.original;
        return (
          <div className="flex justify-center space-x-2">
            <EditPatientDialog 
              patient={patient} 
              setChange={(updatedPatient) => {
                // Update the data state
                setData(prev =>
                  prev.map(item =>
                    item.id === updatedPatient.id ? updatedPatient : item
                  )
                );
                
                // Log the changes (we need to know what field changed)
                // For simplicity, we'll log the entire update event
                logRowChange({
                  id: updatedPatient.id,
                  fieldName: "multiple_fields", // Indicating multiple fields might have changed
                  newValue: JSON.stringify(updatedPatient)
                });
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
              onClick={() => handleDeleteToast(patient, setData)}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        );
      },
    }
  ]
