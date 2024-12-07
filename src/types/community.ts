export type Topic = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: 'active' | 'archived' | 'deleted';
  is_admin_only: boolean;
  created_at: string;
  updated_at: string;
};

export type Discussion = {
  id: string;
  topic_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};