import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Calendar, MessageSquare, Beaker, BarChart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const features = [
  {
    title: "Date Generator",
    description: "Get personalized date ideas based on your preferences",
    icon: Calendar,
    color: "bg-spark-rose",
  },
  {
    title: "Chemistry Lab",
    description: "Interactive scenarios to strengthen your bond",
    icon: Beaker,
    color: "bg-spark-lavender",
  },
  {
    title: "Conversation Hub",
    description: "Meaningful topics to deepen your connection",
    icon: MessageSquare,
    color: "bg-spark-sage",
  },
  {
    title: "Progress Tracking",
    description: "Monitor your relationship growth journey",
    icon: BarChart,
    color: "bg-spark-rose",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      if (event === "SIGNED_IN" && session) {
        toast({
          title: "Welcome!",
          description: "Successfully signed in.",
        });
        navigate("/dashboard");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-spark-lavender via-background to-spark-rose">
      <div className="container mx-auto px-4 py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold animate-fade-in">
                Welcome to <span className="text-gradient">SparkRevive</span>
              </h1>
              <p className="text-spark-text-light text-lg lg:text-xl max-w-2xl animate-fade-in">
                Rediscover the magic in your relationship with personalized experiences,
                meaningful conversations, and thoughtful activities.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card 
                  key={feature.title} 
                  className="glass-card hover-card p-4 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`${feature.color} p-2 rounded-lg`}>
                      <feature.icon className="w-5 h-5 text-spark-text animate-float" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-spark-text">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-spark-text-light">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:ml-auto w-full max-w-md">
            <Card className="glass-card p-6 animate-fade-in shadow-2xl">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;