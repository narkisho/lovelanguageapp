import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PreferencesFormData {
  relationship_stage: string;
  communication_style: string;
  comfort_level: number;
  physical_considerations: string[];
  cultural_considerations: string[];
}

export function PreferencesForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<PreferencesFormData>();

  const onSubmit = async (data: PreferencesFormData) => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from('closer_kit_preferences')
        .upsert({
          user_id: user.id,
          ...data,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      toast.success("Preferences saved successfully!");
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
          name="relationship_stage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relationship Stage</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="new">New Relationship</SelectItem>
                  <SelectItem value="established">Established</SelectItem>
                  <SelectItem value="committed">Committed</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="communication_style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Communication Style</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="direct">Direct</SelectItem>
                  <SelectItem value="indirect">Indirect</SelectItem>
                  <SelectItem value="emotional">Emotional</SelectItem>
                  <SelectItem value="analytical">Analytical</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comfort_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comfort Level with Activities (1-5)</FormLabel>
              <FormControl>
                <Input type="number" min="1" max="5" {...field} />
              </FormControl>
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