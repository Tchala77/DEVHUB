import { getItem, setItem } from './storageService';

const FAVORITES_KEY = 'favorites';

export interface Favorite {
  projectId: string;
  userId: number;
}

export const getFavorites = (): Favorite[] => {
  return getItem<Favorite[]>(FAVORITES_KEY, []);
};

export const addFavorite = (projectId: string, userId: number): void => {
  const favs = getFavorites();
  if (!favs.some(f => f.projectId === projectId && f.userId === userId)) {
    favs.push({ projectId, userId });
    setItem(FAVORITES_KEY, favs);
  }
};

export const removeFavorite = (projectId: string, userId: number): void => {
  const favs = getFavorites();
  setItem(FAVORITES_KEY, favs.filter(f => !(f.projectId === projectId && f.userId === userId)));
};

export const isFavorite = (projectId: string, userId: number): boolean => {
  return getFavorites().some(f => f.projectId === projectId && f.userId === userId);
};

export const getUserFavorites = (userId: number): Favorite[] => {
  return getFavorites().filter(f => f.userId === userId);
};