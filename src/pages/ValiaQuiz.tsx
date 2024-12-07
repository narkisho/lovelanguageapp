import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Heart, HeartHandshake } from "lucide-react";
import { ValiaQuestions } from "@/components/valia/ValiaQuestions";
import { ValiaResults } from "@/components/valia/ValiaResults";

export default function ValiaQuiz() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'results'>('intro');
  const { toast } = useToast();
  const navigate = useNavigate();

  const startQuiz = () => {
    setStep('quiz');
  };

  const handleQuizComplete = () => {
    setStep('results');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-spark-text">Valia</h1>
            <p className="text-spark-text-light">Discover Your Relationship Values</p>
          </div>
        </div>

        {step === 'intro' && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="text-spark-rose" />
                Welcome to Valia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Valia is your guide to discovering what truly matters in your relationships.
                Through thoughtful questions and reflection, you'll uncover your:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Core relationship values</li>
                <li>Must-haves in a partner</li>
                <li>Nice-to-have qualities</li>
                <li>Personal deal-breakers</li>
              </ul>
              <p>
                This journey of self-discovery will help you make more intentional
                choices in your relationships and communicate your needs with confidence.
              </p>
              <Button onClick={startQuiz} className="w-full">
                Begin Your Journey
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 'quiz' && (
          <ValiaQuestions onComplete={handleQuizComplete} />
        )}

        {step === 'results' && (
          <ValiaResults />
        )}
      </div>
    </MainLayout>
  );
}