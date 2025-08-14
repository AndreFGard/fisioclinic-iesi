"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, ArrowUpDown } from "lucide-react"
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import * as React from "react";
import { FilaDeEspera, replaceEntireWaitingQueueRow } from "@/lib/api"
import { EditPatientDialog, handleDeleteToast } from "../table-fila-de-espera/edit-fila-de-espera";

function handleEdit(patient: FilaDeEspera) {
  console.log("Editar paciente:", patient);
}

// Função de filtro personalizada para igualdade exata
const equalsFilter = (row: any, columnId: string, filterValue: string) => {
  const value = row.getValue(columnId)
  if (!filterValue) return true
  return value === filterValue
}

export const columns = (
  setData: React.Dispatch<React.SetStateAction<FilaDeEspera[]>>,
  sendRowChange: (change: FilaDeEspera) => void,
  onPriorityChange?: (id: string, newPriority: string) => void
): ColumnDef<FilaDeEspera>[] => [
  { accessorKey: "nome", header: "Nome" },
  {
    accessorKey: "idade",
    header: () => <div className="text-center">Idade</div>,
    cell: ({ row }) => <div className="text-center font-medium">{row.getValue("idade")} anos</div>,
  },
  { accessorKey: "tel1", header: "Telefone 1" },
  { accessorKey: "tel2", header: "Telefone 2" },
  { accessorKey: "bairro", header: "Bairro" },
  { accessorKey: "diagnostico", header: "Diagnóstico" },
  { accessorKey: "disciplina", header: "Disciplina", filterFn: equalsFilter },
  { accessorKey: "hospital", header: "Hospital" },
  { accessorKey: "doutor", header: "Médico(a)" },
  {
    accessorKey: "procura",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={`text-center transition-colors duration-200 ${
            column.getIsSorted()
              ? "text-blue-700 font-semibold"
              : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
          } rounded-md px-2 py-1 flex items-center justify-start gap-1`}
        >
          Data da Procura
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rawDate = row.getValue("procura") as string;
      if (!rawDate) return`${(row.getValue('procura'))}`;
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
    header: () => <div className="text-center font-medium">Situação</div>,
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

      if (!value) return <div className="text-center">Carregando...</div>;

      const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const novoStatus = e.target.value;
        setData(prev =>
          prev.map(item =>
            item.id === row.original.id ? { ...item, situacao: novoStatus } : item
          )
        );
        row.original.situacao = novoStatus; // Atualiza o valor na linha original
        sendRowChange(row.original);
      };

      return (
        <div className="flex justify-center">
          <select
            value={value}
            onChange={handleChange}
            className={`rounded-full p-1 font-medium border text-center ${colorMap[value] || ""}`}
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
    accessorKey: "prioridade",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className={`text-center transition-colors duration-200 ${
          column.getIsSorted()
            ? "text-blue-700 font-semibold"
            : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
        } rounded-md px-2 py-1 flex items-center justify-start gap-1`}
      >
        Prioridade
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.original.prioridade;
      const options = ["alta", "média", "baixa"];
      const colorMap: Record<string, string> = {
        alta: "bg-red-100 text-red-800",
        média: "bg-yellow-100 text-yellow-800",
        baixa: "bg-green-100 text-green-800",
      };

      if (!value) return <div className="text-center">Carregando...</div>;

      return (
        <div className="flex justify-center">
          <select
            value={value}
            onChange={(e) => {
              const newPriority = e.target.value;
              onPriorityChange?.(row.original.id, newPriority);
              
              // Also update local state
              setData(prev =>
                prev.map(item =>
                  item.id === row.original.id ? { ...item, prioridade: newPriority } : item
                )
              );
              
              row.original.prioridade = newPriority;
              sendRowChange(row.original);
            }}
            className={`rounded-full p-1 font-medium border text-center ${colorMap[value]}`}
          >
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const priorityOrder: Record<string, number> = { alta: 3, média: 2, baixa: 1 };
      const a = priorityOrder[rowA.original.prioridade] ?? 0;
      const b = priorityOrder[rowB.original.prioridade] ?? 0;
      return b - a;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Ações</div>,
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <div className="flex justify-center space-x-2">
          <EditPatientDialog 
            patient={patient} 
            setChange={sendRowChange}
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

