"use client"
 
import { ColumnDef } from "@tanstack/react-table"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
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
 
export const columns: ColumnDef<FilaDeEspera>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
  accessorKey: "idade",
  header: () => <div className="text-center">Idade</div>,
  cell: ({ row }) => {
    const idade = row.getValue("idade") as number
    return <div className="text-center font-medium">{idade} anos</div>
    },
  },
  {
    accessorKey: "telefone-1",
    header: "Telefone",
  },
  {
    accessorKey: "telefone-2",
    header: "Telefone",
  },
  {
    accessorKey: "bairro",
    header: "Bairro",
  },
  {
    accessorKey: "diagnostico",
    header: "Diagnóstico",
  },
  {
    accessorKey: "disciplina",
    header: "Disciplina",
  },
  {
    accessorKey: "hospital",
    header: "Hospital",
  },
  {
    accessorKey: "medico(a)",
    header: "Médico(a)",
  },
  {
    accessorKey: "data da procura",
    header: "Data da Procura",
  },
  {
    accessorKey: "situacao",
    header: () => <div className="text-center">Situação</div>,
    cell: ({ row }) => {
      const value = row.getValue("situacao") as string

    const options = [
      "Em espera",
      "Em tratamento",
      "Triagem",
      "Concluído",
      "Não compareceu",
      "Não conseguimos contato"
    ]

    // Define cores personalizadas para cada status
    const colorMap: Record<string, string> = {
      "Em espera": "bg-yellow-100 text-yellow-800",
      "Em tratamento": "bg-blue-100 text-blue-800",
      "Triagem": "bg-purple-100 text-purple-800",
      "Concluído": "bg-green-100 text-green-800",
      "Não compareceu": "bg-red-100 text-red-800",
      "Não conseguimos contato": "bg-gray-200 text-gray-800",
    }

      // Função chamada ao mudar o valor
      const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const novoStatus = e.target.value
        console.log("Status alterado para:", novoStatus)
        // Aqui você poderia chamar uma API ou atualizar o estado global
      }

      return (
        <div className="flex justify-center">
          <select
            defaultValue={value}
            onChange={handleChange}
            className={`border rounded p-1 font-medium ${colorMap[value] || ""}`}
          >
            {options.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      )
    },
  },
]