import { useState, useEffect } from 'react';
import { Project } from '../types/Project';
import { useFavorites } from '../contexts/FavoritesContext';

interface ProjectCardProps {
  project: Project;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

export default function ProjectCard({ project, onEdit, onDelete, showActions = true }: ProjectCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setFavorited(isFavorite(project.id));
  }, [project.id, isFavorite]);

  const handleToggle = () => {
    toggleFavorite(project.id);
    setFavorited(isFavorite(project.id));
  };

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', margin: '0.5rem', background: 'white' }}>
      <div style={{
        width: '100%',
        height: '200px',
        background: '#e0e0e0',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666',
        fontSize: '1rem'
      }}>
        📷 {project.title}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>{project.title}</h3>
        <button onClick={handleToggle} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>
          {favorited ? '❤️' : '🤍'}
        </button>
      </div>
      <p>{project.description.substring(0, 150)}...</p>
      <div>
        {project.technologies.map(tech => (
          <span key={tech} style={{ background: '#e0e0e0', padding: '0.2rem 0.5rem', margin: '0.2rem', borderRadius: '4px', display: 'inline-block' }}>
            {tech}
          </span>
        ))}
      </div>
      <p>Status: <strong>{project.status}</strong></p>
      {showActions && (
        <div>
          <button onClick={onEdit}>Editar</button>
          <button onClick={onDelete} style={{ marginLeft: '0.5rem' }}>Deletar</button>
        </div>
      )}
    </div>
  );
}