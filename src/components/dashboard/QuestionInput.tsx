import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";

interface QuestionInputProps {
  onAskQuestion: (question: string) => Promise<void>;
  isLoading: boolean;
}

export const QuestionInput = ({ onAskQuestion, isLoading }: QuestionInputProps) => {
  const [question, setQuestion] = useState("");

  const handleSubmit = async () => {
    if (question.trim()) {
      await onAskQuestion(question);
      setQuestion("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-4">
      <Textarea
        placeholder="Ask any relationship question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyPress}
        className="flex-1"
      />
      <Button
        onClick={handleSubmit}
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
  );
};