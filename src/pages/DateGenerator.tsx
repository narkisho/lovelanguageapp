import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Heart, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface DateIdea {
  title: string;
  description: string;
  estimatedCost: string;
}

const DateGenerator = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [budget, setBudget] = useState("");
  const [country, setCountry] = useState("United States");
  const [isLoading, setIsLoading] = useState(false);
  const [dateIdea, setDateIdea] = useState<DateIdea | null>(null);

  const generateDateIdea = async () => {
    if (!selectedDate || !budget) {
      toast.error("Please select a date and budget");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-date-idea', {
        body: { 
          date: format(selectedDate, 'MMMM do, yyyy'),
          budget: parseFloat(budget),
          country: country
        }
      });
      
      if (error) throw error;
      
      setDateIdea(data);
      toast.success("New date idea generated!");
    } catch (error) {
      console.error('Error generating date idea:', error);
      toast.error("Failed to generate date idea");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gradient">Date Generator</h1>
          <p className="text-spark-text-light text-lg max-w-2xl mx-auto">
            Get personalized date ideas based on your preferences and budget.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="glass-card hover-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Select Date & Budget
              </CardTitle>
              <CardDescription>
                Choose when you'd like to have your date and set your budget
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col space-y-2">
                <Label>Select Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label>Budget ($)</Label>
                <Input
                  type="number"
                  placeholder="Enter your budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label>Country</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="Japan">Japan</SelectItem>
                    <SelectItem value="Spain">Spain</SelectItem>
                    <SelectItem value="Italy">Italy</SelectItem>
                    <SelectItem value="Mexico">Mexico</SelectItem>
                    <SelectItem value="Brazil">Brazil</SelectItem>
                    <SelectItem value="Argentina">Argentina</SelectItem>
                    <SelectItem value="China">China</SelectItem>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="Russia">Russia</SelectItem>
                    <SelectItem value="South Korea">South Korea</SelectItem>
                    <SelectItem value="Singapore">Singapore</SelectItem>
                    <SelectItem value="Thailand">Thailand</SelectItem>
                    <SelectItem value="Vietnam">Vietnam</SelectItem>
                    <SelectItem value="Indonesia">Indonesia</SelectItem>
                    <SelectItem value="Malaysia">Malaysia</SelectItem>
                    <SelectItem value="Philippines">Philippines</SelectItem>
                    <SelectItem value="New Zealand">New Zealand</SelectItem>
                    <SelectItem value="South Africa">South Africa</SelectItem>
                    <SelectItem value="Egypt">Egypt</SelectItem>
                    <SelectItem value="Morocco">Morocco</SelectItem>
                    <SelectItem value="Kenya">Kenya</SelectItem>
                    <SelectItem value="Nigeria">Nigeria</SelectItem>
                    <SelectItem value="UAE">United Arab Emirates</SelectItem>
                    <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                    <SelectItem value="Turkey">Turkey</SelectItem>
                    <SelectItem value="Greece">Greece</SelectItem>
                    <SelectItem value="Sweden">Sweden</SelectItem>
                    <SelectItem value="Norway">Norway</SelectItem>
                    <SelectItem value="Denmark">Denmark</SelectItem>
                    <SelectItem value="Netherlands">Netherlands</SelectItem>
                    <SelectItem value="Belgium">Belgium</SelectItem>
                    <SelectItem value="Switzerland">Switzerland</SelectItem>
                    <SelectItem value="Austria">Austria</SelectItem>
                    <SelectItem value="Portugal">Portugal</SelectItem>
                    <SelectItem value="Ireland">Ireland</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={generateDateIdea}
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                ) : (
                  <>Generate Date Idea</>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card hover-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Your Date Idea
              </CardTitle>
              <CardDescription>
                A personalized date suggestion just for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              {dateIdea ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/10 space-y-2">
                    <h3 className="font-semibold">{dateIdea.title}</h3>
                    <p className="text-sm text-spark-text-light">{dateIdea.description}</p>
                    <p className="text-xs text-spark-text-light mt-2">
                      Estimated Cost: {dateIdea.estimatedCost}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-center text-spark-text-light py-4">
                  Generate a date idea to see your personalized suggestion here.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default DateGenerator;