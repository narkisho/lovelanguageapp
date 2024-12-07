import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Topic } from "@/types/community";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export function TopicsList() {
  const { data: topics, isLoading } = useQuery({
    queryKey: ["community-topics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("community_topics")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Topic[];
    },
  });

  if (isLoading) {
    return <div>Loading topics...</div>;
  }

  return (
    <ScrollArea className="h-[600px] w-full rounded-md border p-4">
      <div className="space-y-4">
        {topics?.map((topic) => (
          <Card key={topic.id} className="cursor-pointer hover:bg-accent/50">
            <CardHeader>
              <CardTitle>{topic.title}</CardTitle>
              <CardDescription>{topic.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
        {topics?.length === 0 && (
          <p className="text-center text-muted-foreground">No topics yet. Be the first to create one!</p>
        )}
      </div>
    </ScrollArea>
  );
}