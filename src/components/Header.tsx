import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#282c34', color: 'white' }}>
      <h1>DevHub</h1>
      <nav>
        <Link to="/" style={{ margin: '0 1rem', color: 'white' }}>Home</Link>
        <Link to="/discover" style={{ margin: '0 1rem', color: 'white' }}>Descobrir</Link>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" style={{ margin: '0 1rem', color: 'white' }}>Dashboard</Link>
            <span style={{ margin: '0 1rem' }}>Olá, {user?.name}</span>
            <button onClick={logout} style={{ background: 'none', border: '1px solid white', color: 'white', cursor: 'pointer' }}>
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ margin: '0 1rem', color: 'white' }}>Login</Link>
            <Link to="/register" style={{ margin: '0 1rem', color: 'white' }}>Registro</Link>
          </>
        )}
      </nav>
    </header>
  );
}