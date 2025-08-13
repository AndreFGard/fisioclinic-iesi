import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import NavBar from "@/components/NavBar";
import { 
  UserPlus, 
  Users, 
  UserCog, 
  Clock, 
  Search,
  Bell,
  LogOut,
  Calendar,
  Phone,
  Mail
} from "lucide-react";

const ReceptionistDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  return (
    <div className="min-h-screen bg-background">
        <NavBar setor="Recepção" />

    </div>
  );
};

export default ReceptionistDashboard;
