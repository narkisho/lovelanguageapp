import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar, MessageSquare, Beaker, BarChart, Heart, Languages, Target, Scale, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const features = [
  {
    title: "Date Generator",
    description: "Get AI-powered date ideas perfectly matched to your preferences",
    icon: Calendar,
    color: "bg-spark-rose",
    animation: "hover:rotate-12",
  },
  {
    title: "Chemistry Lab",
    description: "Explore interactive scenarios to strengthen your bond",
    icon: Beaker,
    color: "bg-spark-lavender",
    animation: "hover:-rotate-12",
  },
  {
    title: "Conversation Hub",
    description: "Discover thoughtful topics that spark meaningful discussions",
    icon: MessageSquare,
    color: "bg-spark-sage",
    animation: "hover:scale-110",
  },
  {
    title: "Progress Tracking",
    description: "Monitor your relationship growth with intuitive metrics",
    icon: BarChart,
    color: "bg-spark-rose",
    animation: "hover:translate-y-[-8px]",
  },
  {
    title: "Love Language Quiz",
    description: "Understand how you and your partner express affection",
    icon: Languages,
    color: "bg-spark-lavender",
    animation: "hover:rotate-12",
  },
  {
    title: "Vision Quest",
    description: "Create and share your relationship goals and dreams",
    icon: Target,
    color: "bg-spark-sage",
    animation: "hover:-rotate-12",
  },
  {
    title: "Valia Values Quiz",
    description: "Discover and align your core relationship values",
    icon: Scale,
    color: "bg-spark-rose",
    animation: "hover:scale-110",
  },
  {
    title: "Ask Spark Revive",
    description: "Get personalized advice from our AI relationship expert",
    icon: Sparkles,
    color: "bg-spark-lavender",
    animation: "hover:translate-y-[-8px]",
  },
];

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
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Welcome to <span className="text-gradient">SparkRevive</span>
            </h1>
            {achievementUnlocked && (
              <div className="absolute -top-8 right-0 transform rotate-12 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold animate-bounce">
                +100 XP
              </div>
            )}
          </div>
          <p className="text-spark-text-light text-xl md:text-2xl max-w-3xl mx-auto">
            Level up your relationship with personalized experiences, meaningful conversations,
            and thoughtful activities. Start your journey today!
          </p>
          <Button 
            size="lg" 
            className="animate-float text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => setShowLogin(true)}
          >
            Begin Your Adventure
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gradient">
          Unlock New Relationship Powers
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className={`glass-card hover-card p-6 animate-fade-in cursor-pointer transform transition-all duration-300 ${feature.animation}`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => !showLogin && setShowLogin(true)}
            >
              <div className="flex items-start gap-4">
                <div className={`${feature.color} p-3 rounded-lg`}>
                  <feature.icon className="w-6 h-6 text-spark-text" />
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

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-spark-text-light">
        <p className="animate-fade-in">
          Created with ❤️ by <span className="font-semibold">@Narkisho Nyonje</span>
        </p>
      </footer>

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
            />
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;