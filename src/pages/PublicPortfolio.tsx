import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserById } from '../services/authService';
import { getProjects } from '../services/projectService';
import CommentsSection from '../components/CommentsSection';
import { useFavorites } from '../contexts/FavoritesContext';
import { User } from '../types/User';
import { Project } from '../types/Project';

export default function PublicPortfolio() {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const u = getUserById(Number(userId));
    setUser(u || null);
    if (u) {
      const allProjects = getProjects();
      const projects = allProjects.filter(p =>
        p.userId === Number(userId) && (p.status === 'Concluído' || p.status === 'Em Progresso')
      );
      setUserProjects(projects);
    }
    setLoading(false);
  }, [userId]);

  if (loading) return <p>Carregando portfólio...</p>;
  if (!user) return <p>Usuário não encontrado</p>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
      <div style={{ textAlign: 'center' }}>
        <img src={user.photo || 'https://via.placeholder.com/150'} alt={user.name} style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} />
        <h2>{user.name}</h2>
        <h3>{user.title || 'Desenvolvedor'}</h3>
        <p>{user.bio || ''}</p>
        <div>
          {user.github && <a href={user.github} target="_blank">GitHub</a>}
          {' '}
          {user.linkedin && <a href={user.linkedin} target="_blank">LinkedIn</a>}
        </div>
      </div>
      <h3>Projetos</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {userProjects.map(project => (
          <div key={project.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}>
            <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <h4>{project.title}</h4>
            <p>{project.description}</p>
            <div>
              {project.technologies.map(t => (
                <span key={t} style={{ background: '#eee', margin: '0.25rem', padding: '0.25rem', display: 'inline-block' }}>{t}</span>
              ))}
            </div>
            <button onClick={() => toggleFavorite(project.id)}>
              {isFavorite(project.id) ? '❤️ Favoritado' : '🤍 Favoritar'}
            </button>
            {project.githubUrl && <a href={project.githubUrl} target="_blank">Código</a>}
            {' '}
            {project.liveUrl && <a href={project.liveUrl} target="_blank">Demo</a>}
            <CommentsSection projectId={project.id} />
          </div>
        ))}
      </div>
    </div>
  );
}