import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getUserFavorites, addFavorite, removeFavorite, isFavorite, Favorite } from '../services/favoritesService';
import { getProjects } from '../services/projectService';
import { Project } from '../types/Project';

interface FavoritesContextType {
  favorites: Favorite[];
  favoriteProjects: Project[];
  toggleFavorite: (projectId: string) => void;
  isFavorite: (projectId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [favoriteProjects, setFavoriteProjects] = useState<Project[]>([]);

  const refresh = () => {
    if (!user) {
      setFavorites([]);
      setFavoriteProjects([]);
      return;
    }
    const favs = getUserFavorites(user.id);
    setFavorites(favs);
    const allProjects = getProjects();
    const projs = allProjects.filter(p => favs.some(f => f.projectId === p.id));
    setFavoriteProjects(projs);
  };

  useEffect(() => { refresh(); }, [user]);

  const toggleFavorite = (projectId: string) => {
    if (!user) {
      alert('Faça login para favoritar');
      return;
    }
    if (isFavorite(projectId, user.id)) {
      removeFavorite(projectId, user.id);
    } else {
      addFavorite(projectId, user.id);
    }
    refresh();
  };

  const checkIsFavorite = (projectId: string): boolean => {
    if (!user) return false;
    return isFavorite(projectId, user.id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, favoriteProjects, toggleFavorite, isFavorite: checkIsFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
};