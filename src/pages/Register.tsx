import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError('Nome obrigatório');
    if (!email.includes('@')) return setError('Email deve conter @');
    if (password.length < 8) return setError('Senha deve ter mínimo 8 caracteres');
    if (password !== confirm) return setError('Senhas não coincidem');

    setLoading(true);
    try {
      register(name, email, password);
      navigate('/login');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro inesperado');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem' }}>
      <h2>Criar Conta</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome completo" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }} />
        <input type="password" placeholder="Senha (mín 8)" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }} />
        <input type="password" placeholder="Confirmar senha" value={confirm} onChange={e => setConfirm(e.target.value)} required style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }} />
        <button type="submit" style={{ width: '100%' }} disabled={loading}>
          {loading ? 'Criando...' : 'Criar Conta'}
        </button>
      </form>
      <p>Já tem conta? <Link to="/login">Faça login</Link></p>
    </div>
  );
}