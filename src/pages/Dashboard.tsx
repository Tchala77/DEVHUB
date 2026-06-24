import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProjects } from '../contexts/ProjectContext';
import ProjectCard from '../components/ProjectCard';
import { useState, useEffect } from 'react';
import { Project } from '../types/Project';

export default function Dashboard() {
  const { user } = useAuth();
  const { getUserProjects } = useProjects();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = () => {
    const data = getUserProjects();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => { loadProjects(); }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Bem-vindo, {user?.name}</h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <Link to="/profile/edit"><button>Editar Perfil</button></Link>
        <Link to="/projects"><button>Gerenciar Projetos</button></Link>
        <Link to="/favorites"><button>Favoritos</button></Link>
      </div>
      <h3>Meus Projetos</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {projects.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            onEdit={() => navigate(`/projects/${p.id}/edit`)}
            onDelete={() => {}}
            showActions
          />
        ))}
      </div>
    </div>
  );
}