import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { AuthResponse, LoginPayload, User } from '../types/user';
import { getMe, login as loginRequest } from '../api/userApi';

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  refreshMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'token';

function normalizeAuth(auth: AuthResponse | null): { token: string | null; user: User | null } {
  if (!auth?.token) {
    return { token: null, user: null };
  }
  return { token: auth.token, user: auth.user ?? null };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = Boolean(token);
  const isAdmin = user?.role === 'ADMIN';

  const applyAuth = useCallback((auth: AuthResponse | null) => {
    const normalized = normalizeAuth(auth);
    setToken(normalized.token);
    setUser(normalized.user);
    if (normalized.token) {
      localStorage.setItem(TOKEN_KEY, normalized.token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const auth = await loginRequest(payload);
    applyAuth(auth);
    if (!auth.user && auth.token) {
      const me = await getMe();
      setUser(me);
    }
  }, [applyAuth]);

  const logout = useCallback(() => {
    applyAuth(null);
  }, [applyAuth]);

  const refreshMe = useCallback(async () => {
    if (!token) {
      setUser(null);
      return;
    }
    const me = await getMe();
    setUser(me);
  }, [token]);

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }
    void refreshMe();
  }, [refreshMe, token]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated,
      isAdmin,
      login,
      logout,
      refreshMe,
    }),
    [user, token, isAuthenticated, isAdmin, login, logout, refreshMe]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
