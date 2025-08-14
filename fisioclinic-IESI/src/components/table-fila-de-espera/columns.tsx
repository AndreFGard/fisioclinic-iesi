"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, ArrowUpDown } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export type FilaDeEspera = {
  id: string
  nome: string
  idade: number
  "telefone-1": string
  "telefone-2": string
  bairro: string
  diagnostico: string
  disciplina: string
  hospital: string
  "medico(a)": string
  "data da procura": string
  situacao: string
}

export type WaitingQueueRowChange = {
  id: string
  fieldName: string
  newValue: any
}

function handleEdit(patient: FilaDeEspera) {
  console.log("Editar paciente:", patient);
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
            <Button variant="ghost" size="icon"
              className="h-9 w-9 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
              onClick={() => handleEdit(patient)}>
              <Edit className="h-4 w-4" />
            </Button>
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
