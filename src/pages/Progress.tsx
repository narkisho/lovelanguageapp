import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { TrendingUp, BarChart, Calendar, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";

interface ProgressEntry {
  activity_type: string;
  activity_name: string;
  completed_at: string;
  details: any;
}

const Progress = () => {
  const { toast } = useToast();

  const { data: progressData, isLoading } = useQuery({
    queryKey: ['progress'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('progress')
        .select('*')
        .order('completed_at', { ascending: false });

      if (error) {
        toast({
          title: "Error fetching progress",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      return data as ProgressEntry[];
    },
  });

  const calculateProgress = (type: string) => {
    if (!progressData) return 0;
    const typeEntries = progressData.filter(entry => entry.activity_type === type).length;
    const targetPerType = 10; // Example target
    return Math.min((typeEntries / targetPerType) * 100, 100);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gradient">Progress Tracking</h1>
          <p className="text-spark-text-light text-lg max-w-2xl mx-auto">
            Monitor your relationship growth and celebrate your achievements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="glass-card hover-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Activity Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date Activities</label>
                <ProgressBar value={calculateProgress('date')} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Chemistry Experiments</label>
                <ProgressBar value={calculateProgress('chemistry')} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Conversations</label>
                <ProgressBar value={calculateProgress('conversation')} />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {progressData && progressData.slice(0, 5).map((entry, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                    <Target className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-medium">{entry.activity_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(entry.completed_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                {(!progressData || progressData.length === 0) && (
                  <p className="text-center text-muted-foreground">
                    No activities completed yet. Start your journey!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Progress;