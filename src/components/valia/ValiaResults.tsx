import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ValiaResult {
  core_values: string[];
  must_haves: string[];
  nice_to_haves: string[];
  deal_breakers: string[];
  created_at: string;
}

export function ValiaResults() {
  const [results, setResults] = useState<ValiaResult | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("No user found");

        const { data, error } = await supabase
          .from('valia_results')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) throw error;
        setResults(data);
      } catch (error) {
        console.error('Error fetching results:', error);
        toast({
          title: "Error fetching results",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    };

    fetchResults();
  }, [toast]);

  if (!results) {
    return <div>Loading...</div>;
  }

  const sections = [
    { title: "Core Values", values: results.core_values },
    { title: "Must-Haves", values: results.must_haves },
    { title: "Nice-to-Haves", values: results.nice_to_haves },
    { title: "Deal-Breakers", values: results.deal_breakers },
  ];

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="text-spark-rose" />
            Your Relationship Values Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-spark-text-light">
            Here's what matters most to you in relationships. Use these insights to
            guide your dating decisions and communicate your needs effectively.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {sections.map((section) => (
              <Card key={section.title}>
                <CardHeader>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {section.values.map((value, index) => (
                      <li key={index}>{value}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => navigate("/vision-quest")}>
              Back to Vision Quest
            </Button>
            <Button onClick={() => window.location.reload()}>
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}