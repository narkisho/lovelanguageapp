import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Heart } from "lucide-react";

const ConversationHub = () => {
  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gradient">Conversation Hub</h1>
          <p className="text-spark-text-light text-lg max-w-2xl mx-auto">
            Discover meaningful topics and deepen your connection through conversation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="glass-card hover-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Daily Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-spark-text-light">
                Fresh conversation starters and discussion topics updated daily.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Deep Connection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-spark-text-light">
                Guided exercises to help you understand each other better.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ConversationHub;