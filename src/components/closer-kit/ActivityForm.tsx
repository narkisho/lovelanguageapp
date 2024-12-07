import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export function ActivityForm() {
  const [isLoading, setIsLoading] = useState(false);

  const generateActivity = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Get user preferences
      const { data: preferences } = await supabase
        .from('closer_kit_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!preferences) {
        toast.error("Please set your preferences first");
        return;
      }

      // Generate activity using the edge function
      const { data: activity, error: genError } = await supabase.functions.invoke(
        'generate-closer-activity',
        { body: { preferences } }
      );

      if (genError) throw genError;

      // Save the generated activity
      const { error: saveError } = await supabase
        .from('closer_kit_activities')
        .insert({
          user_id: user.id,
          ...activity,
        });

      if (saveError) throw saveError;

      toast.success("New activity generated!");
    } catch (error) {
      console.error('Error generating activity:', error);
      toast.error("Failed to generate activity");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <p className="text-spark-text-light">
            Generate a new personalized activity based on your preferences
          </p>
          <Button
            onClick={generateActivity}
            disabled={isLoading}
            className="w-full md:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate New Activity"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}