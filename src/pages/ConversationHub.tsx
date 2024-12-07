import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";

interface Topic {
  title: string;
  questions: string[];
}

interface Exercise {
  title: string;
  description: string;
  duration: string;
}

const ConversationHub = () => {
  const { toast } = useToast();
  const [isLoadingTopic, setIsLoadingTopic] = useState(false);
  const [isLoadingExercise, setIsLoadingExercise] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);

  const generateNewTopic = async () => {
    setIsLoadingTopic(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-conversation-content', {
        body: { type: 'topic' }
      });
      
      if (error) throw error;
      setCurrentTopic(data);
      toast({
        title: "New Topic Generated",
        description: "Start exploring this conversation topic together!",
      });
    } catch (error) {
      console.error('Error generating topic:', error);
      toast({
        title: "Error",
        description: "Failed to generate new topic",
        variant: "destructive",
      });
    } finally {
      setIsLoadingTopic(false);
    }
  };

  const generateNewExercise = async () => {
    setIsLoadingExercise(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-conversation-content', {
        body: { type: 'exercise' }
      });
      
      if (error) throw error;
      setCurrentExercise(data);
      toast({
        title: "New Exercise Generated",
        description: "Try this connection exercise together!",
      });
    } catch (error) {
      console.error('Error generating exercise:', error);
      toast({
        title: "Error",
        description: "Failed to generate new exercise",
        variant: "destructive",
      });
    } finally {
      setIsLoadingExercise(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gradient">Conversation Hub</h1>
          <p className="text-spark-text-light text-lg max-w-2xl mx-auto">
            Discover meaningful topics and deepen your connection through conversation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="glass-card hover-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Daily Topics
              </CardTitle>
              <Button
                variant="outline"
                onClick={generateNewTopic}
                disabled={isLoadingTopic}
              >
                {isLoadingTopic ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                ) : (
                  'Generate New Topic'
                )}
              </Button>
            </CardHeader>
            <CardContent>
              {currentTopic ? (
                <Accordion type="single" collapsible>
                  <AccordionItem value="topic">
                    <AccordionTrigger>{currentTopic.title}</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3">
                        {currentTopic.questions.map((question, index) => (
                          <li key={index} className="text-spark-text-light">
                            {question}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <p className="text-center text-spark-text-light py-4">
                  Click the button above to generate a new conversation topic.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="glass-card hover-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Deep Connection
              </CardTitle>
              <Button
                variant="outline"
                onClick={generateNewExercise}
                disabled={isLoadingExercise}
              >
                {isLoadingExercise ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                ) : (
                  'Generate New Exercise'
                )}
              </Button>
            </CardHeader>
            <CardContent>
              {currentExercise ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/10 space-y-2">
                    <h3 className="font-semibold">{currentExercise.title}</h3>
                    <p className="text-sm text-spark-text-light">{currentExercise.description}</p>
                    <p className="text-xs text-spark-text-light mt-2">
                      Duration: {currentExercise.duration}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-center text-spark-text-light py-4">
                  Click the button above to generate a new connection exercise.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ConversationHub;