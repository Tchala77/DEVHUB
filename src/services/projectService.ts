import { Project } from '../types/Project';
import { getItem, setItem } from './storageService';

const PROJECTS_KEY = 'projects';

const initialProjects: Project[] = [
  {
    id: '1',
    userId: 1,
    title: 'Meu Portfólio',
    description: 'Um projeto incrível que mostra meu trabalho.',
    technologies: ['React', 'Vite', 'TypeScript'],
    imageUrl: 'https://via.placeholder.com/300x200?text=Projeto+1',
    status: 'Concluído',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    userId: 1,
    title: 'App de Tarefas',
    description: 'Um gerenciador de tarefas com drag-and-drop.',
    technologies: ['React', 'Tailwind', 'Firebase'],
    imageUrl: 'https://via.placeholder.com/300x200?text=Projeto+2',
    status: 'Em Progresso',
    createdAt: new Date().toISOString(),
  }
];

export const getProjects = (): Project[] => {
  let projects = getItem<Project[]>(PROJECTS_KEY, []);
  if (projects.length === 0) {
    setItem(PROJECTS_KEY, initialProjects);
    projects = initialProjects;
  }
  return projects;
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