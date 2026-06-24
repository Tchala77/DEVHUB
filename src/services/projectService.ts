import { Project } from '../types/Project';
import { getItem, setItem } from './storageService';

const PROJECTS_KEY = 'projects';

export const getProjects = (): Project[] => {
  return getItem<Project[]>(PROJECTS_KEY, []);
};

export const addProject = (project: Project): void => {
  const projects = getProjects();
  projects.push(project);
  setItem(PROJECTS_KEY, projects);
};

export const updateProject = (id: string, updates: Partial<Project>): void => {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index !== -1) {
    projects[index] = { ...projects[index], ...updates };
    setItem(PROJECTS_KEY, projects);
  }
};

export const deleteProject = (id: string): void => {
  const projects = getProjects();
  setItem(PROJECTS_KEY, projects.filter(p => p.id !== id));
};

export const getProjectsByUser = (userId: number): Project[] => {
  return getProjects().filter(p => p.userId === userId);
};