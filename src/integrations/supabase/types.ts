export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_conversations: {
        Row: {
          answer: string
          created_at: string
          id: string
          question: string
          user_id: string
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          question: string
          user_id: string
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          question?: string
          user_id?: string
        }
        Relationships: []
      }
      closer_kit_activities: {
        Row: {
          category: string
          completed: boolean | null
          created_at: string
          description: string
          difficulty_level: number
          duration: number | null
          id: string
          is_favorite: boolean
          location: string | null
          partner_roles: Json | null
          reflection_notes: string | null
          stage: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          completed?: boolean | null
          created_at?: string
          description: string
          difficulty_level?: number
          duration?: number | null
          id?: string
          is_favorite?: boolean
          location?: string | null
          partner_roles?: Json | null
          reflection_notes?: string | null
          stage: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          completed?: boolean | null
          created_at?: string
          description?: string
          difficulty_level?: number
          duration?: number | null
          id?: string
          is_favorite?: boolean
          location?: string | null
          partner_roles?: Json | null
          reflection_notes?: string | null
          stage?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      closer_kit_preferences: {
        Row: {
          activity_duration: number
          created_at: string
          id: string
          level_of_romance: string
          location: string
          relationship_level: string
          updated_at: string
          user_id: string
        }
        Insert: {
          activity_duration: number
          created_at?: string
          id?: string
          level_of_romance?: string
          location: string
          relationship_level: string
          updated_at?: string
          user_id: string
        }
        Update: {
          activity_duration?: number
          created_at?: string
          id?: string
          level_of_romance?: string
          location?: string
          relationship_level?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      community_topics: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_admin_only: boolean
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_admin_only?: boolean
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_admin_only?: boolean
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          content: string
          created_at: string
          id: string
          mood: string | null
          relationship_id: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          mood?: string | null
          relationship_id?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          mood?: string | null
          relationship_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "journal_entries_relationship_id_fkey"
            columns: ["relationship_id"]
            isOneToOne: false
            referencedRelation: "relationships"
            referencedColumns: ["id"]
          },
        ]
      }
      love_language_results: {
        Row: {
          acts_of_service: number | null
          created_at: string | null
          id: string
          physical_touch: number | null
          primary_language: string | null
          quality_time: number | null
          receiving_gifts: number | null
          user_id: string
          words_of_affirmation: number | null
        }
        Insert: {
          acts_of_service?: number | null
          created_at?: string | null
          id?: string
          physical_touch?: number | null
          primary_language?: string | null
          quality_time?: number | null
          receiving_gifts?: number | null
          user_id: string
          words_of_affirmation?: number | null
        }
        Update: {
          acts_of_service?: number | null
          created_at?: string | null
          id?: string
          physical_touch?: number | null
          primary_language?: string | null
          quality_time?: number | null
          receiving_gifts?: number | null
          user_id?: string
          words_of_affirmation?: number | null
        }
        Relationships: []
      }
      meeting_plans: {
        Row: {
          attendees: Json | null
          created_at: string
          id: string
          location: string | null
          meeting_date: string | null
          notes: string | null
          relationship_id: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          attendees?: Json | null
          created_at?: string
          id?: string
          location?: string | null
          meeting_date?: string | null
          notes?: string | null
          relationship_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          attendees?: Json | null
          created_at?: string
          id?: string
          location?: string | null
          meeting_date?: string | null
          notes?: string | null
          relationship_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "meeting_plans_relationship_id_fkey"
            columns: ["relationship_id"]
            isOneToOne: false
            referencedRelation: "relationships"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          username?: string | null
        }
        Relationships: []
      }
      progress: {
        Row: {
          activity_name: string
          activity_type: string
          completed_at: string | null
          details: Json | null
          id: string
          user_id: string
        }
        Insert: {
          activity_name: string
          activity_type: string
          completed_at?: string | null
          details?: Json | null
          id?: string
          user_id: string
        }
        Update: {
          activity_name?: string
          activity_type?: string
          completed_at?: string | null
          details?: Json | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      relationships: {
        Row: {
          created_at: string
          id: string
          partner_name: string
          relationship_status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          partner_name: string
          relationship_status: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          partner_name?: string
          relationship_status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          paypal_subscription_id: string | null
          plan_type: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          paypal_subscription_id?: string | null
          plan_type: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          paypal_subscription_id?: string | null
          plan_type?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      valia_results: {
        Row: {
          core_values: Json
          created_at: string
          deal_breakers: Json
          id: string
          must_haves: Json
          nice_to_haves: Json
          reflection_notes: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          core_values?: Json
          created_at?: string
          deal_breakers?: Json
          id?: string
          must_haves?: Json
          nice_to_haves?: Json
          reflection_notes?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          core_values?: Json
          created_at?: string
          deal_breakers?: Json
          id?: string
          must_haves?: Json
          nice_to_haves?: Json
          reflection_notes?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      vision_boards: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_shared: boolean | null
          relationship_id: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_shared?: boolean | null
          relationship_id?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_shared?: boolean | null
          relationship_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vision_boards_relationship_id_fkey"
            columns: ["relationship_id"]
            isOneToOne: false
            referencedRelation: "relationships"
            referencedColumns: ["id"]
          },
        ]
      }
      vision_check_ins: {
        Row: {
          content: string
          created_at: string
          id: string
          mood: string | null
          user_id: string
          vision_board_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          mood?: string | null
          user_id: string
          vision_board_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          mood?: string | null
          user_id?: string
          vision_board_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vision_check_ins_vision_board_id_fkey"
            columns: ["vision_board_id"]
            isOneToOne: false
            referencedRelation: "vision_boards"
            referencedColumns: ["id"]
          },
        ]
      }
      vision_items: {
        Row: {
          category: string
          content: string
          created_at: string
          id: string
          status: string | null
          timeline: string | null
          updated_at: string
          vision_board_id: string | null
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          id?: string
          status?: string | null
          timeline?: string | null
          updated_at?: string
          vision_board_id?: string | null
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          id?: string
          status?: string | null
          timeline?: string | null
          updated_at?: string
          vision_board_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vision_items_vision_board_id_fkey"
            columns: ["vision_board_id"]
            isOneToOne: false
            referencedRelation: "vision_boards"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
