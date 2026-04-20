import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import logo from '../../imports/WhatsApp_Image_2026-04-12_at_8.28.18_PM.jpeg';

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/hospedaje', label: 'Hospedaje' },
    { to: '/restaurantes', label: 'Restaurantes' },
    { to: '/tours', label: 'Tours' },
    { to: '/historia', label: 'Historia' },
    { to: '/opiniones', label: 'Opiniones' }
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Turismo Cultural Quibdó" className="h-12" />
            <span className="hidden sm:block italic" style={{ fontFamily: 'cursive' }}>
              <span style={{ color: '#2d7738' }}>Turismo </span>
              <span style={{ color: '#e87722' }}>Cultural en Quibdó</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 hover:text-emerald-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="flex items-center gap-3 ml-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <User className="size-4" />
                  <span className="text-sm">{user?.name}</span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <LogOut className="size-4" />
                  Cerrar sesión
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-4">
                <Button
                  onClick={() => navigate('/login')}
                  variant="outline"
                  size="sm"
                >
                  Iniciar sesión
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Registrarse
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-2">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-gray-200 mt-2 pt-2">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 text-gray-700 flex items-center gap-2">
                      <User className="size-4" />
                      {user?.name}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-2"
                    >
                      <LogOut className="size-4" />
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        navigate('/login');
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Iniciar sesión
                    </button>
                    <button
                      onClick={() => {
                        navigate('/register');
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-emerald-600 hover:bg-gray-100 rounded-md"
                    >
                      Registrarse
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}