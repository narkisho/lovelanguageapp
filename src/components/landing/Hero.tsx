import { Button } from "@/components/ui/button";

interface HeroProps {
  onGetStarted: () => void;
  achievementUnlocked: boolean;
}

export function Hero({ onGetStarted, achievementUnlocked }: HeroProps) {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center space-y-8 animate-fade-in">
        <div className="relative inline-block">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Welcome to <span className="text-gradient">SparkRevive</span>
          </h1>
          {achievementUnlocked && (
            <div className="absolute -top-8 right-0 transform rotate-12 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold animate-bounce">
              +100 XP
            </div>
          )}
        </div>
        <p className="text-spark-text-light text-xl md:text-2xl max-w-3xl mx-auto">
          Level up your relationship with personalized experiences, meaningful conversations,
          and thoughtful activities. Start your journey today!
        </p>
        <Button 
          size="lg" 
          className="animate-float text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          onClick={onGetStarted}
        >
          Begin Your Adventure
        </Button>
      </div>
    </div>
  );
}