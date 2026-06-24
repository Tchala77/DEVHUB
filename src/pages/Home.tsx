import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>DevHub</h1>
      <p>Plataforma de Portfólios para Desenvolvedores</p>
      <Link to="/register"><button>Criar Conta</button></Link>
      <Link to="/discover"><button style={{ marginLeft: '1rem' }}>Explorar Portfólios</button></Link>
    </div>
  );
}