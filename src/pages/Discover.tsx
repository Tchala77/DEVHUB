import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../services/authService';
import { getProjects } from '../services/projectService';
import { User } from '../types/User';

export default function Discover() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [techFilter, setTechFilter] = useState<string[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getAllUsers();
    setUsers(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    const allProjects = getProjects();
    let result = users;

    if (search) {
      const term = search.toLowerCase();
      result = result.filter(u =>
        u.name.toLowerCase().includes(term) ||
        (u.title?.toLowerCase().includes(term)) ||
        allProjects.some(p => p.userId === u.id && p.technologies.some(t => t.toLowerCase().includes(term)))
      );
    }

    if (techFilter.length > 0) {
      result = result.filter(u =>
        allProjects.some(p => p.userId === u.id && p.technologies.some(t => techFilter.includes(t)))
      );
    }

    setFiltered(result);
  }, [search, techFilter, users]);

  const allTechs = Array.from(new Set(getProjects().flatMap(p => p.technologies)));

  if (loading) return <p>Carregando...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Descobrir Desenvolvedores</h1>
      <input
        type="text"
        placeholder="Buscar por nome, tecnologia ou título"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
      />
      <div style={{ marginBottom: '1rem' }}>
        {allTechs.map(tech => (
          <label key={tech} style={{ marginRight: '1rem' }}>
            <input
              type="checkbox"
              value={tech}
              onChange={e => {
                if (e.target.checked) {
                  setTechFilter([...techFilter, tech]);
                } else {
                  setTechFilter(techFilter.filter(t => t !== tech));
                }
              }}
            /> {tech}
          </label>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
        {filtered.map(u => (
          <div key={u.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
            <img src={u.photo || 'https://via.placeholder.com/100'} alt={u.name} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
            <h3>{u.name}</h3>
            <p>{u.title || 'Desenvolvedor'}</p>
            <Link to={`/portfolio/${u.id}`}><button>Ver Portfólio</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
}