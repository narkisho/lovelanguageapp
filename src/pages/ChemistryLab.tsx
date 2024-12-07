import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FlaskConical, Beaker, Heart, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Scenario {
  id: number;
  title: string;
  description: string;
  options: string[];
}

interface Experiment {
  id: number;
  title: string;
  description: string;
  duration: string;
  materials: string[];
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Date Night Surprise",
    description: "Your partner has planned a surprise evening, but you're feeling tired after work. How do you respond?",
    options: [
      "Express gratitude and get excited about their effort",
      "Be honest about your tiredness but suggest a compromise",
      "Ask to postpone for another day"
    ]
  },
  {
    id: 2,
    title: "Communication Challenge",
    description: "You notice your partner seems distant lately. What's your approach?",
    options: [
      "Create a comfortable space for open dialogue",
      "Write them a heartfelt letter",
      "Plan a special activity to reconnect"
    ]
  }
];

const experiments: Experiment[] = [
  {
    id: 1,
    title: "Trust Fall 2.0",
    description: "A modern take on the classic trust-building exercise, designed for couples.",
    duration: "15 minutes",
    materials: ["Comfortable space", "Blindfold", "Soft music"]
  },
  {
    id: 2,
    title: "Memory Time Capsule",
    description: "Create a collection of shared memories and future dreams together.",
    duration: "30 minutes",
    materials: ["Journal", "Photos", "Small mementos", "Decorative box"]
  }
];

const ChemistryLab = () => {
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [selectedExperiment, setSelectedExperiment] = useState<number | null>(null);

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
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FlaskConical className="w-6 h-6 text-primary" />
              Interactive Scenarios
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {scenarios.map((scenario) => (
                <Card key={scenario.id} className="glass-card hover-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      {scenario.title}
                    </CardTitle>
                    <CardDescription>{scenario.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedScenario === scenario.id ? (
                      <div className="space-y-2 animate-fade-in">
                        {scenario.options.map((option, index) => (
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
                    ) : (
                      <Button 
                        onClick={() => setSelectedScenario(scenario.id)}
                        className="w-full"
                      >
                        Explore Scenario
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Romantic Experiments Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Beaker className="w-6 h-6 text-primary" />
              Romantic Experiments
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {experiments.map((experiment) => (
                <Card key={experiment.id} className="glass-card hover-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-primary" />
                      {experiment.title}
                    </CardTitle>
                    <CardDescription>{experiment.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-sm text-spark-text-light">
                        <p><strong>Duration:</strong> {experiment.duration}</p>
                        <p><strong>Materials needed:</strong></p>
                        <ul className="list-disc list-inside">
                          {experiment.materials.map((material, index) => (
                            <li key={index}>{material}</li>
                          ))}
                        </ul>
                      </div>
                      {selectedExperiment === experiment.id ? (
                        <div className="animate-fade-in space-y-2">
                          <p className="text-sm text-spark-text-light">
                            Experiment in progress! Follow the materials list and take your time to connect.
                          </p>
                          <Button 
                            variant="outline"
                            onClick={() => setSelectedExperiment(null)}
                            className="w-full"
                          >
                            End Experiment
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          onClick={() => handleStartExperiment(experiment.id)}
                          className="w-full"
                        >
                          Start Experiment
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChemistryLab;