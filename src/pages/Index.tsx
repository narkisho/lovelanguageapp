import { Card } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { Calendar, MessageSquare, Beaker, BarChart } from "lucide-react";

const features = [
  {
    title: "Date Generator",
    description: "Get personalized date ideas based on your preferences",
    icon: Calendar,
    color: "bg-spark-rose",
  },
  {
    title: "Chemistry Lab",
    description: "Interactive scenarios to strengthen your bond",
    icon: Beaker,
    color: "bg-spark-lavender",
  },
  {
    title: "Conversation Hub",
    description: "Meaningful topics to deepen your connection",
    icon: MessageSquare,
    color: "bg-spark-sage",
  },
  {
    title: "Progress Tracking",
    description: "Monitor your relationship growth journey",
    icon: BarChart,
    color: "bg-spark-rose",
  },
];

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gradient">Welcome to SparkRevive</h1>
          <p className="text-spark-text-light text-lg max-w-2xl mx-auto">
            Rediscover the magic in your relationship with personalized experiences,
            meaningful conversations, and thoughtful activities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="glass-card hover-card p-6">
              <div className="flex items-start gap-4">
                <div className={`${feature.color} p-3 rounded-lg`}>
                  <feature.icon className="w-6 h-6 text-spark-text" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-spark-text mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-spark-text-light">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default Index;