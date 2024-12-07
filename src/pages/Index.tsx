import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar, MessageSquare, Beaker, BarChart, Heart, Languages } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const features = [
  {
    title: "Date Generator",
    description: "Get personalized date ideas tailored to your preferences and location. Our AI-powered suggestions ensure every date is unique and memorable.",
    icon: Calendar,
    color: "bg-spark-rose",
  },
  {
    title: "Chemistry Lab",
    description: "Explore interactive scenarios designed to strengthen your bond. Engage in meaningful activities that bring you closer together.",
    icon: Beaker,
    color: "bg-spark-lavender",
  },
  {
    title: "Conversation Hub",
    description: "Discover thoughtful conversation starters and guided dialogue exercises that deepen your connection and understanding.",
    icon: MessageSquare,
    color: "bg-spark-sage",
  },
  {
    title: "Progress Tracking",
    description: "Monitor your relationship growth journey with intuitive metrics and celebrate your milestones together.",
    icon: BarChart,
    color: "bg-spark-rose",
  },
  {
    title: "Love Language Quiz",
    description: "Understand your partner better by discovering your love languages and learning how to express affection in meaningful ways.",
    icon: Languages,
    color: "bg-spark-lavender",
  },
  {
    title: "30-Day Revival Program",
    description: "Embark on a transformative journey with daily personalized missions designed to reignite the spark in your relationship.",
    icon: Heart,
    color: "bg-spark-sage",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showLogin, setShowLogin] = useState(false);

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
          title: "Welcome!",
          description: "Successfully signed in.",
        });
        navigate("/dashboard");
      }
      if (event === "USER_UPDATED") {
        console.log("User updated event received");
      }
      if (event === "SIGNED_OUT") {
        console.log("User signed out");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-spark-lavender via-background to-spark-rose overflow-x-hidden">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold">
            Welcome to <span className="text-gradient">SparkRevive</span>
          </h1>
          <p className="text-spark-text-light text-xl md:text-2xl max-w-3xl mx-auto">
            Rediscover the magic in your relationship with personalized experiences,
            meaningful conversations, and thoughtful activities.
          </p>
          <Button 
            size="lg" 
            className="animate-float text-lg px-8 py-6"
            onClick={() => setShowLogin(true)}
          >
            Get Started
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gradient">
          Everything You Need to Strengthen Your Bond
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="glass-card hover-card p-6 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`${feature.color} p-3 rounded-lg`}>
                  <feature.icon className="w-6 h-6 text-spark-text animate-float" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-spark-text">
                    {feature.title}
                  </h3>
                  <p className="text-spark-text-light">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Login Dialog */}
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
              onError={(error) => {
                console.error("Auth error:", error);
                toast({
                  title: "Authentication Error",
                  description: error.message,
                  variant: "destructive",
                });
              }}
            />
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;