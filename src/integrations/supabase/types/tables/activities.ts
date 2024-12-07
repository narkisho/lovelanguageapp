export interface ActivityTables {
  closer_kit_activities: {
    Row: {
      category: string
      completed: boolean | null
      created_at: string
      description: string
      id: string
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
      id?: string
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
      id?: string
      reflection_notes?: string | null
      stage?: string
      title?: string
      updated_at?: string
      user_id?: string
    }
    Relationships: []
  }
}