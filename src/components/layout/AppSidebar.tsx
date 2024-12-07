import { Heart, Calendar, MessageSquare, Beaker, BarChart, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", icon: Home, url: "/dashboard" },
  { title: "Date Generator", icon: Calendar, url: "/date-generator" },
  { title: "Chemistry Lab", icon: Beaker, url: "/chemistry-lab" },
  { title: "Conversation Hub", icon: MessageSquare, url: "/conversation-hub" },
  { title: "Progress", icon: BarChart, url: "/progress" },
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
                      className="flex items-center gap-3"
                      data-active={location.pathname === item.url}
                    >
                      <item.icon className="w-5 h-5" />
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