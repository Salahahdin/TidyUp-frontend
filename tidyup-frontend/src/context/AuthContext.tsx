import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { LoginPayload, User } from '../types/user';
import { getMe, login as loginRequest, logout as logoutRequest } from '../api/userApi';

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  refreshMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = Boolean(user);
  const isAdmin = user?.role === 'ADMIN';

  const refreshMe = useCallback(async () => {
    try {
      const me = await getMe();
      setUser(me);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      await loginRequest(payload);
      // Po zalogowaniu ciasteczko jest ustawione, pobieramy dane usera
      await refreshMe();
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }, [refreshMe]);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      setUser(null);
    }
  }, []);

  // Sprawdzamy sesję przy starcie aplikacji
  useEffect(() => {
    void refreshMe();
  }, [refreshMe]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated,
      isAdmin,
      isLoading,
      login,
      logout,
      refreshMe,
    }),
    [user, isAuthenticated, isAdmin, isLoading, login, logout, refreshMe]
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
