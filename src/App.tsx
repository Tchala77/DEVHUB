import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ProjectProvider } from './contexts/ProjectContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const EditProfile = lazy(() => import('./pages/EditProfile'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectForm = lazy(() => import('./pages/ProjectForm'));
const EditProject = lazy(() => import('./pages/EditProject'));
const Discover = lazy(() => import('./pages/Discover'));
const PublicPortfolio = lazy(() => import('./pages/PublicPortfolio'));
const Favorites = lazy(() => import('./pages/Favorites'));

const PageLoader = () => (
  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
    <p>Carregando...</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <Header />
            <main style={{ minHeight: '70vh', padding: '1rem' }}>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/discover" element={<Discover />} />
                  <Route path="/portfolio/:userId" element={<PublicPortfolio />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile/edit" element={<EditProfile />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/new" element={<ProjectForm />} />
                    <Route path="/projects/:id/edit" element={<EditProject />} />
                    <Route path="/favorites" element={<Favorites />} />
                  </Route>
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </BrowserRouter>
        </FavoritesProvider>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;