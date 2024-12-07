import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { HeartHandshake, Loader2 } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  description: string;
  category: string;
  stage: string;
  completed: boolean;
  reflection_notes: string | null;
}

export default function CloserKit() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('closer_kit_activities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setActivities(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch activities",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateNewActivity = async () => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-closer-kit-activity', {
        body: { type: 'activity' }
      });
      
      if (error) throw error;
      
      // Save the generated activity to the database
      const { error: saveError } = await supabase
        .from('closer_kit_activities')
        .insert([data]);

      if (saveError) throw saveError;

      toast({
        title: "New Activity Generated",
        description: "Try this intimacy building exercise with your partner!",
      });
      
      fetchActivities();
    } catch (error: any) {
      console.error('Error generating activity:', error);
      toast({
        title: "Error",
        description: "Failed to generate new activity",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gradient">CloserKit</h1>
            <p className="text-spark-text-light">
              Intimacy Building Exercises for Every Stage
            </p>
          </div>
          <Button
            onClick={generateNewActivity}
            disabled={generating}
            className="bg-spark-rose hover:bg-spark-rose/90"
          >
            {generating ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
            ) : (
              <>
                <HeartHandshake className="mr-2 h-4 w-4" />
                Generate New Activity
              </>
            )}
          </Button>
        </div>

        <div className="grid gap-6">
          {loading ? (
            <Card>
              <CardContent className="flex items-center justify-center py-6">
                <Loader2 className="h-8 w-8 animate-spin text-spark-rose" />
              </CardContent>
            </Card>
          ) : activities.length === 0 ? (
            <Card>
              <CardContent className="text-center py-6">
                <HeartHandshake className="h-12 w-12 mx-auto text-spark-text-light opacity-50" />
                <p className="mt-4 text-spark-text-light">
                  No activities yet. Generate your first intimacy building exercise!
                </p>
              </CardContent>
            </Card>
          ) : (
            activities.map((activity) => (
              <Card key={activity.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{activity.title}</CardTitle>
                      <CardDescription>Stage: {activity.stage}</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Toggle completion status
                        supabase
                          .from('closer_kit_activities')
                          .update({ completed: !activity.completed })
                          .eq('id', activity.id)
                          .then(() => fetchActivities());
                      }}
                    >
                      {activity.completed ? 'Completed' : 'Mark Complete'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-spark-text-light mb-4">{activity.description}</p>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      Add Reflection
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
}