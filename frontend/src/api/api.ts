import { Goal, Insight, Platform, Task, User } from '../types';

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
  getInsights: () => request<Insight[]>('/dashboard/insights'),
  getGoals: () => request<Goal[]>('/goals'),
  createGoal: (goal: { title: string; description?: string; target_date?: string; priority?: string }) =>
    request<Goal>('/goals', {
      method: 'POST',
      body: JSON.stringify(goal),
    }),
  updateGoal: (goalId: string, goal: Partial<Goal>) =>
    request<Goal>(`/goals/${goalId}`, {
      method: 'PUT',
      body: JSON.stringify(goal),
    }),
  deleteGoal: (goalId: string) =>
    request<null>(`/goals/${goalId}`, { method: 'DELETE' }),
  getTasks: (goalId: string) => request<Task[]>(`/goals/${goalId}/tasks`),
  createTask: (goalId: string, task: { title: string; description?: string; due_date?: string; priority?: string }) =>
    request<Task>(`/goals/${goalId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(task),
    }),
  updateTask: (goalId: string, taskId: string, task: Partial<Task>) =>
    request<Task>(`/goals/${goalId}/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(task),
    }),
  deleteTask: (goalId: string, taskId: string) =>
    request<null>(`/goals/${goalId}/tasks/${taskId}`, { method: 'DELETE' }),
  getPlatforms: () => request<Platform[]>('/platforms'),
  connectPlatform: (platform: string, code: string) =>
    request<Platform>('/platforms/connect', {
      method: 'POST',
      body: JSON.stringify({ platform, code }),
    }),
  disconnectPlatform: (platform: string) =>
    request<null>(`/platforms/${platform}/disconnect`, { method: 'DELETE' }),
  getCreatorProfile: () => request<any>('/creator/profile'),
  createCreatorProfile: (profile: any) =>
    request<any>('/creator/profile', {
      method: 'POST',
      body: JSON.stringify(profile),
    }),
  updateCreatorProfile: (profile: any) =>
    request<any>('/creator/profile', {
      method: 'PUT',
      body: JSON.stringify(profile),
    }),
};
