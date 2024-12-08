import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ConversationHistoryProps {
  conversations: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
  formatAnswer: (answer: string) => React.ReactNode;
}

export const ConversationHistory = ({ conversations, formatAnswer }: ConversationHistoryProps) => {
  return (
    <div className="space-y-4 mt-8">
      <Accordion type="single" collapsible className="w-full">
        {conversations.map((conv, index) => (
          <AccordionItem key={conv.id} value={`item-${index}`}>
            <AccordionTrigger className="text-spark-text hover:no-underline">
              <span className="text-left">{conv.question}</span>
            </AccordionTrigger>
            <AccordionContent className="text-spark-text-light bg-white/5 p-4 rounded-lg">
              {formatAnswer(conv.answer)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};