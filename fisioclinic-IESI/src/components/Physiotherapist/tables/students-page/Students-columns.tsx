"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export type Students = {
  id: string;
  nome: string;
  semestre: number;
};

export const studentsColumns: ColumnDef<Students>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
        className={`text-left transition-all duration-300 
          ${column.getIsSorted()
            ? "text-blue-700 font-semibold"
            : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
          } rounded-md px-2 py-1 flex items-center justify-start gap-1`}
      >
        Nome
        <ArrowUpDown
          className={`h-4 w-4 transition-transform duration-300 ${column.getIsSorted() ? "rotate-180" : ""
            }`}
        />
      </Button>
    ),
    cell: ({ row }) => {
      const nome = row.getValue("nome") as string;
      return <div className="text-left">{nome}</div>;
    },
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      const a = rowA.getValue(columnId) as string;
      const b = rowB.getValue(columnId) as string;
      return a.localeCompare(b);
    }
  },
  {
    accessorKey: "semestre",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
        className={`relative w-full text-center transition-all duration-300 
      ${column.getIsSorted()
            ? "text-blue-700 font-semibold"
            : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
          } rounded-md px-2 py-1 flex items-center justify-center gap-1`}
      >
        <span className="flex-1 text-center">Semestre</span>
        <ArrowUpDown
          className={`h-4 w-4 transition-transform duration-300 ${column.getIsSorted() ? "rotate-180" : ""
            }`}
        />
      </Button>
    ),
    cell: ({ row }) => {
      const semestre = row.getValue("semestre") as number;
      return <div className="text-center">{semestre}</div>;
    },
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      const a = rowA.getValue(columnId) as number;
      const b = rowB.getValue(columnId) as number;
      return a - b;
    }
  }
];
