import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertCircle } from 'lucide-react';
import logo from '../../imports/WhatsApp_Image_2026-04-12_at_8.28.18_PM.jpeg';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    const success = login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Email o contraseña incorrectos');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex flex-col items-center gap-3">
            <img src={logo} alt="Turismo Cultural Quibdó" className="h-32" />
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Iniciar Sesión</CardTitle>
            <CardDescription>
              Accede a tu cuenta para disfrutar de todos los servicios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="size-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                Iniciar Sesión
              </Button>

              <div className="bg-emerald-50 border border-emerald-200 rounded-md p-3 text-xs text-gray-700">
                <p className="font-semibold mb-1">Credenciales de prueba:</p>
                <p><span className="font-medium">Correo:</span> elsapalacios@gmail.com</p>
                <p><span className="font-medium">Contraseña:</span> 1234567P</p>
              </div>

              <div className="text-center text-sm text-gray-600">
                ¿No tienes cuenta?{' '}
                <Link to="/register" className="text-emerald-600 hover:underline">
                  Regístrate aquí
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-emerald-600">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}