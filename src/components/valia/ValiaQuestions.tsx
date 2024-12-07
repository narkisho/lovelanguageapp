import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { HeartHandshake, Loader2 } from "lucide-react";

interface ValiaQuestionsProps {
  onComplete: () => void;
}

export function ValiaQuestions({ onComplete }: ValiaQuestionsProps) {
  const [currentSection, setCurrentSection] = useState<'values' | 'mustHaves' | 'niceToHaves' | 'dealBreakers'>('values');
  const [values, setValues] = useState<string[]>([]);
  const [mustHaves, setMustHaves] = useState<string[]>([]);
  const [niceToHaves, setNiceToHaves] = useState<string[]>([]);
  const [dealBreakers, setDealBreakers] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const sections = {
    values: {
      title: "Core Values",
      prompt: "What are your fundamental beliefs and principles in relationships? Add one value at a time.",
      placeholder: "e.g., Honesty, Growth, Communication...",
      values: values,
      setValues: setValues,
    },
    mustHaves: {
      title: "Must-Haves",
      prompt: "What qualities or traits are absolutely essential in your partner? Add one at a time.",
      placeholder: "e.g., Emotional intelligence, Shared life goals...",
      values: mustHaves,
      setValues: setMustHaves,
    },
    niceToHaves: {
      title: "Nice-to-Haves",
      prompt: "What qualities would you appreciate but aren't deal-breakers? Add one at a time.",
      placeholder: "e.g., Shared hobbies, Similar taste in music...",
      values: niceToHaves,
      setValues: setNiceToHaves,
    },
    dealBreakers: {
      title: "Deal-Breakers",
      prompt: "What are your absolute non-negotiables in a relationship? Add one at a time.",
      placeholder: "e.g., Dishonesty, Lack of ambition...",
      values: dealBreakers,
      setValues: setDealBreakers,
    },
  };

  const currentSectionData = sections[currentSection];

  const addValue = () => {
    if (currentInput.trim()) {
      currentSectionData.setValues([...currentSectionData.values, currentInput.trim()]);
      setCurrentInput("");
    }
  };

  const removeValue = (index: number) => {
    currentSectionData.setValues(
      currentSectionData.values.filter((_, i) => i !== index)
    );
  };

  const nextSection = async () => {
    if (currentSection === 'values') setCurrentSection('mustHaves');
    else if (currentSection === 'mustHaves') setCurrentSection('niceToHaves');
    else if (currentSection === 'niceToHaves') setCurrentSection('dealBreakers');
    else {
      // Save results
      setSaving(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("No user found");

        const { error } = await supabase.from('valia_results').insert({
          user_id: user.id,
          core_values: values,
          must_haves: mustHaves,
          nice_to_haves: niceToHaves,
          deal_breakers: dealBreakers,
        });

        if (error) throw error;

        toast({
          title: "Results saved!",
          description: "Your relationship values have been recorded.",
        });
        onComplete();
      } catch (error) {
        console.error('Error saving results:', error);
        toast({
          title: "Error saving results",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setSaving(false);
      }
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HeartHandshake className="text-spark-rose" />
          {currentSectionData.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-spark-text-light">{currentSectionData.prompt}</p>
        
        <div className="space-y-2">
          <Textarea
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder={currentSectionData.placeholder}
            className="min-h-[100px]"
          />
          <Button onClick={addValue} className="w-full">
            Add {currentSectionData.title.slice(0, -1)}
          </Button>
        </div>

        {currentSectionData.values.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold">Your {currentSectionData.title}:</h3>
            <ul className="space-y-2">
              {currentSectionData.values.map((value, index) => (
                <li key={index} className="flex items-center justify-between p-2 bg-background/50 rounded-lg">
                  <span>{value}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeValue(index)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button
          onClick={nextSection}
          className="w-full"
          disabled={currentSectionData.values.length === 0 || saving}
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            currentSection === 'dealBreakers' ? 'Complete Quiz' : 'Next Section'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}