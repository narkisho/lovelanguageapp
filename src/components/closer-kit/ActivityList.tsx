import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, Clock, Star, Users } from "lucide-react";

interface PartnerRole {
  title: string;
  tasks: string[];
  preparation: string[];
}

interface PartnerRoles {
  partner1: PartnerRole;
  partner2: PartnerRole;
}

interface Activity {
  id: string;
  title: string;
  description: string;
  category: string;
  stage: string;
  duration: number | null;
  difficulty_level: number;
  completed: boolean | null;
  is_favorite: boolean;
  location: string | null;
  partner_roles: PartnerRoles | null;
}

export function ActivityList() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('closer_kit_activities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Cast the data to ensure it matches our Activity interface
      const typedActivities: Activity[] = data?.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        stage: item.stage,
        duration: item.duration,
        difficulty_level: item.difficulty_level,
        completed: item.completed,
        is_favorite: item.is_favorite,
        location: item.location,
        partner_roles: item.partner_roles as PartnerRoles | null
      })) || [];

      setActivities(typedActivities);
    } catch (error) {
      console.error('Error fetching activities:', error);
      toast.error("Failed to load activities");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('closer_kit_activities')
        .update({ completed: !completed })
        .eq('id', id);

      if (error) throw error;
      await fetchActivities();
      toast.success(completed ? "Activity marked as incomplete" : "Activity completed!");
    } catch (error) {
      console.error('Error updating activity:', error);
      toast.error("Failed to update activity");
    }
  };

  const toggleFavorite = async (id: string, isFavorite: boolean) => {
    try {
      const { error } = await supabase
        .from('closer_kit_activities')
        .update({ is_favorite: !isFavorite })
        .eq('id', id);

      if (error) throw error;
      await fetchActivities();
      toast.success(isFavorite ? "Removed from favorites" : "Added to favorites!");
    } catch (error) {
      console.error('Error updating activity:', error);
      toast.error("Failed to update activity");
    }
  };

  if (isLoading) {
    return <div>Loading activities...</div>;
  }

  if (activities.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="text-spark-text-light">No activities yet. Generate your first one!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <Card key={activity.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span>{activity.title}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFavorite(activity.id, activity.is_favorite)}
                >
                  <Star
                    className={`h-5 w-5 ${
                      activity.is_favorite ? "text-yellow-400 fill-yellow-400" : ""
                    }`}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleComplete(activity.id, activity.completed || false)}
                >
                  <CheckCircle
                    className={`h-5 w-5 ${
                      activity.completed ? "text-green-500 fill-green-500" : ""
                    }`}
                  />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="prose prose-sm max-w-none">
                <p className="text-spark-text-light mb-4">{activity.description}</p>
                
                {activity.partner_roles && (
                  <div className="space-y-4 mt-4">
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">{activity.partner_roles.partner1.title}</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {activity.partner_roles.partner1.tasks.map((task, index) => (
                          <li key={index} className="text-spark-text-light">{task}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">{activity.partner_roles.partner2.title}</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {activity.partner_roles.partner2.tasks.map((task, index) => (
                          <li key={index} className="text-spark-text-light">{task}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-spark-text-light">
                {activity.duration && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {activity.duration} minutes
                  </span>
                )}
                <span>Difficulty: {activity.difficulty_level}/5</span>
                <span>Category: {activity.category}</span>
                {activity.location && <span>Location: {activity.location}</span>}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}