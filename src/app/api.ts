import type {
  ZonaEmblematica,
  EventoCultural,
  Hospedaje,
  Restaurante,
  Tour,
  PlatoTipico,
  HistoriaQuibdo,
  Opinion,
  User,
  Reserva,
} from './data/tourismData';

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Error en la petición');
  return data as T;
}

export const api = {
  getZonas: () => request<ZonaEmblematica[]>(`${BASE}/api/zonas`),
  getEventos: () => request<EventoCultural[]>(`${BASE}/api/eventos`),
  getHospedajes: () => request<Hospedaje[]>(`${BASE}/api/hospedajes`),
  getRestaurantes: () => request<Restaurante[]>(`${BASE}/api/restaurantes`),
  getTours: () => request<Tour[]>(`${BASE}/api/tours`),
  getPlatos: () => request<PlatoTipico[]>(`${BASE}/api/platos`),
  getHistoria: () => request<HistoriaQuibdo>(`${BASE}/api/historia`),
  getOpiniones: () => request<Opinion[]>(`${BASE}/api/opiniones`),

  postOpinion: (body: Omit<Opinion, 'id' | 'date'>) =>
    request<Opinion>(`${BASE}/api/opiniones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),

  login: (email: string, password: string) =>
    request<User>(`${BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }),

  register: (name: string, email: string, password: string) =>
    request<User>(`${BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    }),

  postReserva: (body: Omit<Reserva, 'id' | 'estado' | 'createdAt'>) =>
    request<Reserva>(`${BASE}/api/reservas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),

  getReservasByUser: (userId: string) =>
    request<Reserva[]>(`${BASE}/api/reservas/usuario/${userId}`),

  // Admin
  getAdminStats: () => request<{
    usuarios: number; reservas: number; opiniones: number; promedio: number;
    porTipo: { tipo: string; total: number }[];
  }>(`${BASE}/api/admin/stats`),

  getAdminReservas: () => request<Reserva[]>(`${BASE}/api/admin/reservas`),

  patchReservaEstado: (id: string, estado: string) =>
    request<{ ok: boolean }>(`${BASE}/api/admin/reservas/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado }),
    }),

  getAdminUsuarios: () => request<User[]>(`${BASE}/api/admin/usuarios`),

  getAdminOpiniones: () => request<Opinion[]>(`${BASE}/api/admin/opiniones`),

  deleteOpinion: (id: string) =>
    request<{ ok: boolean }>(`${BASE}/api/admin/opiniones/${id}`, { method: 'DELETE' }),

  // Admin CRUD — helper
  _crud: (path: string, method: string, body?: any) =>
    request<any>(`${BASE}${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    }),

  // Zonas
  createZona: (d: any) => request<any>(`${BASE}/api/admin/zonas`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }),
  updateZona: (id: string, d: any) => request<any>(`${BASE}/api/admin/zonas/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }),
  deleteZona: (id: string) => request<any>(`${BASE}/api/admin/zonas/${id}`, { method: 'DELETE' }),

  // Eventos
  createEvento: (d: any) => request<any>(`${BASE}/api/admin/eventos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }),
  updateEvento: (id: string, d: any) => request<any>(`${BASE}/api/admin/eventos/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }),
  deleteEvento: (id: string) => request<any>(`${BASE}/api/admin/eventos/${id}`, { method: 'DELETE' }),

  // Hospedajes
  createHospedaje: (d: any) => request<any>(`${BASE}/api/admin/hospedajes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }),
  updateHospedaje: (id: string, d: any) => request<any>(`${BASE}/api/admin/hospedajes/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }),
  deleteHospedaje: (id: string) => request<any>(`${BASE}/api/admin/hospedajes/${id}`, { method: 'DELETE' }),

  // Restaurantes
  createRestaurante: (d: any) => request<any>(`${BASE}/api/admin/restaurantes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }),
  updateRestaurante: (id: string, d: any) => request<any>(`${BASE}/api/admin/restaurantes/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }),
  deleteRestaurante: (id: string) => request<any>(`${BASE}/api/admin/restaurantes/${id}`, { method: 'DELETE' }),

  // Tours
  createTour: (d: any) => request<any>(`${BASE}/api/admin/tours`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }),
  updateTour: (id: string, d: any) => request<any>(`${BASE}/api/admin/tours/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }),
  deleteTour: (id: string) => request<any>(`${BASE}/api/admin/tours/${id}`, { method: 'DELETE' }),

  // Platos
  createPlato: (d: any) => request<any>(`${BASE}/api/admin/platos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }),
  updatePlato: (id: string, d: any) => request<any>(`${BASE}/api/admin/platos/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }),
  deletePlato: (id: string) => request<any>(`${BASE}/api/admin/platos/${id}`, { method: 'DELETE' }),
};
