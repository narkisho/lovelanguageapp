import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface QuizResultProps {
  scores: {
    words_of_affirmation: number;
    acts_of_service: number;
    receiving_gifts: number;
    quality_time: number;
    physical_touch: number;
  };
  primaryLanguage: string;
}

export const QuizResult = ({ scores, primaryLanguage }: QuizResultProps) => {
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
      </CardContent>
    </Card>
  );
};