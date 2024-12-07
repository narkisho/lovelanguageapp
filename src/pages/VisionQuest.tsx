import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IndividualVisionSpace } from "@/components/vision-quest/IndividualVisionSpace";
import { SharedVisionBoard } from "@/components/vision-quest/SharedVisionBoard";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function VisionQuest() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    navigate("/");
    return null;
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-spark-text">VisionQuest</h1>
            <p className="text-spark-text-light">Shape your future together</p>
          </div>
          <Badge variant="outline" className="bg-spark-lavender">
            Beta
          </Badge>
        </div>

        <Tabs defaultValue="individual" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="individual">Individual Vision</TabsTrigger>
            <TabsTrigger value="shared">Shared Vision</TabsTrigger>
          </TabsList>
          
          <TabsContent value="individual" className="space-y-4">
            <IndividualVisionSpace session={session} />
          </TabsContent>
          
          <TabsContent value="shared" className="space-y-4">
            <SharedVisionBoard session={session} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}