import LoginForm from "@/components/LoginForm";
import medicalBg from "@/assets/medical-bg.jpg";

const Index = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-background relative"
      style={{
        backgroundImage: `url(${medicalBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay para melhor legibilidade */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px]" />
      
      {/* Conteúdo principal */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <LoginForm />
      </div>
      
      {/* Footer com informações da clínica */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm text-muted-foreground">
          © 2024 FisioClínica - Sistema de Gestão
        </p>
      </div>
    </div>
  );
};

export default Index;
