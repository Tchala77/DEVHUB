import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [title, setTitle] = useState(user?.title || '');
  const [photo, setPhoto] = useState(user?.photo || '');
  const [github, setGithub] = useState(user?.github || '');
  const [linkedin, setLinkedin] = useState(user?.linkedin || '');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError('Nome obrigatório');
    if (bio.length > 500) return setError('Bio deve ter no máximo 500 caracteres');
    if (photo && !photo.startsWith('http')) return setError('URL da foto deve começar com http');
    if (github && !github.startsWith('http')) return setError('URL do GitHub inválida');
    if (linkedin && !linkedin.startsWith('http')) return setError('URL do LinkedIn inválida');

    setSaving(true);
    try {
      updateProfile({ name, bio, title, photo, github, linkedin });
      alert('Perfil atualizado com sucesso');
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro inesperado');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>Editar Perfil</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Nome *</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', marginBottom: '1rem' }} />
        <label>Título profissional</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', marginBottom: '1rem' }} />
        <label>Bio (máx 500)</label>
        <textarea value={bio} onChange={e => setBio(e.target.value)} maxLength={500} rows={4} style={{ width: '100%', marginBottom: '1rem' }} />
        <div>{bio.length}/500</div>
        <label>URL da foto</label>
        <input type="text" value={photo} onChange={e => setPhoto(e.target.value)} style={{ width: '100%', marginBottom: '1rem' }} />
        <label>URL do GitHub</label>
        <input type="text" value={github} onChange={e => setGithub(e.target.value)} style={{ width: '100%', marginBottom: '1rem' }} />
        <label>URL do LinkedIn</label>
        <input type="text" value={linkedin} onChange={e => setLinkedin(e.target.value)} style={{ width: '100%', marginBottom: '1rem' }} />
        <button type="submit" disabled={saving}>{saving ? 'Salvando...' : 'Salvar Alterações'}</button>
        <button type="button" onClick={() => navigate('/dashboard')} style={{ marginLeft: '0.5rem' }}>Cancelar</button>
      </form>
    </div>
  );
}