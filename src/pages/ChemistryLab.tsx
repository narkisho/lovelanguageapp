import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FlaskConical, Beaker } from "lucide-react";

const ChemistryLab = () => {
  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gradient">Chemistry Lab</h1>
          <p className="text-spark-text-light text-lg max-w-2xl mx-auto">
            Strengthen your bond through interactive scenarios and experiments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="glass-card hover-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="w-5 h-5" />
                Interactive Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-spark-text-light">
                Explore various relationship scenarios and learn how to handle them together.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Beaker className="w-5 h-5" />
                Romantic Experiments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-spark-text-light">
                Try out fun and engaging activities designed to bring you closer.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChemistryLab;