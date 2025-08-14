"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FilaDeEspera, replaceEntireWaitingQueueRow } from "@/lib/api"
import { Check } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  changesLog: FilaDeEspera[],
  setChangesLog: React.Dispatch<React.SetStateAction<FilaDeEspera[]>>
}

export function FilaDeEsperaTable<TData, TValue>({
  columns,
  data,
  changesLog,
  setChangesLog
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div>
      {/* FILTROS */}
      <div className="flex items-center gap-4 py-4">
        {/* Filtro por disciplina */}
        <select
          className="border p-2 rounded"
          value={(table.getColumn("disciplina")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("disciplina")?.setFilterValue(e.target.value)
          }
        >
          <option value="">Todas as disciplinas</option>
          <option value="Ortopedia">Ortopedia</option>
          <option value="Cardiologia">Cardiologia</option>
          <option value="Pediatria">Pediatria</option>
        </select>

        {/* Filtro por situação */}
        <select
          className="border p-2 rounded"
          value={(table.getColumn("situacao")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("situacao")?.setFilterValue(e.target.value)
          }
        >
          <option value="">Todas as situações</option>
          <option value="Fila de espera">Fila de espera</option>
          <option value="Em tratamento">Em tratamento</option>
          <option value="Triagem">Triagem</option>
          <option value="Concluído">Concluído</option>
          <option value="Não compareceu">Não compareceu</option>
          <option value="Não conseguimos contato">Não conseguimos contato</option>
        </select>

        {/* BOTAO de salvar modificacoes*/ }
        <Button
        onClick={async () => {
          try {
            await Promise.all(changesLog.map(change => replaceEntireWaitingQueueRow(change)));
            setChangesLog([]); // Limpa o log após salvar
            const originalText = "Salvar modificações";
            const successText =  "✅ Modificcações Salvas";

            // Temporariamente altera o texto do botão para "(Check) ok"
            const button = document.querySelector(".save-button");
            if (button) {
              button.textContent = successText;
              setTimeout(() => {
                button.textContent = originalText;
              }, 2000); // Volta ao texto original após 2 segundos
            }
          } catch (error) {
            alert("Ocorreu um erro ao salvar as modificações. Tente novamente.");
          }
        }}
        disabled={changesLog.length === 0} // Desabilita o botão se não houver alterações
        className="save-button bg-blue-600 text-white hover:bg-blue-700"
      >
        Salvar modificações ({changesLog.length})
      </Button>
      </div>

      {/* TABELA */}
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINAÇÃO */}
      <div className="flex items-center justify-between py-4">
        <div className="flex gap-2">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
        <div>
          Página{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </strong>
        </div>
      </div>
    </div>
  )
}
