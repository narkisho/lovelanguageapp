import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ActivityPreferences {
  relationshipStage: string;
  intimacyLevel: string;
  duration: string;
  location: string;
}

interface ActivityFormProps {
  onSubmit: (preferences: ActivityPreferences) => Promise<void>;
  onCancel: () => void;
  generating: boolean;
}

export function ActivityForm({ onSubmit, onCancel, generating }: ActivityFormProps) {
  const [preferences, setPreferences] = useState<ActivityPreferences>({
    relationshipStage: '',
    intimacyLevel: '',
    duration: '',
    location: ''
  });

  const handleSubmit = async () => {
    if (!preferences.relationshipStage || !preferences.intimacyLevel || 
        !preferences.duration || !preferences.location) {
      return; // Don't submit if any field is empty
    }
    await onSubmit(preferences);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Activity Preferences</CardTitle>
        <CardDescription>
          Help us generate the perfect activity for you and your partner
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Relationship Stage</label>
            <Select
              value={preferences.relationshipStage}
              onValueChange={(value) => 
                setPreferences(prev => ({ ...prev, relationshipStage: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your relationship stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="early">Early Dating</SelectItem>
                <SelectItem value="committed">Committed Relationship</SelectItem>
                <SelectItem value="longterm">Long-term Partnership</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Desired Intimacy Level</label>
            <Select
              value={preferences.intimacyLevel}
              onValueChange={(value) => 
                setPreferences(prev => ({ ...prev, intimacyLevel: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select intimacy level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light & Playful</SelectItem>
                <SelectItem value="moderate">Moderate Connection</SelectItem>
                <SelectItem value="deep">Deep Bonding</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Activity Duration</label>
            <Select
              value={preferences.duration}
              onValueChange={(value) => 
                setPreferences(prev => ({ ...prev, duration: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quick">15-30 minutes</SelectItem>
                <SelectItem value="medium">30-60 minutes</SelectItem>
                <SelectItem value="extended">1+ hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Preferred Location</label>
            <Select
              value={preferences.location}
              onValueChange={(value) => 
                setPreferences(prev => ({ ...prev, location: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="indoor">Indoor</SelectItem>
                <SelectItem value="outdoor">Outdoor</SelectItem>
                <SelectItem value="any">Any Location</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              onClick={handleSubmit}
              disabled={generating || !preferences.relationshipStage || 
                !preferences.intimacyLevel || !preferences.duration || 
                !preferences.location}
              className="w-full"
            >
              {generating ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
              ) : (
                <>Generate Activity</>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={onCancel}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}