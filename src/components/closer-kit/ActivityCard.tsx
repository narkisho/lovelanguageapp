import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Star, Users } from "lucide-react";
import { Activity } from "@/types/closer-kit";

interface ActivityCardProps {
  activity: Activity;
  onToggleComplete: (id: string, completed: boolean) => void;
  onToggleFavorite: (id: string, isFavorite: boolean) => void;
}

export function ActivityCard({ activity, onToggleComplete, onToggleFavorite }: ActivityCardProps) {
  return (
    <Card key={activity.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <span>{activity.title}</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleFavorite(activity.id, activity.is_favorite)}
            >
              <Star
                className={`h-5 w-5 ${
                  activity.is_favorite ? "text-yellow-400 fill-yellow-400" : ""
                }`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleComplete(activity.id, activity.completed || false)}
            >
              <CheckCircle
                className={`h-5 w-5 ${
                  activity.completed ? "text-green-500 fill-green-500" : ""
                }`}
              />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="prose prose-sm max-w-none">
            <p className="text-spark-text-light mb-4">{activity.description}</p>
            
            {activity.partner_roles && (
              <div className="space-y-4 mt-4">
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">{activity.partner_roles.partner1.title}</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {activity.partner_roles.partner1.tasks.map((task, index) => (
                      <li key={index} className="text-spark-text-light">{task}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">{activity.partner_roles.partner2.title}</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {activity.partner_roles.partner2.tasks.map((task, index) => (
                      <li key={index} className="text-spark-text-light">{task}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-spark-text-light">
            {activity.duration && (
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {activity.duration} minutes
              </span>
            )}
            <span>Difficulty: {activity.difficulty_level}/5</span>
            <span>Category: {activity.category}</span>
            {activity.location && <span>Location: {activity.location}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}