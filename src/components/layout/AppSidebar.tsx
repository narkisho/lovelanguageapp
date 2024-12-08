import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SidebarContent } from "@/components/ui/sidebar";
import {
  Heart,
  CalendarDays,
  FlaskConical,
  MessageCircle,
  LineChart,
  Languages,
  Sparkles,
  Target,
  Scale,
  Beaker,
  Users,
} from "lucide-react";

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="pb-12">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Features
          </h2>
          <div className="space-y-1">
            <Button
              variant={location.pathname === "/dashboard" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => navigate("/dashboard")}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Ask Spark Revive
            </Button>
            <SidebarContent>
              <Button
                variant={location.pathname === "/date-generator" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => navigate("/date-generator")}
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                Date Generator
              </Button>
              <Button
                variant={location.pathname === "/chemistry-lab" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => navigate("/chemistry-lab")}
              >
                <FlaskConical className="mr-2 h-4 w-4" />
                Chemistry Lab
              </Button>
              <Button
                variant={location.pathname === "/closer-kit" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => navigate("/closer-kit")}
              >
                <Beaker className="mr-2 h-4 w-4" />
                CloserKit
              </Button>
              <Button
                variant={location.pathname === "/conversation-hub" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => navigate("/conversation-hub")}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Conversation Hub
              </Button>
              <Button
                variant={location.pathname === "/progress" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => navigate("/progress")}
              >
                <LineChart className="mr-2 h-4 w-4" />
                Progress
              </Button>
              <Button
                variant={location.pathname === "/love-language-quiz" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => navigate("/love-language-quiz")}
              >
                <Languages className="mr-2 h-4 w-4" />
                Love Language Quiz
              </Button>
              <Button
                variant={location.pathname === "/vision-quest" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => navigate("/vision-quest")}
              >
                <Target className="mr-2 h-4 w-4" />
                Vision Quest
              </Button>
              <Button
                variant={location.pathname === "/valia-quiz" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => navigate("/valia-quiz")}
              >
                <Scale className="mr-2 h-4 w-4" />
                Valia Values Quiz
              </Button>
              <Button
                variant={location.pathname === "/community" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => navigate("/community")}
              >
                <Users className="mr-2 h-4 w-4" />
                Community
              </Button>
            </SidebarContent>
          </div>
        </div>
      </div>
    </div>
  );
}