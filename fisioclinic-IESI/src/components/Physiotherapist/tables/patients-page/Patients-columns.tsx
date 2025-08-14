"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Stethoscope, ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DetalhesButton({ pacienteId }: { pacienteId: string }) {
  const navigate = useNavigate();

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => navigate(`/patient/${pacienteId}`)}
    >
      <Stethoscope className="h-4 w-4 mr-1" />
      Detalhes
    </Button>
  );
}

export type Pacients = {
  id: string;
  nome: string;
  idade: number;
  "telefone-1": string;
  "telefone-2": string;
  diagnostico: string;
  disciplina: string;
  hospital: string;
  "medico(a)": string;
  situacao: string;
  prioridade: string;
};
// Add this type definition or import it from its module if it exists elsewhere
type FilaDeEspera = {
  id: string;
  situacao: string;
  // add other fields as needed
};

export function patientsColumns(
  onPriorityChange?: (id: string, newPriority: string) => void,
  setData?: React.Dispatch<React.SetStateAction<FilaDeEspera[]>>
) {
  const columns: ColumnDef<Pacients>[] = [
    { accessorKey: "nome", header: "Paciente" },
    { accessorKey: "idade", header: "Idade", cell: ({ getValue }) => `${getValue()} anos` },
    { accessorKey: "telefone-1", header: "Telefone 1" },
    { accessorKey: "telefone-2", header: "Telefone 2" },
    { accessorKey: "diagnostico", header: "Diagnóstico" },
    { accessorKey: "disciplina", header: "Disciplina" },
    { accessorKey: "hospital", header: "Hospital" },
    { accessorKey: "medico(a)", header: "Médico(a)" },
    {
      accessorKey: "Prioridade",
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className={`text-center transition-colors duration-200
          ${column.getIsSorted()
            ? "text-blue-700 font-semibold"
            : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
          } rounded-md px-2 py-1 flex items-center justify-start gap-1`}
          >
            Prioridade
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
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
              onChange={(e) => onPriorityChange?.(row.original.id, e.target.value)}
              className={`rounded-full p-1 font-medium border text-center ${
                colorMap[value]
              }`}
            >
              {options.map((opt) => (
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
      accessorKey: "situacao",
      header: () => (
        <div className="text-center font-medium">Situação</div>
      ),
      filterFn: (row, columnId, filterValue) => {
        return row.getValue(columnId) === filterValue;
      },
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
      cell: ({ row }) => <DetalhesButton pacienteId={row.original.id} />
    }
  ];

  return { columns };
}
