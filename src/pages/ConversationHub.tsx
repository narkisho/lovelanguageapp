import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const dailyTopics = [
  {
    title: "Childhood Dreams",
    questions: [
      "What was your biggest dream as a child?",
      "Which of those dreams have you achieved?",
      "How can we support each other's dreams now?"
    ]
  },
  {
    title: "Future Plans",
    questions: [
      "Where do you see us in 5 years?",
      "What's one adventure you'd like us to have together?",
      "What goals should we set as a couple?"
    ]
  },
  {
    title: "Love Languages",
    questions: [
      "How do you prefer to receive affection?",
      "What makes you feel most appreciated?",
      "How can I better show you love?"
    ]
  }
];

const deepConnectionExercises = [
  {
    title: "Eye Contact Exercise",
    description: "Sit facing each other and maintain eye contact for 4 minutes. Share how it made you feel afterward.",
    duration: "5-10 minutes"
  },
  {
    title: "Gratitude Exchange",
    description: "Take turns sharing three specific things you appreciate about each other from the past week.",
    duration: "10-15 minutes"
  },
  {
    title: "Memory Lane",
    description: "Share your favorite memories together and discuss why they're meaningful to you.",
    duration: "15-20 minutes"
  }
];

const ConversationHub = () => {
  const { toast } = useToast();
  const [selectedTopic, setSelectedTopic] = useState("");

  const handleStartExercise = (exercise: string) => {
    toast({
      title: "Exercise Started",
      description: `Starting: ${exercise}. Find a quiet space where you won't be interrupted.`,
    });
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
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Daily Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {dailyTopics.map((topic, index) => (
                  <AccordionItem key={index} value={`topic-${index}`}>
                    <AccordionTrigger>{topic.title}</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3">
                        {topic.questions.map((question, qIndex) => (
                          <li key={qIndex} className="text-spark-text-light">
                            {question}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="glass-card hover-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Deep Connection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deepConnectionExercises.map((exercise, index) => (
                  <div key={index} className="p-4 rounded-lg bg-white/10 space-y-2">
                    <h3 className="font-semibold">{exercise.title}</h3>
                    <p className="text-sm text-spark-text-light">{exercise.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-spark-text-light">Duration: {exercise.duration}</span>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleStartExercise(exercise.title)}
                      >
                        Start Exercise
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ConversationHub;