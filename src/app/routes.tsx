import { createBrowserRouter } from 'react-router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Hospedaje } from './pages/Hospedaje';
import { Restaurantes } from './pages/Restaurantes';
import { Tours } from './pages/Tours';
import { Historia } from './pages/Historia';
import { Opiniones } from './pages/Opiniones';
import { MisReservas } from './pages/MisReservas';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Página no encontrada</p>
          <a href="/" className="text-emerald-600 hover:underline">Volver al inicio</a>
        </div>
      </div>
    </Layout>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Home /></Layout>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/hospedaje',
    element: <Layout><Hospedaje /></Layout>
  },
  {
    path: '/restaurantes',
    element: <Layout><Restaurantes /></Layout>
  },
  {
    path: '/tours',
    element: <Layout><Tours /></Layout>
  },
  {
    path: '/historia',
    element: <Layout><Historia /></Layout>
  },
  {
    path: '/opiniones',
    element: <Layout><Opiniones /></Layout>
  },
  {
    path: '/mis-reservas',
    element: <Layout><MisReservas /></Layout>
  },
  {
    path: '*',
    element: <NotFound />
  }
]);
