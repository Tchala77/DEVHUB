import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Project, ProjectStatus } from '../types/Project';
import { useAuth } from '../contexts/AuthContext';
import { useProjects } from '../contexts/ProjectContext';

export default function ProjectForm() {
  const { id } = useParams();
  const { user } = useAuth();
  const { projects, addProject, updateProject } = useProjects();
  const navigate = useNavigate();
  const editingProject = id ? projects.find((p) => p.id === id) : null;

  const [title, setTitle] = useState(editingProject?.title || '');
  const [description, setDescription] = useState(editingProject?.description || '');
  const [technologies, setTechnologies] = useState<string[]>(editingProject?.technologies || []);
  const [techInput, setTechInput] = useState('');
  const [githubUrl, setGithubUrl] = useState(editingProject?.githubUrl || '');
  const [liveUrl, setLiveUrl] = useState(editingProject?.liveUrl || '');
  const [imageUrl, setImageUrl] = useState(editingProject?.imageUrl || '');
  const [completedDate, setCompletedDate] = useState(editingProject?.completedDate || '');
  const [status, setStatus] = useState<ProjectStatus>(editingProject?.status || 'Planejado');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const addTech = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput('');
    }
  };

  const validate = () => {
    const err: any = {};
    if (!title.trim()) err.title = 'Título obrigatório';
    if (!description.trim()) err.description = 'Descrição obrigatória';
    if (description.length > 500) err.description = 'Máximo 500 caracteres';
    if (!imageUrl.trim()) err.imageUrl = 'URL da imagem obrigatória';
    if (imageUrl && !imageUrl.startsWith('http')) err.imageUrl = 'URL deve começar com http:// ou https://';
    if (githubUrl && !githubUrl.startsWith('http')) err.githubUrl = 'URL inválida';
    if (liveUrl && !liveUrl.startsWith('http')) err.liveUrl = 'URL inválida';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);

    const projectData: Project = {
      id: editingProject?.id || Date.now().toString(),
      userId: user!.id,
      title,
      description,
      technologies,
      githubUrl: githubUrl || undefined,
      liveUrl: liveUrl || undefined,
      imageUrl,
      completedDate: completedDate || undefined,
      status,
      createdAt: editingProject?.createdAt || new Date().toISOString(),
    };

    try {
      if (editingProject) {
        updateProject(projectData.id, projectData);
      } else {
        addProject(projectData);
      }
      navigate('/projects');
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <h2>{editingProject ? 'Editar Projeto' : 'Novo Projeto'}</h2>
      <div><label>Título *</label><input type="text" value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%' }} />{errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}</div>
      <div><label>Descrição * (máx 500)</label><textarea value={description} onChange={e => setDescription(e.target.value)} maxLength={500} rows={4} style={{ width: '100%' }} /><div>{description.length}/500</div>{errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}</div>
      <div><label>Tecnologias</label><div>{technologies.map(t => <span key={t} style={{ background: '#eee', margin: '0.25rem', padding: '0.25rem', display: 'inline-block' }}>{t}</span>)}</div><input type="text" value={techInput} onChange={e => setTechInput(e.target.value)} /><button type="button" onClick={addTech}>Adicionar</button></div>
      <div><label>GitHub URL</label><input type="text" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} style={{ width: '100%' }} />{errors.githubUrl && <span style={{ color: 'red' }}>{errors.githubUrl}</span>}</div>
      <div><label>Live Demo URL</label><input type="text" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} style={{ width: '100%' }} />{errors.liveUrl && <span style={{ color: 'red' }}>{errors.liveUrl}</span>}</div>
      <div><label>Imagem URL *</label><input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} style={{ width: '100%' }} />{errors.imageUrl && <span style={{ color: 'red' }}>{errors.imageUrl}</span>}</div>
      <div><label>Data de conclusão</label><input type="date" value={completedDate} onChange={e => setCompletedDate(e.target.value)} /></div>
      <div><label>Status</label><select value={status} onChange={e => setStatus(e.target.value as ProjectStatus)}><option>Planejado</option><option>Em Progresso</option><option>Concluído</option></select></div>
      <button type="submit" disabled={saving}>{saving ? 'Salvando...' : 'Salvar'}</button>
      <button type="button" onClick={() => navigate('/projects')}>Cancelar</button>
    </form>
  );
}