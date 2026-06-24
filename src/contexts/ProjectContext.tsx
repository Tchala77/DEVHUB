import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project } from '../types/Project';
import { getProjects, addProject, updateProject, deleteProject, getProjectsByUser } from '../services/projectService';
import { useAuth } from './AuthContext';

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getUserProjects: () => Project[];
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { user } = useAuth();

  const refresh = () => {
    setProjects(getProjects());
  };

  useEffect(() => { refresh(); }, []);

  const handleAdd = (project: Project) => {
    addProject(project);
    refresh();
  };

  const handleUpdate = (id: string, updates: Partial<Project>) => {
    updateProject(id, updates);
    refresh();
  };

  const handleDelete = (id: string) => {
    deleteProject(id);
    refresh();
  };

  const getUserProjects = (): Project[] => {
    if (!user) return [];
    return getProjectsByUser(user.id);
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject: handleAdd, updateProject: handleUpdate, deleteProject: handleDelete, getUserProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error('useProjects must be used within ProjectProvider');
  return ctx;
};