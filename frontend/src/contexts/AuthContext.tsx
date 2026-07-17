import React, { createContext, useEffect, useMemo, useState } from 'react';
import { api, setAuthToken, LoginRequest, RegisterRequest } from '../api/api';
import { User } from '../types';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = 'tartua_auth';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { token: string; user: User };
        setToken(parsed.token);
        setUser(parsed.user);
        setAuthToken(parsed.token);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const login = async (credentials: LoginRequest) => {
    const response = await api.login(credentials);
    setToken(response.token);
    setUser(response.user);
    setAuthToken(response.token);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: response.token, user: response.user }));
  };

  const register = async (payload: RegisterRequest) => {
    await api.register(payload);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setAuthToken(null);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};
