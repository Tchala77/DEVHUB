import { User } from '../types/User';
import { getItem, setItem } from './storageService';

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

export const getUsers = (): User[] => {
  return getItem<User[]>(USERS_KEY, []);
};

export const register = (name: string, email: string, password: string): User => {
  const users = getUsers();
  if (users.find(u => u.email === email)) {
    throw new Error('Email já cadastrado');
  }
  const newUser: User = {
    id: Date.now(),
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  setItem(USERS_KEY, users);
  return newUser;
};

export const login = (email: string, password: string): { token: string; userId: number } => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    throw new Error('Email ou senha incorretos');
  }
  const token = btoa(`${user.id}:${Date.now()}`);
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  setItem(CURRENT_USER_KEY, { token, userId: user.id, expiresAt });
  return { token, userId: user.id };
};

export const logout = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): { token: string; userId: number; expiresAt: string } | null => {
  const data = getItem(CURRENT_USER_KEY, null);
  if (data && new Date(data.expiresAt) > new Date()) {
    return data;
  }
  logout();
  return null;
};

export const updateUser = (userId: number, updates: Partial<User>): User => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index === -1) {
    throw new Error('Usuário não encontrado');
  }
  users[index] = { ...users[index], ...updates };
  setItem(USERS_KEY, users);
  return users[index];
};

export const getUserById = (id: number): User | undefined => {
  return getUsers().find(u => u.id === id);
};

export const getAllUsers = (): User[] => {
  return getUsers();
};