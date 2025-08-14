import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClipboardList, Download, Eye } from "lucide-react";
import { MedicalRecord } from "../types";
import {
  getDocumentTypeIcon,
  getDocumentTypeBadge,
  formatDate,
} from "../utils";

interface MedicalRecordsTabProps {
  medicalRecords: MedicalRecord[];
}

export default function MedicalRecordsTab({
  medicalRecords,
}: MedicalRecordsTabProps) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-medical">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <ClipboardList className="h-4 w-4 sm:h-5 sm:w-5" />
          Prontuário do Paciente
        </CardTitle>
        <CardDescription className="text-sm">
          Documentos, fichas de atendimento e declarações
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 sm:p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs sm:text-sm">Documento</TableHead>
                <TableHead className="text-xs sm:text-sm">Tipo</TableHead>
                <TableHead className="text-xs sm:text-sm hidden sm:table-cell">
                  Data
                </TableHead>
                <TableHead className="text-xs sm:text-sm hidden md:table-cell">
                  Profissional
                </TableHead>
                <TableHead className="text-xs sm:text-sm">Status</TableHead>
                <TableHead className="text-xs sm:text-sm">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicalRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="p-2 sm:p-4">
                    <div className="flex items-center gap-2">
                      {getDocumentTypeIcon(record.type)}
                      <span className="font-medium text-xs sm:text-sm truncate max-w-[150px] sm:max-w-none">
                        {record.title}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="p-2 sm:p-4">
                    {getDocumentTypeBadge(record.type)}
                  </TableCell>
                  <TableCell className="p-2 sm:p-4 hidden sm:table-cell text-xs sm:text-sm">
                    {formatDate(record.date)}
                  </TableCell>
                  <TableCell className="p-2 sm:p-4 hidden md:table-cell text-xs sm:text-sm">
                    {record.professional}
                  </TableCell>
                  <TableCell className="p-2 sm:p-4">
                    <Badge
                      variant={
                        record.status === "ativo" ? "default" : "secondary"
                      }
                      className={
                        record.status === "ativo"
                          ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-200 dark:bg-green-900 dark:text-green-100"
                          : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100"
                      }
                    >
                      {record.status === "ativo" ? "Ativo" : "Arquivado"}
                    </Badge>
                  </TableCell>
                  <TableCell className="p-2 sm:p-4">
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="sr-only">Visualizar</span>
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
