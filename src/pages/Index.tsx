import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showLogin, setShowLogin] = useState(false);
  const [achievementUnlocked, setAchievementUnlocked] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      console.log("Session check:", session, error);
      if (session) {
        navigate("/dashboard");
      }
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state change:", event, session);
      if (event === "SIGNED_IN" && session) {
        toast({
          title: "Achievement Unlocked! 🏆",
          description: "Welcome to SparkRevive! Your journey begins now.",
        });
        setAchievementUnlocked(true);
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-spark-lavender via-background to-spark-rose overflow-x-hidden">
      <Hero 
        onGetStarted={() => setShowLogin(true)}
        achievementUnlocked={achievementUnlocked}
      />
      
      <Features onFeatureClick={() => setShowLogin(true)} />
      
      <Footer />

      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent className="sm:max-w-md">
          <Card className="glass-card p-6">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: 'rgb(139, 92, 246)',
                      brandAccent: 'rgb(126, 105, 171)',
                    },
                  },
                },
                className: {
                  container: 'auth-container',
                  button: 'auth-button',
                  input: 'auth-input',
                },
              }}
              providers={[]}
              view="sign_in"
              showLinks={true}
              theme="light"
            />
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;