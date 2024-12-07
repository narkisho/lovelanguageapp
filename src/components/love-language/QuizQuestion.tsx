import { Button } from "@/components/ui/button";

interface QuizQuestionProps {
  question: {
    text: string;
    options: {
      value: string;
      text: string;
      type: string;
    }[];
  };
  onAnswer: (value: string) => void;
  selectedValue?: string;
}

export const QuizQuestion = ({ question, onAnswer, selectedValue }: QuizQuestionProps) => {
  return (
    <div className="space-y-6">
      <div className="text-lg font-medium mb-4">
        {question.text}
      </div>
      <div className="space-y-3">
        {question.options.map((option) => (
          <Button
            key={option.value}
            variant={selectedValue === option.value ? "default" : "outline"}
            className="w-full justify-start text-left h-auto py-4 px-6"
            onClick={() => onAnswer(option.value)}
          >
            {option.text}
          </Button>
        ))}
      </div>
    </div>
  );
};