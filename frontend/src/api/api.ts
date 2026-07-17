import { CreatorProfile, Goal, Insight, Platform, Task, User } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api/v1';
let authToken: string | null = null;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface SaveCreatorProfileRequest {
  display_name: string;
  bio: string;
  country?: string;
  primary_platform?: string;
  niche: string;
  avatar_url?: string;
}

export interface CreateGoalRequest {
  title: string;
  description?: string;
  priority?: string;
  target_date?: string;
}

export interface ConnectPlatformRequest {
  name: string;
  username: string;
}

export function setAuthToken(token: string | null) {
  authToken = token;
}

async function request<T>(path: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers ?? {});
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (authToken) {
    headers.set('Authorization', `Bearer ${authToken}`);
  }

  const url = `${BASE_URL}${path}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const body = await response.json().catch(() => null);

    if (!response.ok) {
      const message = body?.message ?? response.statusText;
      throw new Error(`${response.status} ${message}`);
    }

    if (body && Object.prototype.hasOwnProperty.call(body, 'data')) {
      return body.data as T;
    }

    return body as T;
  } catch (error) {
    console.error(`API request failed: ${url}`, error);
    throw error;
  }
}

export const api = {
  login: (credentials: LoginRequest) => request<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  register: (payload: RegisterRequest) => request<null>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  getCreatorProfile: () => request<CreatorProfile>('/creator/profile'),
  saveCreatorProfile: async (payload: SaveCreatorProfileRequest) => {
    try {
      return await request<CreatorProfile>('/creator/profile', {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
    } catch (error) {
      const err = error as Error;
      if (err.message.startsWith('404')) {
        return request<CreatorProfile>('/creator/profile', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }
      throw error;
    }
  },
  getInsights: () => request<Insight[]>('/dashboard/insights'),
  createGoal: (payload: CreateGoalRequest) => request<null>('/goals', {
    method: 'POST',
    body: JSON.stringify({
      ...payload,
      target_date: payload.target_date ? new Date(payload.target_date).toISOString() : undefined,
    }),
  }),
  getGoals: () => request<Goal[]>('/goals'),
  getTasks: (goalId: string) => request<Task[]>(`/goals/${goalId}/tasks`),
  getPlatforms: () => request<Platform[]>('/platforms'),
  connectPlatform: (payload: ConnectPlatformRequest) => request<null>('/platforms/connect', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
};
