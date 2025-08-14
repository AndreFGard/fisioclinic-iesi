import { toast } from "@/components/ui/use-toast"

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
import {  FilaDeEspera, replaceEntireWaitingQueueRow } from "@/lib/api"
import { Button } from "../ui/button";
import {Edit} from "lucide-react"

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
            value={editedPatient["tel1"]}
            onChange={(e) => handleInputChange("tel1", e.target.value)}
            placeholder="Telefone 1"
          />
          <Input
            value={editedPatient["tel2"]}
            onChange={(e) => handleInputChange("tel2", e.target.value)}
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
            value={editedPatient["doutor"]}
            onChange={(e) => handleInputChange("doutor", e.target.value)}
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

export function handleDeleteToast(
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