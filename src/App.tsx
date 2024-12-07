import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import DateGenerator from "./pages/DateGenerator";
import ChemistryLab from "./pages/ChemistryLab";
import ConversationHub from "./pages/ConversationHub";
import Progress from "./pages/Progress";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import LoveLanguageQuiz from "./pages/LoveLanguageQuiz";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/date-generator" element={<DateGenerator />} />
          <Route path="/chemistry-lab" element={<ChemistryLab />} />
          <Route path="/conversation-hub" element={<ConversationHub />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/love-language-quiz" element={<LoveLanguageQuiz />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;