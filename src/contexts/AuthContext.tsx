import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/User';
import { getCurrentUser, login as apiLogin, register as apiRegister, logout as apiLogout, updateUser, getUserById } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const current = getCurrentUser();
    if (current) {
      const found = getUserById(current.userId);
      setUser(found || null);
    }
  }, []);

  const login = (email: string, password: string) => {
    const { userId } = apiLogin(email, password);
    const loggedUser = getUserById(userId);
    if (!loggedUser) throw new Error('Usuário não encontrado');
    setUser(loggedUser);
  };

  const register = (name: string, email: string, password: string) => {
    apiRegister(name, email, password);
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) throw new Error('Não autenticado');
    const updated = updateUser(user.id, updates);
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};