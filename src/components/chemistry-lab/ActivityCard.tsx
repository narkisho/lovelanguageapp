import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityCardProps {
  activity: {
    title: string;
    description: string;
    options?: string[];
  };
}

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{activity.title}</CardTitle>
        <CardDescription>Follow the instructions below</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{activity.description}</p>
        {activity.options && (
          <div className="space-y-2">
            <h4 className="font-medium">Response Options:</h4>
            <ul className="list-disc pl-4 space-y-1">
              {activity.options.map((option, index) => (
                <li key={index} className="text-sm">{option}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}