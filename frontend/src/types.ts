export type InsightType = 'productivity' | 'platform' | 'goal';

export interface Insight {
  title: string;
  description: string;
  type: InsightType;
}

export interface CreatorProfile {
  id?: string;
  display_name: string;
  bio: string;
  country?: string;
  primary_platform?: string;
  niche: string;
  avatar_url?: string;
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  targetDate?: string;
  progress?: number;
  status: string;
  priority?: string;
  creator_id?: string;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: 'todo' | 'in progress' | 'done';
  goalId: string;
}

export interface Platform {
  id: string;
  name: string;
  username: string;
  connected: boolean;
  followers: number;
  views: number;
  engagement: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  created_at?: string;
  updated_at?: string;
}
