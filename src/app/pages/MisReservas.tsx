import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';
import type { Reserva } from '../data/tourismData';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { CalendarDays, Hotel, Compass, Users, FileText, ClipboardList } from 'lucide-react';

const estadoColor: Record<string, string> = {
  pendiente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmada: 'bg-green-100 text-green-800 border-green-200',
  cancelada: 'bg-red-100 text-red-800 border-red-200',
};

export function MisReservas() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }
    api.getReservasByUser(user.id)
      .then(setReservas)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <ClipboardList className="size-12" />
            <h1 className="text-4xl md:text-5xl">Mis Reservas</h1>
          </div>
          <p className="text-xl max-w-3xl">
            Historial de tus reservas de hospedaje y tours en Quibdó.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-16 text-gray-500">Cargando reservas...</div>
        ) : reservas.length === 0 ? (
          <Card>
            <CardContent className="p-16 text-center text-gray-500">
              <ClipboardList className="size-14 mx-auto mb-4 text-gray-300" />
              <p className="text-lg mb-2">No tienes reservas aún</p>
              <p className="text-sm mb-6">Explora nuestros hospedajes y tours para hacer tu primera reserva.</p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => navigate('/hospedaje')} className="bg-emerald-600 hover:bg-emerald-700">
                  Ver Hospedajes
                </Button>
                <Button onClick={() => navigate('/tours')} variant="outline">
                  Ver Tours
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600 mb-6">{reservas.length} reserva{reservas.length !== 1 ? 's' : ''} encontrada{reservas.length !== 1 ? 's' : ''}</p>
            {reservas.map(reserva => (
              <Card key={reserva.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {reserva.tipo === 'hospedaje' ? (
                        <div className="size-10 rounded-full bg-emerald-100 flex items-center justify-center">
                          <Hotel className="size-5 text-emerald-600" />
                        </div>
                      ) : (
                        <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Compass className="size-5 text-blue-600" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-800">{reserva.itemNombre}</h3>
                        <span className="text-xs text-gray-500 capitalize">{reserva.tipo}</span>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${estadoColor[reserva.estado] ?? 'bg-gray-100 text-gray-700'}`}>
                      {reserva.estado}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="size-4 text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-400">Fecha</div>
                        <div>{new Date(reserva.fecha).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="size-4 text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-400">Personas</div>
                        <div>{reserva.personas}</div>
                      </div>
                    </div>
                    {reserva.notas && (
                      <div className="flex items-start gap-2 col-span-2 md:col-span-1">
                        <FileText className="size-4 text-gray-400 mt-0.5" />
                        <div>
                          <div className="text-xs text-gray-400">Notas</div>
                          <div className="text-gray-700">{reserva.notas}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
