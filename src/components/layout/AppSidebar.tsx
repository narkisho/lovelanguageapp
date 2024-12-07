import { 
  Home,
  Sparkles,
  GamepadIcon,
  HeartHandshake,
  Trophy,
  Heart,
  Languages,
  Target
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", icon: Home, url: "/dashboard" },
  { title: "Date Generator", icon: Sparkles, url: "/date-generator" },
  { title: "Chemistry Lab", icon: GamepadIcon, url: "/chemistry-lab" },
  { title: "Conversation Hub", icon: HeartHandshake, url: "/conversation-hub" },
  { title: "Progress", icon: Trophy, url: "/progress" },
  { title: "Love Language Quiz", icon: Languages, url: "/love-language-quiz" },
  { title: "VisionQuest", icon: Target, url: "/vision-quest" },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center gap-2 px-2">
            <Heart className="w-6 h-6 text-primary animate-float" />
            <span className="text-xl font-semibold text-gradient">SparkRevive</span>
          </div>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.url} 
                      className="flex items-center gap-3 group"
                      data-active={location.pathname === item.url}
                    >
                      <item.icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}