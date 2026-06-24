import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProjects } from '../contexts/ProjectContext';
import ProjectCard from '../components/ProjectCard';
import Modal from '../components/Modal';
import { Project } from '../types/Project';

export default function Projects() {
  const { getUserProjects, deleteProject } = useProjects();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProjects = () => {
    const data = getUserProjects();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => { loadProjects(); }, []);

  const confirmDelete = () => {
    if (deletingId) {
      deleteProject(deletingId);
      loadProjects();
      setDeletingId(null);
    }
  };

  if (loading) return <p>Carregando projetos...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Meus Projetos</h2>
        <Link to="/projects/new"><button>+ Novo Projeto</button></Link>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {projects.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            onEdit={() => navigate(`/projects/${p.id}/edit`)}
            onDelete={() => setDeletingId(p.id)}
            showActions
          />
        ))}
      </div>
      <Modal
        isOpen={!!deletingId}
        title="Confirmar exclusão"
        message="Tem certeza que deseja deletar este projeto?"
        onConfirm={confirmDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
}