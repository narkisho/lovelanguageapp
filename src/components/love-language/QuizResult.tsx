import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, RefreshCw } from "lucide-react";

interface QuizResultProps {
  scores: {
    words_of_affirmation: number;
    acts_of_service: number;
    receiving_gifts: number;
    quality_time: number;
    physical_touch: number;
  };
  primaryLanguage: string;
  onRetake: () => void;
}

const loveLanguageInfo = {
  words_of_affirmation: {
    description: "People with this love language value verbal expressions of love, including compliments, words of appreciation, and verbal encouragement.",
    tips: [
      "Express your feelings verbally often",
      "Write thoughtful notes or messages",
      "Give genuine compliments",
      "Acknowledge their achievements",
      "Use words of encouragement during difficult times"
    ]
  },
  acts_of_service: {
    description: "For these individuals, actions speak louder than words. They feel loved when others do helpful things for them.",
    tips: [
      "Help with daily tasks without being asked",
      "Complete projects they've been putting off",
      "Make their life easier in practical ways",
      "Show up when they need support",
      "Take initiative in household responsibilities"
    ]
  },
  receiving_gifts: {
    description: "This love language isn't about materialism; it's about the thoughtfulness and effort behind the gift giving process.",
    tips: [
      "Remember special occasions with meaningful gifts",
      "Give small, thoughtful surprises",
      "Pay attention to items they mention wanting",
      "Keep a list of their favorite things",
      "Focus on the symbolic meaning behind gifts"
    ]
  },
  quality_time: {
    description: "Those with this love language feel most loved when others spend meaningful, uninterrupted time with them.",
    tips: [
      "Give them your undivided attention",
      "Plan regular date nights",
      "Create special moments together",
      "Engage in meaningful conversations",
      "Participate in their interests"
    ]
  },
  physical_touch: {
    description: "For these individuals, appropriate physical touch and closeness are powerful communicators of love.",
    tips: [
      "Hold hands during walks",
      "Offer hugs frequently",
      "Sit close during conversations",
      "Give shoulder rubs after a long day",
      "Show physical affection in appropriate settings"
    ]
  }
};

export const QuizResult = ({ scores, primaryLanguage, onRetake }: QuizResultProps) => {
  const formatLanguage = (str: string) => 
    str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <Card className="glass-card max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Your Love Language Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-xl font-semibold mb-4">
          Your primary love language is: {formatLanguage(primaryLanguage)}
        </div>
        <div className="space-y-2">
          <p>Score breakdown:</p>
          <ul className="list-none space-y-2">
            {Object.entries(scores).map(([language, score]) => (
              <li key={language} className="flex justify-between">
                <span>{formatLanguage(language)}:</span>
                <span className="font-semibold">{score}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={onRetake}
            variant="outline"
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Retake Quiz
          </Button>
        </div>

        <div className="mt-8 space-y-6">
          <h3 className="text-lg font-semibold">Understanding Love Languages</h3>
          {Object.entries(loveLanguageInfo).map(([language, info]) => (
            <div key={language} className="p-4 rounded-lg bg-white/50 space-y-3">
              <h4 className="font-semibold text-lg">{formatLanguage(language)}</h4>
              <p className="text-spark-text-light">{info.description}</p>
              <div>
                <h5 className="font-medium mb-2">Tips for showing love:</h5>
                <ul className="list-disc pl-5 space-y-1">
                  {info.tips.map((tip, index) => (
                    <li key={index} className="text-spark-text-light">{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};