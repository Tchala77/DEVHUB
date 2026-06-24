import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import ProjectCard from '../components/ProjectCard';
import { useProjects } from '../contexts/ProjectContext';
import { useState, useEffect } from 'react';
import { Project } from '../types/Project';

export default function Favorites() {
  const { favoriteProjects } = useFavorites();
  const { deleteProject } = useProjects();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(favoriteProjects);
  }, [favoriteProjects]);

  const handleDelete = (id: string) => {
    deleteProject(id);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Meus Favoritos</h2>
      {projects.length === 0 && <p>Você não tem favoritos ainda.</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {projects.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            onEdit={() => navigate(`/projects/${p.id}/edit`)}
            onDelete={() => handleDelete(p.id)}
            showActions
          />
        ))}
      </div>
    </div>
  );
}