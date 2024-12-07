import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { HeartHandshake, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [preferences, setPreferences] = useState<ActivityPreferences>({
    relationshipStage: '',
    intimacyLevel: '',
    duration: '',
    location: ''
  });

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
    if (!preferences.relationshipStage || !preferences.intimacyLevel || 
        !preferences.duration || !preferences.location) {
      toast({
        title: "Missing Information",
        description: "Please answer all questions before generating an activity.",
        variant: "destructive"
      });
      return;
    }

    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-closer-kit-activity', {
        body: { type: 'activity', answers: preferences }
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
            onClick={() => setShowQuestionnaire(true)}
            className="bg-spark-rose hover:bg-spark-rose/90"
          >
            <HeartHandshake className="mr-2 h-4 w-4" />
            Create New Activity
          </Button>
        </div>

        {showQuestionnaire && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Activity Preferences</CardTitle>
              <CardDescription>
                Help us generate the perfect activity for you and your partner
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Relationship Stage</label>
                  <Select
                    value={preferences.relationshipStage}
                    onValueChange={(value) => 
                      setPreferences(prev => ({ ...prev, relationshipStage: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your relationship stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="early">Early Dating</SelectItem>
                      <SelectItem value="committed">Committed Relationship</SelectItem>
                      <SelectItem value="longterm">Long-term Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Desired Intimacy Level</label>
                  <Select
                    value={preferences.intimacyLevel}
                    onValueChange={(value) => 
                      setPreferences(prev => ({ ...prev, intimacyLevel: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select intimacy level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light & Playful</SelectItem>
                      <SelectItem value="moderate">Moderate Connection</SelectItem>
                      <SelectItem value="deep">Deep Bonding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Activity Duration</label>
                  <Select
                    value={preferences.duration}
                    onValueChange={(value) => 
                      setPreferences(prev => ({ ...prev, duration: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quick">15-30 minutes</SelectItem>
                      <SelectItem value="medium">30-60 minutes</SelectItem>
                      <SelectItem value="extended">1+ hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Preferred Location</label>
                  <Select
                    value={preferences.location}
                    onValueChange={(value) => 
                      setPreferences(prev => ({ ...prev, location: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="indoor">Indoor</SelectItem>
                      <SelectItem value="outdoor">Outdoor</SelectItem>
                      <SelectItem value="any">Any Location</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={generateNewActivity}
                    disabled={generating}
                    className="w-full"
                  >
                    {generating ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                    ) : (
                      <>Generate Activity</>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowQuestionnaire(false)}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
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