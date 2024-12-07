import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

interface DateIdea {
  title: string;
  description: string;
  estimatedCost: string;
}

const DateGenerator = () => {
  const [date, setDate] = useState<Date>();
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [dateIdea, setDateIdea] = useState<DateIdea | null>(null);
  const { toast } = useToast();

  const handleGenerateDate = async () => {
    if (!date || !budget) {
      toast({
        title: "Missing Information",
        description: "Please select a date and enter a budget.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-date-idea', {
        body: {
          date: format(date, 'MMMM do, yyyy'),
          budget: budget,
        },
      });

      if (error) throw error;

      setDateIdea(data);
      toast({
        title: "Date Idea Generated",
        description: "Check out your personalized date suggestion below!",
      });
    } catch (error) {
      console.error('Error generating date idea:', error);
      toast({
        title: "Error",
        description: "Failed to generate date idea. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gradient">Date Generator</h1>
          <p className="text-spark-text-light text-lg max-w-2xl mx-auto">
            Let us help you plan the perfect date based on your preferences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="glass-card hover-card">
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card className="glass-card hover-card">
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Budget</label>
                <Input
                  type="number"
                  placeholder="Enter your budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
              <Button 
                className="w-full"
                onClick={handleGenerateDate}
                disabled={!date || !budget || loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Date Idea'
                )}
              </Button>
            </CardContent>
          </Card>

          {dateIdea && (
            <Card className="glass-card hover-card md:col-span-2">
              <CardHeader>
                <CardTitle>{dateIdea.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">{dateIdea.description}</p>
                <p className="font-semibold">Estimated Cost: {dateIdea.estimatedCost}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default DateGenerator;