export interface ConversationTables {
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
}