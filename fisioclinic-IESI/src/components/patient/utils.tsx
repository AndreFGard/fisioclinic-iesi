import { Badge } from "@/components/ui/badge";
import { FileText, ClipboardList, UserCheck } from "lucide-react";

export const getStatusBadge = (status: string) => {
  const statusConfig = {
    "primeira-consulta": {
      label: "Primeira Consulta",
      variant: "default" as const,
      className:
        "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100",
    },
    "em-tratamento": {
      label: "Em Tratamento",
      variant: "secondary" as const,
      className:
        "bg-green-100 text-green-800 border-green-200 hover:bg-green-200 dark:bg-green-900 dark:text-green-100",
    },
    retorno: {
      label: "Retorno",
      variant: "outline" as const,
      className:
        "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-100",
    },
    alta: {
      label: "Alta",
      variant: "default" as const,
      className:
        "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-100",
    },
    aguardando: {
      label: "Aguardando",
      variant: "secondary" as const,
      className:
        "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100",
    },
    cancelado: {
      label: "Cancelado",
      variant: "destructive" as const,
      className:
        "bg-red-100 text-red-800 border-red-200 hover:bg-red-200 dark:bg-red-900 dark:text-red-100",
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig];
  return config ? (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  ) : (
    <Badge
      variant="outline"
      className="bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100"
    >
      {status}
    </Badge>
  );
};

export const getDocumentTypeIcon = (type: string) => {
  switch (type) {
    case "atestado":
      return <FileText className="h-4 w-4" />;
    case "declaracao":
      return <ClipboardList className="h-4 w-4" />;
    case "receita":
      return <FileText className="h-4 w-4" />;
    case "exame":
      return <FileText className="h-4 w-4" />;
    case "relatorio":
      return <FileText className="h-4 w-4" />;
    case "ficha-atendimento":
      return <UserCheck className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

export const getDocumentTypeName = (type: string) => {
  const types = {
    atestado: "Atestado",
    declaracao: "Declaração",
    receita: "Receita",
    exame: "Exame",
    relatorio: "Relatório",
    "ficha-atendimento": "Ficha de Atendimento",
  };
  return types[type as keyof typeof types] || type;
};

export const getDocumentTypeBadge = (type: string) => {
  const typeConfig = {
    atestado: {
      name: "Atestado",
      className:
        "bg-red-100 text-red-800 border-red-200 hover:bg-red-200 dark:bg-red-900 dark:text-red-100",
    },
    declaracao: {
      name: "Declaração",
      className:
        "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100",
    },
    receita: {
      name: "Receita",
      className:
        "bg-green-100 text-green-800 border-green-200 hover:bg-green-200 dark:bg-green-900 dark:text-green-100",
    },
    exame: {
      name: "Exame",
      className:
        "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-100",
    },
    relatorio: {
      name: "Relatório",
      className:
        "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-100",
    },
    "ficha-atendimento": {
      name: "Ficha de Atendimento",
      className:
        "bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-100",
    },
  };

  const config = typeConfig[type as keyof typeof typeConfig];
  return config ? (
    <Badge variant="outline" className={config.className}>
      {config.name}
    </Badge>
  ) : (
    <Badge
      variant="outline"
      className="bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100"
    >
      {getDocumentTypeName(type)}
    </Badge>
  );
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("pt-BR");
};

export const calculateAge = (birthDate: Date | undefined) => {
  if (!birthDate) return "N/A";
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    return age - 1;
  }
  return age;
};
