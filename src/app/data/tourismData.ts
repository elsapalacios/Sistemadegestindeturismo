export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export interface Opinion {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  recommendation: string;
  date: string;
  category: string;
}

export interface ZonaEmblematica {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
}

export interface EventoCultural {
  id: string;
  nombre: string;
  fecha: string;
  descripcion: string;
  imagen: string;
  ubicacion: string;
}

export interface Hospedaje {
  id: string;
  nombre: string;
  descripcion: string;
  precio: string;
  imagen: string;
  servicios: string[];
  direccion: string;
  telefono: string;
}

export interface Restaurante {
  id: string;
  nombre: string;
  descripcion: string;
  especialidad: string;
  imagen: string;
  horario: string;
  direccion: string;
  telefono: string;
  precioPromedio: string;
}

export interface Tour {
  id: string;
  nombre: string;
  descripcion: string;
  duracion: string;
  precio: string;
  imagen: string;
  incluye: string[];
  dificultad: string;
}

export interface PlatoTipico {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  ingredientes: string[];
}

export interface HistoriaQuibdo {
  resumen: string;
  cultura: string;
  economia: string;
  biodiversidad: string;
  gastronomia: string;
}

export interface Reserva {
  id: string;
  tipo: 'hospedaje' | 'tour';
  itemId: string;
  itemNombre: string;
  userId: string;
  userName: string;
  fecha: string;
  personas: number;
  notas?: string;
  estado: string;
  createdAt: string;
}
