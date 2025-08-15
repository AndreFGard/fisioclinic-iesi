import { useState } from "react";
import { Link } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";
import { Stethoscope, GraduationCap, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

type UserType = "fisioterapeuta" | "aluno" | "recepcionista";

interface UserTypeOption {
  type: UserType;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const userTypes: UserTypeOption[] = [
  {
    type: "fisioterapeuta",
    label: "Fisioterapeuta",
    icon: <Stethoscope className="h-5 w-5" />,
    description: "Acesso completo ao sistema",
  },
  {
    type: "aluno",
    label: "Aluno",
    icon: <GraduationCap className="h-5 w-5" />,
    description: "Acompanhamento de pacientes",
  },
  {
    type: "recepcionista",
    label: "Recepcionista",
    icon: <UserCheck className="h-5 w-5" />,
    description: "Agendamentos e cadastros",
  },
];

export default function LoginForm() {
  const navigate = useNavigate();
  const [selectedUserType, setSelectedUserType] =
    useState<UserType>("fisioterapeuta");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { userType: selectedUserType, email });

    // Redirecionamento de acordo com o tipo de usuário
    const routeMap: Record<UserType, string> = {
      fisioterapeuta: "/physiotherapist",
      aluno: "/students",
      recepcionista: "/receptionist",
    };

    navigate(routeMap[selectedUserType]);
  };


  return (
    <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-0 shadow-medical">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-medical rounded-full flex items-center justify-center">
          <Stethoscope className="h-8 w-8 text-white" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Sistema Clinica Escola de Fisioterapia
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Faça login para acessar o sistema
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Seletor de tipo de usuário */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">
            Tipo de acesso
          </Label>
          <div className="grid grid-cols-1 gap-2">
            {userTypes.map((userType) => (
              <button
                key={userType.type}
                type="button"
                onClick={() => setSelectedUserType(userType.type)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                  selectedUserType === userType.type
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-md ${
                      selectedUserType === userType.type
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {userType.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        {userType.label}
                      </span>
                      {selectedUserType === userType.type && (
                        <Badge variant="default" className="text-xs">
                          Selecionado
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {userType.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Formulário de login */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email ou usuário
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 border-border focus:border-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 border-border focus:border-primary"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            Entrar no Sistema
          </Button>
        </form>

        <div className="text-center">
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">
            Esqueceu sua senha?
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
