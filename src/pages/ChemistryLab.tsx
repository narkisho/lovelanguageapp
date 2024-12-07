import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FlaskConical, Beaker, Heart, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Scenario {
  title: string;
  description: string;
  options: string[];
}

interface Experiment {
  title: string;
  description: string;
  duration: string;
  materials: string[];
}

const ChemistryLab = () => {
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [selectedExperiment, setSelectedExperiment] = useState<number | null>(null);
  const [isLoadingScenario, setIsLoadingScenario] = useState(false);
  const [isLoadingExperiment, setIsLoadingExperiment] = useState(false);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [currentExperiment, setCurrentExperiment] = useState<Experiment | null>(null);

  const generateNewScenario = async () => {
    setIsLoadingScenario(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-chemistry-content', {
        body: { type: 'scenario' }
      });
      
      if (error) throw error;
      setCurrentScenario(data);
      toast.success("New scenario generated!");
    } catch (error) {
      console.error('Error generating scenario:', error);
      toast.error("Failed to generate new scenario");
    } finally {
      setIsLoadingScenario(false);
    }
  };

  const generateNewExperiment = async () => {
    setIsLoadingExperiment(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-chemistry-content', {
        body: { type: 'experiment' }
      });
      
      if (error) throw error;
      setCurrentExperiment(data);
      toast.success("New experiment generated!");
    } catch (error) {
      console.error('Error generating experiment:', error);
      toast.error("Failed to generate new experiment");
    } finally {
      setIsLoadingExperiment(false);
    }
  };

  const handleScenarioOption = (option: string) => {
    toast.success("Great choice! This response shows emotional intelligence and consideration.", {
      description: "Keep practicing these scenarios to strengthen your relationship.",
    });
    setSelectedScenario(null);
  };

  const handleStartExperiment = (id: number) => {
    setSelectedExperiment(id);
    toast.success("Experiment started! 🧪", {
      description: "Follow the instructions and enjoy this bonding activity together.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gradient">Chemistry Lab</h1>
          <p className="text-spark-text-light text-lg max-w-2xl mx-auto">
            Strengthen your bond through interactive scenarios and experiments.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Interactive Scenarios Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <FlaskConical className="w-6 h-6 text-primary" />
                Interactive Scenarios
              </h2>
              <Button
                onClick={generateNewScenario}
                disabled={isLoadingScenario}
                variant="outline"
              >
                {isLoadingScenario ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                ) : (
                  <>Generate New Scenario</>
                )}
              </Button>
            </div>
            
            {currentScenario && (
              <Card className="glass-card hover-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    {currentScenario.title}
                  </CardTitle>
                  <CardDescription>{currentScenario.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 animate-fade-in">
                    {currentScenario.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full text-left justify-start"
                        onClick={() => handleScenarioOption(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Romantic Experiments Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Beaker className="w-6 h-6 text-primary" />
                Romantic Experiments
              </h2>
              <Button
                onClick={generateNewExperiment}
                disabled={isLoadingExperiment}
                variant="outline"
              >
                {isLoadingExperiment ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                ) : (
                  <>Generate New Experiment</>
                )}
              </Button>
            </div>
            
            {currentExperiment && (
              <Card className="glass-card hover-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    {currentExperiment.title}
                  </CardTitle>
                  <CardDescription>{currentExperiment.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-white/10 space-y-2">
                      <p className="text-sm text-spark-text-light">
                        <strong>Duration:</strong> {currentExperiment.duration}
                      </p>
                      <div className="text-sm text-spark-text-light">
                        <strong>Materials needed:</strong>
                        <ul className="list-disc list-inside mt-2">
                          {currentExperiment.materials.map((material, index) => (
                            <li key={index}>{material}</li>
                          ))}
                        </ul>
                      </div>
                      <Button 
                        onClick={() => handleStartExperiment(1)}
                        className="w-full mt-4"
                      >
                        Start Experiment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChemistryLab;