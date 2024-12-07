import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Users } from "lucide-react";

interface Props {
  session: any;
}

export function SharedVisionBoard({ session }: Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sharedVisions, setSharedVisions] = useState<any[]>([]);

  useEffect(() => {
    fetchSharedVisions();
  }, [session]);

  const fetchSharedVisions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vision_boards')
        .select('*')
        .eq('is_shared', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSharedVisions(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch shared visions.",
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
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Shared Vision Board
          </CardTitle>
          <CardDescription>
            Discover and align your shared dreams and goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sharedVisions.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 mx-auto text-spark-text-light opacity-50" />
              <p className="mt-4 text-spark-text-light">
                No shared visions yet. Start by sharing your individual visions!
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {sharedVisions.map((vision) => (
                <Card key={vision.id}>
                  <CardHeader>
                    <CardTitle>{vision.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-spark-text-light">{vision.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}