import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const signOut = async () => {
    try {
      console.log("Starting sign out process");
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Sign out error:", error);
        throw error;
      }

      console.log("Successfully signed out");
      toast({
        title: "Signed out successfully",
        description: "You have been logged out.",
      });

      // Navigate after successful signout
      navigate("/");
    } catch (error) {
      console.error("Error during sign out:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return { signOut };
};