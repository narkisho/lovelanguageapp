import { 
  Home,
  Sparkles,
  GamepadIcon,
  HeartHandshake,
  Trophy,
  Heart
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
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
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="w-full h-auto border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarContent>
        <div className="container flex h-16 items-center px-4">
          <div className="flex items-center gap-2 mr-8">
            <Heart className="w-6 h-6 text-primary animate-float" />
            <span className="text-xl font-semibold text-gradient">SparkRevive</span>
          </div>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-row items-center gap-6">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link 
                        to={item.url} 
                        className="flex items-center gap-2 group"
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
        </div>
      </SidebarContent>
    </Sidebar>
  );
}