import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { DatePicker } from "@/components/ui/date-picker";
import AreaSelect from "@/components/AreaSelect";
import DiagnosisSelect from "@/components/DiagnosisSelect";
import {
  User,
  MapPin,
  Stethoscope,
  Phone,
  MapPinIcon,
  Hospital,
  CalendarDays,
  UserCheck,
  Edit,
  Save,
} from "lucide-react";
import { PatientData, SelectOption } from "../types";
import { getStatusBadge, formatDate } from "../utils";

interface PersonalDataTabProps {
  patientData: PatientData;
  isEditing: boolean;
  isLoading: boolean;
  areaOptions: SelectOption[];
  diagnosisOptions: SelectOption[];
  onInputChange: (field: keyof PatientData, value: any) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function PersonalDataTab({
  patientData,
  isEditing,
  isLoading,
  areaOptions,
  diagnosisOptions,
  onInputChange,
  onEdit,
  onSave,
  onCancel,
}: PersonalDataTabProps) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-medical">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Dados Pessoais
            </CardTitle>
            <CardDescription>
              {isEditing
                ? "Edite as informações do paciente"
                : "Informações completas do paciente"}
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  size="sm"
                  onClick={onSave}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Salvar
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                onClick={onEdit}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Editar
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 sm:space-y-8 p-4 sm:p-6">
        {/* SEÇÃO 1: DADOS PESSOAIS */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground">
                Informações Pessoais
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Dados básicos do paciente
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="sm:col-span-2">
              <Label htmlFor="nome" className="text-sm font-medium">
                Nome Completo
              </Label>
              {isEditing ? (
                <Input
                  id="nome"
                  value={patientData.nome}
                  onChange={(e) => onInputChange("nome", e.target.value)}
                  className="h-10 sm:h-11 text-sm"
                />
              ) : (
                <div className="h-10 sm:h-11 px-3 py-2 bg-muted/50 rounded-md flex items-center text-sm">
                  {patientData.nome}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="cpf" className="text-sm font-medium">
                CPF
              </Label>
              {isEditing ? (
                <Input
                  id="cpf"
                  value={patientData.cpf}
                  onChange={(e) => onInputChange("cpf", e.target.value)}
                  placeholder="000.000.000-00"
                  className="h-10 sm:h-11 text-sm"
                />
              ) : (
                <div className="h-10 sm:h-11 px-3 py-2 bg-muted/50 rounded-md flex items-center text-sm">
                  {patientData.cpf || "Não informado"}
                </div>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium">Data de Nascimento</Label>
              {isEditing ? (
                <DatePicker
                  date={patientData.nascimento}
                  setDate={(date) => onInputChange("nascimento", date)}
                  placeholder="Selecione a data de nascimento"
                  fromYear={1920}
                  toYear={new Date().getFullYear()}
                  fromDate={new Date(1920, 0, 1)}
                  toDate={new Date()}
                  closeOnSelect
                  showFooterActions
                />
              ) : (
                <div className="h-11 px-3 py-2 bg-muted/50 rounded-md flex items-center">
                  {patientData.nascimento
                    ? JSON.stringify(patientData.nascimento)
                    : "Não informado"}
                </div>
              )}
            </div>

            <div className="sm:col-span-2">
              <Label className="text-sm font-medium">Gênero</Label>
              {isEditing ? (
                <Select
                  value={patientData.genero}
                  onValueChange={(value) => onInputChange("genero", value)}
                >
                  <SelectTrigger className="h-10 sm:h-11 text-sm">
                    <SelectValue placeholder="Selecione o gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="feminino">Feminino</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                    <SelectItem value="nao-informar">
                      Prefiro não informar
                    </SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="h-11 px-3 py-2 bg-muted/50 rounded-md flex items-center">
                  {patientData.genero || "Não informado"}
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator className="my-6 sm:my-8" />

        {/* SEÇÃO 2: CONTATO E ENDEREÇO */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground">
                Contato e Endereço
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Informações de contato e localização
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <Label htmlFor="tel1">Telefone Principal</Label>
              {isEditing ? (
                <Input
                  id="tel1"
                  value={patientData.tel1}
                  onChange={(e) => onInputChange("tel1", e.target.value)}
                  placeholder="(00) 00000-0000"
                  className="h-11"
                />
              ) : (
                <div className="h-11 px-3 py-2 bg-muted/50 rounded-md flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  {patientData.tel1 || "Não informado"}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="tel2">Telefone Secundário</Label>
              {isEditing ? (
                <Input
                  id="tel2"
                  value={patientData.tel2}
                  onChange={(e) => onInputChange("tel2", e.target.value)}
                  placeholder="(00) 00000-0000"
                  className="h-11"
                />
              ) : (
                <div className="h-11 px-3 py-2 bg-muted/50 rounded-md flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  {patientData.tel2 || "Não informado"}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="bairro">Bairro</Label>
              {isEditing ? (
                <Input
                  id="bairro"
                  value={patientData.bairro}
                  onChange={(e) =>
                    onInputChange("bairro", e.target.value)
                  }
                  placeholder="Bairro"
                  className="h-11"
                />
              ) : (
                <div className="h-11 px-3 py-2 bg-muted/50 rounded-md flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  {patientData.bairro || "Não informado"}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="cidade">Cidade</Label>
              {isEditing ? (
                <Input
                  id="cidade"
                  value={patientData.cidade}
                  onChange={(e) => onInputChange("cidade", e.target.value)}
                  placeholder="Cidade"
                  className="h-11"
                />
              ) : (
                <div className="h-11 px-3 py-2 bg-muted/50 rounded-md flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  {patientData.cidade || "Não informado"}
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator className="my-6 sm:my-8" />

        {/* SEÇÃO 3: DADOS CLÍNICOS */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground">
                Dados Clínicos
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Informações médicas e de tratamento
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <Label htmlFor="diagnostico">Diagnóstico</Label>
              {isEditing ? (
                <DiagnosisSelect
                  value={patientData.diagnostico}
                  onChange={(value) => onInputChange("diagnostico", value)}
                  options={diagnosisOptions}
                  placeholder="Selecione ou digite para adicionar"
                />
              ) : (
                <div className="h-11 px-3 py-2 bg-muted/50 rounded-md flex items-center">
                  {diagnosisOptions.find(
                    (d) => d.value === patientData.diagnostico
                  )?.label ||
                    patientData.diagnostico ||
                    "Não informado"}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="area">Área</Label>
              {isEditing ? (
                <AreaSelect
                  value={patientData.area}
                  onChange={(value) => onInputChange("area", value)}
                  options={areaOptions}
                  placeholder="Selecione ou digite para adicionar"
                />
              ) : (
                <div className="h-11 px-3 py-2 bg-muted/50 rounded-md flex items-center">
                  {areaOptions.find((a) => a.value === patientData.area)
                    ?.label ||
                    patientData.area ||
                    "Não informado"}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="hospital">Hospital</Label>
              {isEditing ? (
                <Input
                  id="hospital"
                  value={patientData.hospital}
                  onChange={(e) => onInputChange("hospital", e.target.value)}
                  placeholder="Nome do hospital"
                  className="h-11"
                />
              ) : (
                <div className="h-11 px-3 py-2 bg-muted/50 rounded-md flex items-center">
                  <Hospital className="h-4 w-4 mr-2 text-muted-foreground" />
                  {patientData.hospital || "Não informado"}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="doutor">Médico</Label>
              {isEditing ? (
                <Input
                  id="doutor"
                  value={patientData.doutor}
                  onChange={(e) => onInputChange("doutor", e.target.value)}
                  placeholder="Nome do médico"
                  className="h-11"
                />
              ) : (
                <div className="h-11 px-3 py-2 bg-muted/50 rounded-md flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  {patientData.doutor || "Não informado"}
                </div>
              )}
            </div>

            <div>
              <Label>Data da Procura</Label>
              {isEditing ? (
                <DatePicker
                  date={patientData.procura}
                  setDate={(date) => onInputChange("procura", date)}
                  placeholder="Selecione a data da procura"
                  fromYear={2020}
                  toYear={new Date().getFullYear() + 1}
                  fromDate={new Date(2020, 0, 1)}
                  toDate={new Date(new Date().getFullYear() + 1, 11, 31)}
                  closeOnSelect
                  showFooterActions
                />
              ) : (
                <div className="h-11 px-3 py-2 bg-muted/50 rounded-md flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                  {patientData.procura
                    ? JSON.stringify(patientData.procura)
                    : "Não informado"}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="situacao">Situação</Label>
              {isEditing ? (
                <Select
                  value={patientData.situacao}
                  onValueChange={(value) => onInputChange("situacao", value)}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Selecione a situação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primeira-consulta">
                      Primeira Consulta
                    </SelectItem>
                    <SelectItem value="em-tratamento">Em Tratamento</SelectItem>
                    <SelectItem value="retorno">Retorno</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="aguardando">Aguardando</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="h-11 px-3 py-2 bg-muted/50 rounded-md flex items-center">
                  {getStatusBadge(patientData.situacao)}
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="obs">Observações</Label>
              {isEditing ? (
                <Textarea
                  id="obs"
                  value={patientData.obs}
                  onChange={(e) =>
                    onInputChange("obs", e.target.value)
                  }
                  placeholder="Observações gerais sobre o paciente ou tratamento"
                  className="min-h-[100px]"
                />
              ) : (
                <div className="min-h-[100px] p-3 bg-muted/50 rounded-md">
                  {patientData.obs || "Nenhuma observação registrada"}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
