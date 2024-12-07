import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Heart, Loader2 } from "lucide-react";

const questions = [
  {
    id: 1,
    text: "What makes you feel most appreciated in a relationship?",
    options: [
      { value: "words", text: "Hearing words of affirmation and compliments", type: "words_of_affirmation" },
      { value: "acts", text: "When your partner does thoughtful things for you", type: "acts_of_service" },
      { value: "gifts", text: "Receiving meaningful gifts", type: "receiving_gifts" },
      { value: "time", text: "Spending quality time together", type: "quality_time" },
      { value: "touch", text: "Physical affection and closeness", type: "physical_touch" },
    ],
  },
  {
    id: 2,
    text: "How do you prefer to show love to others?",
    options: [
      { value: "words", text: "Through encouraging words and praise", type: "words_of_affirmation" },
      { value: "acts", text: "By helping them with tasks or responsibilities", type: "acts_of_service" },
      { value: "gifts", text: "By giving thoughtful gifts", type: "receiving_gifts" },
      { value: "time", text: "By dedicating undivided attention", type: "quality_time" },
      { value: "touch", text: "Through hugs and physical gestures", type: "physical_touch" },
    ],
  },
  {
    id: 3,
    text: "What action from your partner would make you feel most loved?",
    options: [
      { value: "words", text: "Writing you a heartfelt letter", type: "words_of_affirmation" },
      { value: "acts", text: "Taking care of a task you've been dreading", type: "acts_of_service" },
      { value: "gifts", text: "Surprising you with a meaningful gift", type: "receiving_gifts" },
      { value: "time", text: "Planning a special day together", type: "quality_time" },
      { value: "touch", text: "Giving you a long, warm hug", type: "physical_touch" },
    ],
  },
  {
    id: 4,
    text: "What would hurt your feelings the most?",
    options: [
      { value: "words", text: "Harsh words or lack of verbal appreciation", type: "words_of_affirmation" },
      { value: "acts", text: "Your partner refusing to help when you need it", type: "acts_of_service" },
      { value: "gifts", text: "Forgotten special occasions", type: "receiving_gifts" },
      { value: "time", text: "Constantly being interrupted or ignored", type: "quality_time" },
      { value: "touch", text: "Physical distance or coldness", type: "physical_touch" },
    ],
  },
  {
    id: 5,
    text: "What do you notice first in a relationship?",
    options: [
      { value: "words", text: "How often your partner expresses their feelings", type: "words_of_affirmation" },
      { value: "acts", text: "How helpful and supportive they are", type: "acts_of_service" },
      { value: "gifts", text: "The thought they put into presents", type: "receiving_gifts" },
      { value: "time", text: "How present they are when you're together", type: "quality_time" },
      { value: "touch", text: "The level of physical affection", type: "physical_touch" },
    ],
  },
  {
    id: 6,
    text: "What makes you feel most connected to your partner?",
    options: [
      { value: "words", text: "Deep conversations about feelings", type: "words_of_affirmation" },
      { value: "acts", text: "When they anticipate and meet your needs", type: "acts_of_service" },
      { value: "gifts", text: "Exchanging meaningful presents", type: "receiving_gifts" },
      { value: "time", text: "Shared activities and experiences", type: "quality_time" },
      { value: "touch", text: "Physical intimacy and touch", type: "physical_touch" },
    ],
  },
  {
    id: 7,
    text: "What's your ideal way to spend time with your partner?",
    options: [
      { value: "words", text: "Having heart-to-heart talks", type: "words_of_affirmation" },
      { value: "acts", text: "Working on projects together", type: "acts_of_service" },
      { value: "gifts", text: "Shopping for each other", type: "receiving_gifts" },
      { value: "time", text: "Enjoying uninterrupted time together", type: "quality_time" },
      { value: "touch", text: "Cuddling and being physically close", type: "physical_touch" },
    ],
  },
  {
    id: 8,
    text: "How do you prefer to receive support during difficult times?",
    options: [
      { value: "words", text: "Through words of encouragement", type: "words_of_affirmation" },
      { value: "acts", text: "By having someone take care of practical needs", type: "acts_of_service" },
      { value: "gifts", text: "With thoughtful care packages", type: "receiving_gifts" },
      { value: "time", text: "Having someone simply be present", type: "quality_time" },
      { value: "touch", text: "Through comforting physical touch", type: "physical_touch" },
    ],
  },
  {
    id: 9,
    text: "What makes you feel most secure in a relationship?",
    options: [
      { value: "words", text: "Regular verbal affirmation of love", type: "words_of_affirmation" },
      { value: "acts", text: "Consistent helpful actions", type: "acts_of_service" },
      { value: "gifts", text: "Thoughtful gifts that show they know you", type: "receiving_gifts" },
      { value: "time", text: "Regular quality time together", type: "quality_time" },
      { value: "touch", text: "Frequent physical affection", type: "physical_touch" },
    ],
  },
  {
    id: 10,
    text: "What's your favorite way to celebrate special occasions?",
    options: [
      { value: "words", text: "Exchanging heartfelt cards or messages", type: "words_of_affirmation" },
      { value: "acts", text: "Having your partner plan everything", type: "acts_of_service" },
      { value: "gifts", text: "Exchanging meaningful presents", type: "receiving_gifts" },
      { value: "time", text: "Spending the entire day together", type: "quality_time" },
      { value: "touch", text: "Sharing intimate moments", type: "physical_touch" },
    ],
  },
];

const LoveLanguageQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: value }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const calculateResults = () => {
    const scores = {
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
        scores[selectedOption.type as keyof typeof scores] += 1;
      }
    });

    const primaryLanguage = Object.entries(scores).reduce((a, b) => 
      scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
    )[0];

    return { scores, primaryLanguage };
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      toast.error("Please answer all questions before submitting");
      return;
    }

    setIsSubmitting(true);
    const { scores, primaryLanguage } = calculateResults();

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase.from("love_language_results").insert({
        user_id: user.id,
        words_of_affirmation: scores.words_of_affirmation,
        acts_of_service: scores.acts_of_service,
        receiving_gifts: scores.receiving_gifts,
        quality_time: scores.quality_time,
        physical_touch: scores.physical_touch,
        primary_language: primaryLanguage,
      });

      if (error) throw error;

      toast.success("Quiz completed! Your results have been saved.");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving results:", error);
      toast.error("Failed to save your results. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gradient">Love Language Quiz</h1>
          <p className="text-spark-text-light text-lg max-w-2xl mx-auto">
            Discover your primary love language by answering 10 simple questions.
          </p>
        </div>

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
            <div className="text-lg font-medium mb-4">
              {questions[currentQuestion].text}
            </div>
            <RadioGroup
              onValueChange={handleAnswer}
              value={answers[currentQuestion]}
              className="space-y-4"
            >
              {questions[currentQuestion].options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="text-base">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {currentQuestion === questions.length - 1 && (
              <Button
                onClick={handleSubmit}
                className="w-full mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                ) : (
                  <>Submit Quiz</>
                )}
              </Button>
            )}
          </CardContent>
        </Card>

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
      </div>
    </MainLayout>
  );
};

export default LoveLanguageQuiz;