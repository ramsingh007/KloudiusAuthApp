import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { loginApi, signupApi, User } from '../api/auth';
import { getUser, saveUser, clearUser } from '../storage/storage';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const stored = await getUser();
      if (stored) setUser(stored);
      setLoading(false);
    })();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true); setError(null);
    try {
      const u = await loginApi(email, password);
      console.log("Login attempt:", { email, password });

      setUser(u);
      await saveUser(u);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true); setError(null);
    try {
      const u = await signupApi(name, email, password);
      setUser(u);
      await saveUser(u);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    await clearUser();
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
