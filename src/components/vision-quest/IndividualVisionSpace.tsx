import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PlusCircle, Sparkles } from "lucide-react";

interface Props {
  session: any;
}

export function IndividualVisionSpace({ session }: Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateVision = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('vision_boards')
        .insert([
          {
            user_id: session.user.id,
            title,
            description,
            is_shared: false
          }
        ])
        .select();

      if (error) throw error;

      toast({
        title: "Vision Created",
        description: "Your vision has been saved successfully.",
      });

      setTitle("");
      setDescription("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAIAssist = async () => {
    try {
      setLoading(true);
      const response = await supabase.functions.invoke('generate-vision-content', {
        body: { prompt: description }
      });

      if (response.error) throw response.error;

      const suggestion = response.data.suggestion;
      setDescription(suggestion);

      toast({
        title: "AI Suggestion Generated",
        description: "Your vision has been enhanced with AI assistance.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to generate AI suggestion.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Create Your Vision</CardTitle>
          <CardDescription>
            Reflect on your personal goals and aspirations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Vision Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Describe your vision..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[200px]"
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleCreateVision}
              disabled={loading || !title || !description}
              className="flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Create Vision
            </Button>
            <Button
              variant="outline"
              onClick={handleAIAssist}
              disabled={loading || !description}
              className="flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              AI Assist
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}