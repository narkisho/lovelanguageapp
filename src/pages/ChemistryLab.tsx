import { MainLayout } from "@/components/layout/MainLayout";
import { ActivityForm } from "@/components/chemistry-lab/ActivityForm";
import { ActivityCard } from "@/components/chemistry-lab/ActivityCard";
import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ChemistryLab() {
  const session = useSession();
  const navigate = useNavigate();
  const [generatedActivity, setGeneratedActivity] = useState<any>(null);

  // Redirect if not authenticated
  if (!session) {
    navigate("/");
    return null;
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Chemistry Lab</CardTitle>
            <CardDescription>
              Generate personalized intimacy-building exercises tailored to your relationship stage and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityForm session={session} onActivityGenerated={setGeneratedActivity} />
            {generatedActivity && <ActivityCard activity={generatedActivity} />}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}