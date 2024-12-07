import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { TrendingUp, BarChart } from "lucide-react";

const Progress = () => {
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
                Growth Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Connection Strength</label>
                <ProgressBar value={75} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Activities Completed</label>
                <ProgressBar value={60} />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="w-5 h-5" />
                Weekly Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-spark-text-light">
                View detailed statistics and insights about your relationship journey.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Progress;