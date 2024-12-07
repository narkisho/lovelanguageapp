import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LogOut, Send, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Current session:", session);
      if (!session) {
        navigate("/");
      } else {
        // Fetch previous conversations
        const { data, error } = await supabase
          .from('ai_conversations')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching conversations:', error);
          toast({
            title: "Error",
            description: "Failed to load previous conversations",
            variant: "destructive",
          });
        } else {
          setConversations(data || []);
        }
      }
    };
    
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed in dashboard:", event, session);
      if (event === "SIGNED_OUT" || !session) {
        navigate("/");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handleSignOut = async () => {
    try {
      // First check if we have a valid session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // If no session exists, just redirect to home
        navigate("/");
        return;
      }

      // Attempt to sign out
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Error signing out:", error);
        // If we get a session_not_found error, just redirect to home
        if (error.message.includes("session_not_found")) {
          navigate("/");
          return;
        }
        // For other errors, show the error message
        toast({
          title: "Error",
          description: "Failed to sign out. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signed out",
          description: "You have been successfully signed out.",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error in sign out process:", error);
      // If any unexpected error occurs, redirect to home
      navigate("/");
    }
  };

  const formatAnswer = (answer: string) => {
    // Check if the answer contains numbers followed by periods (like "1.", "2.")
    if (/\d+\./.test(answer)) {
      // Split by newlines and wrap each point in a div
      return answer.split('\n').map((line, index) => (
        <div key={index} className="py-1">{line}</div>
      ));
    }
    
    // If no numbered points, check for bullet points or dashes
    if (answer.includes('•') || answer.includes('-')) {
      return answer.split('\n').map((line, index) => (
        <div key={index} className="py-1 pl-4">{line}</div>
      ));
    }
    
    // If no special formatting needed, add paragraph spacing
    return answer.split('\n').map((paragraph, index) => (
      <p key={index} className="py-2">{paragraph}</p>
    ));
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      toast({
        title: "Error",
        description: "Please enter a question",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) throw new Error('No user session');

      const { data, error } = await supabase.functions.invoke('ask-spark-revive', {
        body: { question, userId: session.user.id },
      });

      if (error) throw error;

      // Refresh conversations
      const { data: newConversations, error: fetchError } = await supabase
        .from('ai_conversations')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      
      setConversations(newConversations || []);
      setQuestion("");
      
      toast({
        title: "Success",
        description: "Your question has been answered!",
      });
    } catch (error) {
      console.error("Error asking question:", error);
      toast({
        title: "Error",
        description: "Failed to get an answer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gradient">Welcome to Your Dashboard</h1>
            <p className="text-spark-text-light text-lg max-w-2xl">
              Start exploring SparkRevive's features to enhance your relationship.
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleSignOut}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Ask Spark Revive</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Textarea
                placeholder="Ask any relationship question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleAskQuestion}
                disabled={isLoading}
                className="self-start"
              >
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing</>
                ) : (
                  <><Send className="mr-2 h-4 w-4" /> Ask</>
                )}
              </Button>
            </div>

            <div className="space-y-4 mt-8">
              <Accordion type="single" collapsible className="w-full">
                {conversations.map((conv, index) => (
                  <AccordionItem key={conv.id} value={`item-${index}`}>
                    <AccordionTrigger className="text-spark-text hover:no-underline">
                      <span className="text-left">{conv.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-spark-text-light bg-white/5 p-4 rounded-lg">
                      {formatAnswer(conv.answer)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
