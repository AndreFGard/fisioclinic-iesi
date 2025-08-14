"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap } from "lucide-react";

export type Students = {
  id: string;
  name: string;
  semester: string;
  specialization: string;
  status: string;
  university: string;
  supervisor: string;
  startDate: string;
  performance: string;
  observations: string;
};

function statusColor(status: string) {
  switch (status.toLowerCase()) {
    case "ativo": return "default";
    case "em observação": return "secondary";
    default: return "outline";
  }
}

function performanceColor(performance: string) {
  switch (performance.toLowerCase()) {
    case "excelente": return "default";
    case "bom": return "secondary";
    case "regular": return "outline";
    default: return "default";
  }
}

export const studentsColumns: ColumnDef<Students>[] = [
  { accessorKey: "name", header: "Nome" },
  { accessorKey: "semester", header: "Semestre" },
  { accessorKey: "university", header: "Universidade" },
  { accessorKey: "specialization", header: "Especialização" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => <Badge variant={statusColor(getValue() as string)}>{getValue() as string}</Badge>
  },
  {
    accessorKey: "performance",
    header: "Performance",
    cell: ({ getValue }) => <Badge variant={performanceColor(getValue() as string)}>{getValue() as string}</Badge>
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          <BookOpen className="h-4 w-4 mr-1" />
          Detalhes
        </Button>
        <Button variant="outline">
          <GraduationCap className="h-4 w-4 mr-1" />
          Relatório
        </Button>
      </div>
    )
  }
];
