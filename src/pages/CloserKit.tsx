import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { HeartHandshake, Loader2 } from "lucide-react";
import { ActivityForm } from "@/components/closer-kit/ActivityForm";
import { ActivityCard } from "@/components/closer-kit/ActivityCard";

interface Activity {
  id: string;
  title: string;
  description: string;
  category: string;
  stage: string;
  completed: boolean;
  reflection_notes: string | null;
}

interface ActivityPreferences {
  relationshipStage: string;
  intimacyLevel: string;
  duration: string;
  location: string;
}

export default function CloserKit() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [generating, setGenerating] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

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

  const generateNewActivity = async (preferences: ActivityPreferences) => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-closer-kit-activity', {
        body: { type: 'activity', answers: preferences }
      });
      
      if (error) throw error;
      
      const { error: saveError } = await supabase
        .from('closer_kit_activities')
        .insert([data]);

      if (saveError) throw saveError;

      toast({
        title: "New Activity Generated",
        description: "Try this intimacy building exercise with your partner!",
      });
      
      setShowQuestionnaire(false);
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

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('closer_kit_activities')
        .update({ completed })
        .eq('id', id);

      if (error) throw error;
      fetchActivities();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update activity status",
        variant: "destructive",
      });
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gradient">CloserKit</h1>
            <p className="text-spark-text-light">
              Intimacy Building Exercises for Every Stage
            </p>
          </div>
          <Button
            onClick={() => setShowQuestionnaire(true)}
            className="bg-spark-sage hover:bg-spark-sage/90 w-full sm:w-auto animate-pulse hover:animate-none"
            size="lg"
          >
            <HeartHandshake className="mr-2 h-5 w-5" />
            Create New Activity
          </Button>
        </div>

        {showQuestionnaire && (
          <ActivityForm
            onSubmit={generateNewActivity}
            onCancel={() => setShowQuestionnaire(false)}
            generating={generating}
          />
        )}

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
              <ActivityCard
                key={activity.id}
                activity={activity}
                onToggleComplete={handleToggleComplete}
              />
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
}