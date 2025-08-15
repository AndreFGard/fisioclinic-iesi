import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NewPatient from "./pages/NewPatient";
import Patient from "./pages/Patient";
import Consultation from "./pages/Consultation";
import ScrollToTop from "./components/ScrollToTop";
import Receptionist from "./pages/Receptionist";
import Physiotherapist from "./pages/Physiotherapist";
import Students from "./pages/Students";
import Appointments from "./components/appointment/Appointments";
import ListaAppointments from "./components/appointment/ListaAppointments";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/receptionist" element={<Receptionist />} />
          <Route path="/new-patient" element={<NewPatient />} />
          <Route path="/patient/:id" element={<Patient />} />
          <Route path="/consultation/:id" element={<Consultation />} />
          <Route path="/agendamento" element={<Appointments />} />
          <Route path="/lista-agendamentos" element={<ListaAppointments />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/physiotherapist"
            element={
              <Physiotherapist
                physiotherapist={"Alex Sandro"}
                setor={"Concepção de Artefatos Digitais"}
              />
            }
          />
          <Route
            path="/students"
            element={
              <Students
                student={"Nivan Roberto Ferreira Junior"}
                setor={"Estudante"}
              />
            }
          />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
