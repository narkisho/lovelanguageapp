import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vauvoxywtpzuyaeznaif.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhdXZveHl3dHB6dXlhZXpuYWlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1NjU5NDIsImV4cCI6MjA0OTE0MTk0Mn0.BicM3RA_GqV4ZcmC5JQurz6ac36qwKZ9LnVDTUabJZo";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);