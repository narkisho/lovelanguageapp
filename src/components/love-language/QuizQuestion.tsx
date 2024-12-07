import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
      <RadioGroup
        onValueChange={onAnswer}
        value={selectedValue}
        className="space-y-4"
      >
        {question.options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.value} />
            <Label htmlFor={option.value} className="text-base">
              {option.text}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};