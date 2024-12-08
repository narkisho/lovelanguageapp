import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-spark-lavender via-background to-spark-rose">
        <AppSidebar />
        <main className={`flex-1 p-4 md:p-6 overflow-auto ${isMobile ? 'w-full' : ''}`}>
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}