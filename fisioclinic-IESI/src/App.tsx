import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ReceptionistDashboard from "./pages/Receptionist";
import NewPatient from "./pages/NewPatient";
import Patient from "./pages/Patient";
import Consultation from "./pages/Consultation";
import ScrollToTop from "./components/ScrollToTop";
import Receptionist from "./pages/Receptionist";
import Physiotherapist from "./pages/Physiotherapist";

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
          <Route path="*" element={<NotFound />} />
          <Route path="/physiotherapist" element={<Physiotherapist physiotherapist={"Alex Sandro"} setor={"Concepção de Artefatos Digitais"} />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
