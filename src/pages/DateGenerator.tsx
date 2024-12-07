import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const DateGenerator = () => {
  const [date, setDate] = useState<Date>();
  const [budget, setBudget] = useState("");
  const { toast } = useToast();

  const handleGenerateDate = () => {
    toast({
      title: "Date Idea Generated",
      description: "Your personalized date suggestion is being prepared.",
    });
    // TODO: Implement date generation logic with Supabase
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
                disabled={!date || !budget}
              >
                Generate Date Idea
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default DateGenerator;