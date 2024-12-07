import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PreferencesForm } from "@/components/closer-kit/PreferencesForm";
import { ActivityList } from "@/components/closer-kit/ActivityList";
import { ActivityForm } from "@/components/closer-kit/ActivityForm";
import { FlaskConical, ListChecks, Settings } from "lucide-react";

const CloserKit = () => {
  const [activeTab, setActiveTab] = useState("activities");

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gradient">CloserKit</h1>
          <p className="text-spark-text-light text-lg max-w-2xl mx-auto">
            Build deeper connections through personalized relationship exercises
          </p>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="text-primary" />
              Relationship Building Lab
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="activities">
                  <ListChecks className="w-4 h-4 mr-2" />
                  Activities
                </TabsTrigger>
                <TabsTrigger value="new">
                  <FlaskConical className="w-4 h-4 mr-2" />
                  Generate New
                </TabsTrigger>
                <TabsTrigger value="preferences">
                  <Settings className="w-4 h-4 mr-2" />
                  Preferences
                </TabsTrigger>
              </TabsList>

              <TabsContent value="activities" className="mt-4">
                <ActivityList />
              </TabsContent>

              <TabsContent value="new" className="mt-4">
                <ActivityForm />
              </TabsContent>

              <TabsContent value="preferences" className="mt-4">
                <PreferencesForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CloserKit;