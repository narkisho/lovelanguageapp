import { 
  Calendar, 
  MessageSquare, 
  Beaker, 
  BarChart, 
  Heart, 
  Languages, 
  Target, 
  Scale, 
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "30-Day Revival Program",
    description: "Embark on a personalized journey to rekindle your relationship",
    icon: Heart,
    color: "bg-spark-rose",
    animation: "hover:rotate-12",
  },
  {
    title: "Date Generator",
    description: "Get AI-powered date ideas perfectly matched to your preferences",
    icon: Calendar,
    color: "bg-spark-lavender",
    animation: "hover:-rotate-12",
  },
  {
    title: "Chemistry Lab",
    description: "Explore interactive scenarios to strengthen your bond",
    icon: Beaker,
    color: "bg-spark-sage",
    animation: "hover:scale-110",
  },
  {
    title: "Conversation Hub",
    description: "Discover thoughtful topics that spark meaningful discussions",
    icon: MessageSquare,
    color: "bg-spark-rose",
    animation: "hover:translate-y-[-8px]",
  },
  {
    title: "Activity Tracking",
    description: "Monitor your relationship growth with intuitive metrics",
    icon: BarChart,
    color: "bg-spark-lavender",
    animation: "hover:rotate-12",
  },
  {
    title: "Progress Tracking",
    description: "Track your journey and celebrate relationship milestones",
    icon: Heart,
    color: "bg-spark-sage",
    animation: "hover:-rotate-12",
  },
  {
    title: "Love Language Quiz",
    description: "Understand how you and your partner express affection",
    icon: Languages,
    color: "bg-spark-rose",
    animation: "hover:scale-110",
  },
  {
    title: "Vision Quest",
    description: "Create and share your relationship goals and dreams",
    icon: Target,
    color: "bg-spark-lavender",
    animation: "hover:translate-y-[-8px]",
  },
  {
    title: "Ask Spark Revive",
    description: "Get personalized advice from our AI relationship expert",
    icon: Sparkles,
    color: "bg-spark-sage",
    animation: "hover:rotate-12",
  },
];

export function Features({ onFeatureClick }: { onFeatureClick: () => void }) {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 lg:py-24">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-16 text-gradient">
        Unlock New Relationship Powers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {features.map((feature, index) => (
          <Card 
            key={feature.title} 
            className={`glass-card hover-card p-4 md:p-6 animate-fade-in cursor-pointer transform transition-all duration-300 ${feature.animation}`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={onFeatureClick}
          >
            <div className="flex items-start gap-3 md:gap-4">
              <div className={`${feature.color} p-2 md:p-3 rounded-lg`}>
                <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-spark-text" />
              </div>
              <div className="space-y-1 md:space-y-2">
                <h3 className="text-lg md:text-xl font-semibold text-spark-text">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-spark-text-light">
                  {feature.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}