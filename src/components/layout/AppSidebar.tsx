import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
    <nav className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center gap-2 overflow-x-auto px-4">
          <Button
            variant={location.pathname === "/dashboard" ? "secondary" : "ghost"}
            className="flex items-center gap-2"
            onClick={() => navigate("/dashboard")}
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Ask Spark Revive</span>
          </Button>
          <Button
            variant={location.pathname === "/date-generator" ? "secondary" : "ghost"}
            className="flex items-center gap-2"
            onClick={() => navigate("/date-generator")}
          >
            <CalendarDays className="h-4 w-4" />
            <span className="hidden sm:inline">Date Generator</span>
          </Button>
          <Button
            variant={location.pathname === "/chemistry-lab" ? "secondary" : "ghost"}
            className="flex items-center gap-2"
            onClick={() => navigate("/chemistry-lab")}
          >
            <FlaskConical className="h-4 w-4" />
            <span className="hidden sm:inline">Chemistry Lab</span>
          </Button>
          <Button
            variant={location.pathname === "/closer-kit" ? "secondary" : "ghost"}
            className="flex items-center gap-2"
            onClick={() => navigate("/closer-kit")}
          >
            <Beaker className="h-4 w-4" />
            <span className="hidden sm:inline">CloserKit</span>
          </Button>
          <Button
            variant={location.pathname === "/conversation-hub" ? "secondary" : "ghost"}
            className="flex items-center gap-2"
            onClick={() => navigate("/conversation-hub")}
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Conversation Hub</span>
          </Button>
          <Button
            variant={location.pathname === "/progress" ? "secondary" : "ghost"}
            className="flex items-center gap-2"
            onClick={() => navigate("/progress")}
          >
            <LineChart className="h-4 w-4" />
            <span className="hidden sm:inline">Progress</span>
          </Button>
          <Button
            variant={location.pathname === "/love-language-quiz" ? "secondary" : "ghost"}
            className="flex items-center gap-2"
            onClick={() => navigate("/love-language-quiz")}
          >
            <Languages className="h-4 w-4" />
            <span className="hidden sm:inline">Love Language Quiz</span>
          </Button>
          <Button
            variant={location.pathname === "/vision-quest" ? "secondary" : "ghost"}
            className="flex items-center gap-2"
            onClick={() => navigate("/vision-quest")}
          >
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Vision Quest</span>
          </Button>
          <Button
            variant={location.pathname === "/valia-quiz" ? "secondary" : "ghost"}
            className="flex items-center gap-2"
            onClick={() => navigate("/valia-quiz")}
          >
            <Scale className="h-4 w-4" />
            <span className="hidden sm:inline">Valia Values Quiz</span>
          </Button>
          <Button
            variant={location.pathname === "/community" ? "secondary" : "ghost"}
            className="flex items-center gap-2"
            onClick={() => navigate("/community")}
          >
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Community</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}