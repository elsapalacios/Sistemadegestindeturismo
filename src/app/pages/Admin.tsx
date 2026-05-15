import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';
import type { Reserva, User, Opinion, ZonaEmblematica, EventoCultural, Hospedaje, Restaurante, Tour, PlatoTipico } from '../data/tourismData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { EntityCrud } from '../components/admin/EntityCrud';
import {
  Users, ClipboardList, MessageSquare, Star,
  Hotel, Compass, Trash2, ShieldCheck, CalendarDays,
  MapPin, Calendar, Utensils
} from 'lucide-react';

const ADMIN_EMAIL = 'elsapalacios@gmail.com';

const estadoBadge: Record<string, string> = {
  pendiente: 'bg-yellow-100 text-yellow-800',
  confirmada: 'bg-green-100 text-green-800',
  cancelada: 'bg-red-100 text-red-800',
};

export function Admin() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState<any>(null);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [opiniones, setOpiniones] = useState<Opinion[]>([]);
  const [zonas, setZonas] = useState<ZonaEmblematica[]>([]);
  const [eventos, setEventos] = useState<EventoCultural[]>([]);
  const [hospedajes, setHospedajes] = useState<Hospedaje[]>([]);
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [platos, setPlatos] = useState<PlatoTipico[]>([]);

  useEffect(() => {
    if (!isAuthenticated || user?.email !== ADMIN_EMAIL) navigate('/');
  }, [isAuthenticated, user, navigate]);

  const loadAll = useCallback(() => {
    api.getAdminStats().then(setStats).catch(() => {});
    api.getAdminReservas().then(setReservas).catch(() => {});
    api.getAdminUsuarios().then(setUsuarios).catch(() => {});
    api.getAdminOpiniones().then(setOpiniones).catch(() => {});
    api.getZonas().then(setZonas).catch(() => {});
    api.getEventos().then(setEventos).catch(() => {});
    api.getHospedajes().then(setHospedajes).catch(() => {});
    api.getRestaurantes().then(setRestaurantes).catch(() => {});
    api.getTours().then(setTours).catch(() => {});
    api.getPlatos().then(setPlatos).catch(() => {});
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  const cambiarEstado = async (id: string, estado: string) => {
    await api.patchReservaEstado(id, estado).catch(() => {});
    setReservas(prev => prev.map(r => r.id === id ? { ...r, estado } : r));
  };

  const eliminarOpinion = async (id: string) => {
    await api.deleteOpinion(id).catch(() => {});
    setOpiniones(prev => prev.filter(o => o.id !== id));
  };

  if (!isAuthenticated || user?.email !== ADMIN_EMAIL) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-10" />
            <div>
              <h1 className="text-3xl">Panel de Administración</h1>
              <p className="text-gray-400 text-sm mt-1">Sistema de Gestión de Turismo — Quibdó</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Usuarios', value: stats?.usuarios ?? '—', icon: Users, color: 'text-blue-600 bg-blue-50' },
            { label: 'Reservas', value: stats?.reservas ?? '—', icon: ClipboardList, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'Opiniones', value: stats?.opiniones ?? '—', icon: MessageSquare, color: 'text-purple-600 bg-purple-50' },
            { label: 'Calif. promedio', value: stats?.promedio ? `${stats.promedio} ★` : '—', icon: Star, color: 'text-yellow-600 bg-yellow-50' },
          ].map(({ label, value, icon: Icon, color }) => (
            <Card key={label}>
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`size-12 rounded-full flex items-center justify-center ${color}`}>
                  <Icon className="size-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{value}</div>
                  <div className="text-sm text-gray-500">{label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="zonas">
          <TabsList className="flex flex-wrap h-auto gap-1 mb-6 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="zonas" className="gap-1"><MapPin className="size-3" />Zonas</TabsTrigger>
            <TabsTrigger value="eventos" className="gap-1"><Calendar className="size-3" />Eventos</TabsTrigger>
            <TabsTrigger value="hospedajes" className="gap-1"><Hotel className="size-3" />Hospedajes</TabsTrigger>
            <TabsTrigger value="restaurantes" className="gap-1"><Utensils className="size-3" />Restaurantes</TabsTrigger>
            <TabsTrigger value="tours" className="gap-1"><Compass className="size-3" />Tours</TabsTrigger>
            <TabsTrigger value="platos" className="gap-1"><Utensils className="size-3" />Platos</TabsTrigger>
            <TabsTrigger value="reservas" className="gap-1"><ClipboardList className="size-3" />Reservas</TabsTrigger>
            <TabsTrigger value="opiniones" className="gap-1"><MessageSquare className="size-3" />Opiniones</TabsTrigger>
            <TabsTrigger value="usuarios" className="gap-1"><Users className="size-3" />Usuarios</TabsTrigger>
          </TabsList>

          {/* ── Zonas ── */}
          <TabsContent value="zonas">
            <Card><CardContent className="p-6">
              <EntityCrud
                title="Zonas Emblemáticas"
                items={zonas}
                displayKeys={['nombre', 'descripcion']}
                fields={[
                  { key: 'nombre', label: 'Nombre', placeholder: 'Catedral de San Francisco...' },
                  { key: 'descripcion', label: 'Descripción', type: 'textarea', placeholder: 'Descripción del lugar...' },
                  { key: 'imagen', label: 'URL de imagen', placeholder: 'https://...' },
                ]}
                onAdd={async d => { const r = await api.createZona(d); setZonas(p => [...p, r]); }}
                onUpdate={async (id, d) => { await api.updateZona(id, d); setZonas(p => p.map(i => i.id === id ? { ...i, ...d } : i)); }}
                onDelete={async id => { await api.deleteZona(id); setZonas(p => p.filter(i => i.id !== id)); }}
              />
            </CardContent></Card>
          </TabsContent>

          {/* ── Eventos ── */}
          <TabsContent value="eventos">
            <Card><CardContent className="p-6">
              <EntityCrud
                title="Eventos Culturales"
                items={eventos}
                displayKeys={['nombre', 'fecha']}
                fields={[
                  { key: 'nombre', label: 'Nombre', placeholder: 'Festival de San Pacho...' },
                  { key: 'fecha', label: 'Fecha', placeholder: 'Septiembre 20 - Octubre 5' },
                  { key: 'descripcion', label: 'Descripción', type: 'textarea' },
                  { key: 'imagen', label: 'URL de imagen', placeholder: 'https://...' },
                  { key: 'ubicacion', label: 'Ubicación', placeholder: 'Centro de Quibdó' },
                ]}
                onAdd={async d => { const r = await api.createEvento(d); setEventos(p => [...p, r]); }}
                onUpdate={async (id, d) => { await api.updateEvento(id, d); setEventos(p => p.map(i => i.id === id ? { ...i, ...d } : i)); }}
                onDelete={async id => { await api.deleteEvento(id); setEventos(p => p.filter(i => i.id !== id)); }}
              />
            </CardContent></Card>
          </TabsContent>

          {/* ── Hospedajes ── */}
          <TabsContent value="hospedajes">
            <Card><CardContent className="p-6">
              <EntityCrud
                title="Hospedajes"
                items={hospedajes}
                displayKeys={['nombre', 'precio']}
                fields={[
                  { key: 'nombre', label: 'Nombre', placeholder: 'Hotel Citará...' },
                  { key: 'descripcion', label: 'Descripción', type: 'textarea' },
                  { key: 'precio', label: 'Precio', placeholder: 'Desde $150,000 COP por noche' },
                  { key: 'imagen', label: 'URL de imagen', placeholder: 'https://...' },
                  { key: 'direccion', label: 'Dirección', placeholder: 'Carrera 3 #27-30, Centro' },
                  { key: 'telefono', label: 'Teléfono', placeholder: '+57 4 672 1234' },
                  { key: 'servicios', label: 'Servicios', type: 'tags', placeholder: 'WiFi, Piscina, Restaurante' },
                ]}
                onAdd={async d => { const r = await api.createHospedaje(d); setHospedajes(p => [...p, r]); }}
                onUpdate={async (id, d) => { await api.updateHospedaje(id, d); setHospedajes(p => p.map(i => i.id === id ? { ...i, ...d } : i)); }}
                onDelete={async id => { await api.deleteHospedaje(id); setHospedajes(p => p.filter(i => i.id !== id)); }}
              />
            </CardContent></Card>
          </TabsContent>

          {/* ── Restaurantes ── */}
          <TabsContent value="restaurantes">
            <Card><CardContent className="p-6">
              <EntityCrud
                title="Restaurantes"
                items={restaurantes}
                displayKeys={['nombre', 'precioPromedio']}
                fields={[
                  { key: 'nombre', label: 'Nombre', placeholder: 'Sabor Chocoano...' },
                  { key: 'descripcion', label: 'Descripción', type: 'textarea' },
                  { key: 'especialidad', label: 'Especialidades', type: 'textarea', placeholder: 'Pescado con coco, arroz con coco...' },
                  { key: 'imagen', label: 'URL de imagen', placeholder: 'https://...' },
                  { key: 'horario', label: 'Horario', placeholder: 'Lunes a Domingo: 11:00 AM - 10:00 PM' },
                  { key: 'direccion', label: 'Dirección', placeholder: 'Carrera 4 #28-15' },
                  { key: 'telefono', label: 'Teléfono', placeholder: '+57 4 672 3456' },
                  { key: 'precioPromedio', label: 'Precio promedio', placeholder: '$25,000 - $40,000 COP' },
                ]}
                onAdd={async d => { const r = await api.createRestaurante(d); setRestaurantes(p => [...p, r]); }}
                onUpdate={async (id, d) => { await api.updateRestaurante(id, d); setRestaurantes(p => p.map(i => i.id === id ? { ...i, ...d } : i)); }}
                onDelete={async id => { await api.deleteRestaurante(id); setRestaurantes(p => p.filter(i => i.id !== id)); }}
              />
            </CardContent></Card>
          </TabsContent>

          {/* ── Tours ── */}
          <TabsContent value="tours">
            <Card><CardContent className="p-6">
              <EntityCrud
                title="Tours"
                items={tours}
                displayKeys={['nombre', 'precio']}
                fields={[
                  { key: 'nombre', label: 'Nombre', placeholder: 'Tour por el Río Atrato...' },
                  { key: 'descripcion', label: 'Descripción', type: 'textarea' },
                  { key: 'duracion', label: 'Duración', placeholder: '4 horas' },
                  { key: 'precio', label: 'Precio', placeholder: '$80,000 COP por persona' },
                  { key: 'imagen', label: 'URL de imagen', placeholder: 'https://...' },
                  { key: 'dificultad', label: 'Dificultad', type: 'select', options: ['Fácil', 'Moderada', 'Difícil'] },
                  { key: 'incluye', label: 'Incluye', type: 'tags', placeholder: 'Guía local, Refrigerio, Transporte' },
                ]}
                onAdd={async d => { const r = await api.createTour(d); setTours(p => [...p, r]); }}
                onUpdate={async (id, d) => { await api.updateTour(id, d); setTours(p => p.map(i => i.id === id ? { ...i, ...d } : i)); }}
                onDelete={async id => { await api.deleteTour(id); setTours(p => p.filter(i => i.id !== id)); }}
              />
            </CardContent></Card>
          </TabsContent>

          {/* ── Platos ── */}
          <TabsContent value="platos">
            <Card><CardContent className="p-6">
              <EntityCrud
                title="Platos Típicos"
                items={platos}
                displayKeys={['nombre', 'descripcion']}
                fields={[
                  { key: 'nombre', label: 'Nombre', placeholder: 'Sancocho de Pescado...' },
                  { key: 'descripcion', label: 'Descripción', type: 'textarea' },
                  { key: 'imagen', label: 'URL de imagen', placeholder: 'https://...' },
                  { key: 'ingredientes', label: 'Ingredientes', type: 'tags', placeholder: 'Pescado, Plátano, Yuca, Cilantro' },
                ]}
                onAdd={async d => { const r = await api.createPlato(d); setPlatos(p => [...p, r]); }}
                onUpdate={async (id, d) => { await api.updatePlato(id, d); setPlatos(p => p.map(i => i.id === id ? { ...i, ...d } : i)); }}
                onDelete={async id => { await api.deletePlato(id); setPlatos(p => p.filter(i => i.id !== id)); }}
              />
            </CardContent></Card>
          </TabsContent>

          {/* ── Reservas ── */}
          <TabsContent value="reservas">
            <Card>
              <CardHeader><CardTitle>Todas las Reservas</CardTitle></CardHeader>
              <CardContent>
                {reservas.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No hay reservas aún</p>
                ) : (
                  <div className="space-y-3">
                    {reservas.map(r => (
                      <div key={r.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className={`size-9 rounded-full flex items-center justify-center ${r.tipo === 'hospedaje' ? 'bg-emerald-100' : 'bg-blue-100'}`}>
                            {r.tipo === 'hospedaje' ? <Hotel className="size-4 text-emerald-600" /> : <Compass className="size-4 text-blue-600" />}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{r.itemNombre}</p>
                            <p className="text-xs text-gray-500">
                              {r.userName} · <CalendarDays className="size-3 inline" /> {r.fecha} · {r.personas} persona{r.personas !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${estadoBadge[r.estado]}`}>{r.estado}</span>
                          <Select value={r.estado} onValueChange={v => cambiarEstado(r.id, v)}>
                            <SelectTrigger className="w-36 h-8 text-xs"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pendiente">Pendiente</SelectItem>
                              <SelectItem value="confirmada">Confirmada</SelectItem>
                              <SelectItem value="cancelada">Cancelada</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Opiniones ── */}
          <TabsContent value="opiniones">
            <Card>
              <CardHeader><CardTitle>Opiniones de Visitantes</CardTitle></CardHeader>
              <CardContent>
                {opiniones.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No hay opiniones aún</p>
                ) : (
                  <div className="space-y-3">
                    {opiniones.map(op => (
                      <div key={op.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex-1 min-w-0 mr-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{op.userName}</span>
                            <Badge variant="outline" className="text-xs capitalize">{op.category}</Badge>
                            <span className="text-yellow-500 text-xs">{'★'.repeat(op.rating)}{'☆'.repeat(5 - op.rating)}</span>
                          </div>
                          <p className="text-sm text-gray-700 line-clamp-2">{op.comment}</p>
                          <p className="text-xs text-gray-400 mt-1">{op.date}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0" onClick={() => eliminarOpinion(op.id)}>
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Usuarios ── */}
          <TabsContent value="usuarios">
            <Card>
              <CardHeader><CardTitle>Usuarios Registrados</CardTitle></CardHeader>
              <CardContent>
                {usuarios.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No hay usuarios aún</p>
                ) : (
                  <div className="space-y-2">
                    {usuarios.map(u => (
                      <div key={u.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-full bg-indigo-100 flex items-center justify-center">
                            <Users className="size-4 text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{u.name}</p>
                            <p className="text-xs text-gray-500">{u.email}</p>
                          </div>
                        </div>
                        {u.email === ADMIN_EMAIL && <Badge className="bg-gray-800 text-white text-xs">Admin</Badge>}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
