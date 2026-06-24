export type ProjectStatus = 'Em Progresso' | 'Concluído' | 'Planejado';

export interface Project {
  id: string;
  userId: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl: string;
  completedDate?: string;
  status: ProjectStatus;
  createdAt: string;
}