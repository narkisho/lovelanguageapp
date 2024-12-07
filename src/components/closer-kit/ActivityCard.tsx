import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface Activity {
  id: string;
  title: string;
  description: string;
  category: string;
  stage: string;
  completed: boolean;
  reflection_notes: string | null;
}

interface ActivityCardProps {
  activity: Activity;
  onToggleComplete: (id: string, completed: boolean) => Promise<void>;
}

export function ActivityCard({ activity, onToggleComplete }: ActivityCardProps) {
  return (
    <Card key={activity.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{activity.title}</CardTitle>
            <CardDescription>Stage: {activity.stage}</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleComplete(activity.id, !activity.completed)}
          >
            {activity.completed ? 'Completed' : 'Mark Complete'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-spark-text-light mb-4">{activity.description}</p>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            Add Reflection
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}