import { useState } from "react";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResult } from "./QuizResult";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface LoveLanguageScores {
  words_of_affirmation: number;
  acts_of_service: number;
  receiving_gifts: number;
  quality_time: number;
  physical_touch: number;
}

export const QuizLogic = ({ questions }: { questions: any[] }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState<{
    scores: LoveLanguageScores;
    primaryLanguage: string;
  } | null>(null);

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: value }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const results = calculateResults();
      setQuizResults(results);
      setShowResults(true);
    }
  };

  const calculateResults = () => {
    const scores: LoveLanguageScores = {
      words_of_affirmation: 0,
      acts_of_service: 0,
      receiving_gifts: 0,
      quality_time: 0,
      physical_touch: 0,
    };

    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions[parseInt(questionId)];
      const selectedOption = question.options.find((opt) => opt.value === answer);
      if (selectedOption) {
        scores[selectedOption.type as keyof LoveLanguageScores] += 1;
      }
    });

    const primaryLanguage = Object.entries(scores).reduce((a, b) => 
      scores[a[0] as keyof LoveLanguageScores] > scores[b[0] as keyof LoveLanguageScores] ? a : b
    )[0];

    return { scores, primaryLanguage };
  };

  return (
    <>
      {showResults && quizResults ? (
        <QuizResult scores={quizResults.scores} primaryLanguage={quizResults.primaryLanguage} />
      ) : (
        <Card className="glass-card max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Question {currentQuestion + 1} of {questions.length}
            </CardTitle>
            <CardDescription>
              Choose the answer that best reflects your feelings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <QuizQuestion
              question={questions[currentQuestion]}
              onAnswer={handleAnswer}
              selectedValue={answers[currentQuestion]}
            />
          </CardContent>
        </Card>
      )}

      {!showResults && (
        <div className="flex justify-between max-w-3xl mx-auto px-4">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentQuestion((prev) => Math.min(questions.length - 1, prev + 1))}
            disabled={currentQuestion === questions.length - 1 || !answers[currentQuestion]}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};