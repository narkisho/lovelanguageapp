import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  relationship_level: z.string({
    required_error: "Please select a relationship level",
  }),
  activity_duration: z.string({
    required_error: "Please select an activity duration",
  }),
  location: z.string({
    required_error: "Please select a location preference",
  }),
});

type PreferencesFormData = z.infer<typeof formSchema>;

interface PreferencesFormProps {
  onSaved?: () => void;
}

export function PreferencesForm({ onSaved }: PreferencesFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<PreferencesFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      relationship_level: "",
      activity_duration: "",
      location: "",
    },
  });

  const onSubmit = async (data: PreferencesFormData) => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from('closer_kit_preferences')
        .upsert({
          user_id: user.id,
          relationship_level: data.relationship_level,
          activity_duration: parseInt(data.activity_duration),
          location: data.location,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      toast.success("Preferences saved successfully!");
      onSaved?.();
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error("Failed to save preferences");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="relationship_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relationship Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="new">Just Started Dating</SelectItem>
                  <SelectItem value="dating">Dating (3-12 months)</SelectItem>
                  <SelectItem value="committed">Committed Relationship</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="activity_duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity Duration (minutes)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Preference</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="indoor">Indoor Only</SelectItem>
                  <SelectItem value="outdoor">Outdoor Only</SelectItem>
                  <SelectItem value="both">Both Indoor & Outdoor</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Preferences"}
        </Button>
      </form>
    </Form>
  );
}