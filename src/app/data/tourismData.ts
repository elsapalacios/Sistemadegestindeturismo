// Datos de turismo de Quibdó
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
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

// Zonas emblemáticas de Quibdó
export const zonasEmblematicas: ZonaEmblematica[] = [
  {
    id: '1',
    nombre: 'Catedral de San Francisco de Asís',
    descripcion: 'Hermosa catedral de estilo gótico ubicada en el centro de Quibdó, símbolo religioso y arquitectónico de la ciudad.',
    imagen: '/src/imports/image.png'
  },
  {
    id: '2',
    nombre: 'Malecón del Río Atrato',
    descripcion: 'Paseo peatonal a orillas del majestuoso río Atrato, ideal para caminar y disfrutar de la brisa.',
    imagen: '/src/imports/image-1.png'
  },
  {
    id: '3',
    nombre: 'Plaza de Mercado',
    descripcion: 'Centro comercial tradicional donde se puede apreciar la cultura local, productos frescos y artesanías.',
    imagen: 'https://images.unsplash.com/photo-1634118908433-ee63c458516b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb2xvbWJpYW4lMjB0cmFkaXRpb25hbCUyMGZvb2R8ZW58MXx8fHwxNzc1MTg4NDA2fDA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

// Eventos culturales
export const eventosCulturales: EventoCultural[] = [
  {
    id: '1',
    nombre: 'Festival de San Pacho',
    fecha: 'Septiembre 20 - Octubre 5',
    descripcion: 'La fiesta patronal más importante del Chocó, declarada Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO. Incluye música, danzas, procesiones y gastronomía.',
    imagen: 'https://images.unsplash.com/photo-1771980590196-7b0e0c58b99b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb2xvbWJpYSUyMGN1bHR1cmFsJTIwZmVzdGl2YWwlMjBkYW5jZXxlbnwxfHx8fDE3NzUxODg0MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ubicacion: 'Centro de Quibdó'
  },
  {
    id: '2',
    nombre: 'Festival de Música del Pacífico Petronio Álvarez',
    fecha: 'Agosto',
    descripcion: 'Celebración de la música tradicional del Pacífico colombiano con chirimías, currulaos y alabaos.',
    imagen: 'https://images.unsplash.com/photo-1771980590196-7b0e0c58b99b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb2xvbWJpYSUyMGN1bHR1cmFsJTIwZmVzdGl2YWwlMjBkYW5jZXxlbnwxfHx8fDE3NzUxODg0MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ubicacion: 'Plaza Cultural'
  },
  {
    id: '3',
    nombre: 'Semana Santa',
    fecha: 'Marzo/Abril',
    descripcion: 'Celebraciones religiosas con procesiones y actividades tradicionales.',
    imagen: 'https://images.unsplash.com/photo-1559555686-44c2dd5fb708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxRdWliZG8lMjBDb2xvbWJpYSUyMGNpdHl8ZW58MXx8fHwxNzc1MTg4NDA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ubicacion: 'Catedral de San Francisco'
  }
];

// Hospedajes
export const hospedajes: Hospedaje[] = [
  {
    id: '1',
    nombre: 'Hotel Citará',
    descripcion: 'Hotel moderno en el centro de Quibdó con excelentes servicios y comodidades.',
    precio: 'Desde $150,000 COP por noche',
    imagen: 'https://images.unsplash.com/photo-1719241367647-718f2f7e8956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb2xvbWJpYSUyMGhvdGVsJTIwcmVzb3J0fGVufDF8fHx8MTc3NTE4ODQwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    servicios: ['WiFi gratis', 'Aire acondicionado', 'Restaurante', 'Piscina', 'Parqueadero'],
    direccion: 'Carrera 3 #27-30, Centro',
    telefono: '+57 4 672 1234'
  },
  {
    id: '2',
    nombre: 'Hostal del Río',
    descripcion: 'Alojamiento acogedor cerca al malecón con vista al río Atrato.',
    precio: 'Desde $80,000 COP por noche',
    imagen: 'https://images.unsplash.com/photo-1719241367647-718f2f7e8956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb2xvbWJpYSUyMGhvdGVsJTIwcmVzb3J0fGVufDF8fHx8MTc3NTE4ODQwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    servicios: ['WiFi', 'Desayuno incluido', 'Ventilador', 'Cocina compartida'],
    direccion: 'Calle 25 #4-15, Malecón',
    telefono: '+57 4 672 5678'
  },
  {
    id: '3',
    nombre: 'Hotel San Francisco',
    descripcion: 'Hotel tradicional frente a la catedral, ideal para turistas.',
    precio: 'Desde $120,000 COP por noche',
    imagen: 'https://images.unsplash.com/photo-1719241367647-718f2f7e8956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb2xvbWJpYSUyMGhvdGVsJTIwcmVzb3J0fGVufDF8fHx8MTc3NTE4ODQwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    servicios: ['WiFi', 'TV por cable', 'Aire acondicionado', 'Servicio a la habitación'],
    direccion: 'Carrera 2 #26-10, Centro',
    telefono: '+57 4 672 9012'
  }
];

// Restaurantes
export const restaurantes: Restaurante[] = [
  {
    id: '1',
    nombre: 'Sabor Chocoano',
    descripcion: 'Restaurante especializado en comida típica del Pacífico colombiano.',
    especialidad: 'Pescado con coco, arroz con coco, sancocho de pescado',
    imagen: 'https://images.unsplash.com/photo-1759375341361-00f9054cd5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb2xvbWJpYSUyMHJlc3RhdXJhbnQlMjBkaW5pbmd8ZW58MXx8fHwxNzc1MTg4NDA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    horario: 'Lunes a Domingo: 11:00 AM - 10:00 PM',
    direccion: 'Carrera 4 #28-15',
    telefono: '+57 4 672 3456',
    precioPromedio: '$25,000 - $40,000 COP'
  },
  {
    id: '2',
    nombre: 'El Atrato',
    descripcion: 'Restaurante con vista al río, famoso por sus mariscos frescos.',
    especialidad: 'Langostinos, cazuela de mariscos, patacones con hogao',
    imagen: 'https://images.unsplash.com/photo-1759375341361-00f9054cd5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb2xvbWJpYSUyMHJlc3RhdXJhbnQlMjBkaW5pbmd8ZW58MXx8fHwxNzc1MTg4NDA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    horario: 'Martes a Domingo: 12:00 PM - 11:00 PM',
    direccion: 'Malecón, Calle 24 #5-20',
    telefono: '+57 4 672 7890',
    precioPromedio: '$30,000 - $50,000 COP'
  },
  {
    id: '3',
    nombre: 'La Fogata Pacífica',
    descripcion: 'Comidas rápidas y platos tradicionales en ambiente familiar.',
    especialidad: 'Empanadas de pescado, tapao de pescado, jugos naturales',
    imagen: 'https://images.unsplash.com/photo-1634118908433-ee63c458516b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb2xvbWJpYW4lMjB0cmFkaXRpb25hbCUyMGZvb2R8ZW58MXx8fHwxNzc1MTg4NDA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    horario: 'Lunes a Sábado: 8:00 AM - 8:00 PM',
    direccion: 'Carrera 3 #25-08',
    telefono: '+57 4 672 4567',
    precioPromedio: '$15,000 - $30,000 COP'
  }
];

// Tours
export const tours: Tour[] = [
  {
    id: '1',
    nombre: 'Tour por el Río Atrato',
    descripcion: 'Recorrido en lancha por el río navegable más caudaloso del mundo, observando la biodiversidad única del Chocó.',
    duracion: '4 horas',
    precio: '$80,000 COP por persona',
    imagen: 'https://images.unsplash.com/photo-1707502275695-2258b614753f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb2xvbWJpYSUyMHJhaW5mb3Jlc3QlMjB0b3VyfGVufDF8fHx8MTc3NTE4ODQwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    incluye: ['Transporte en lancha', 'Guía local', 'Refrigerio', 'Chaleco salvavidas'],
    dificultad: 'Fácil'
  },
  {
    id: '2',
    nombre: 'Caminata Ecológica al Jardín Botánico',
    descripcion: 'Exploración de la flora y fauna del Chocó biogeográfico en el jardín botánico del Pacífico.',
    duracion: '3 horas',
    precio: '$50,000 COP por persona',
    imagen: 'https://images.unsplash.com/photo-1707502275695-2258b614753f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb2xvbWJpYSUyMHJhaW5mb3Jlc3QlMjB0b3VyfGVufDF8fHx8MTc3NTE4ODQwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    incluye: ['Guía especializado', 'Entrada al jardín', 'Refrigerio', 'Binoculares'],
    dificultad: 'Moderada'
  },
  {
    id: '3',
    nombre: 'Tour Cultural por Quibdó',
    descripcion: 'Recorrido por los sitios históricos y culturales de la ciudad, incluyendo la catedral, museos y plazas.',
    duracion: '2.5 horas',
    precio: '$40,000 COP por persona',
    imagen: 'https://images.unsplash.com/photo-1559555686-44c2dd5fb708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxRdWliZG8lMjBDb2xvbWJpYSUyMGNpdHl8ZW58MXx8fHwxNzc1MTg4NDA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    incluye: ['Guía local', 'Entrada a museos', 'Degustación de dulces típicos'],
    dificultad: 'Fácil'
  }
];

// Platos típicos
export const platosTypicos: PlatoTipico[] = [
  {
    id: '1',
    nombre: 'Sancocho de Pescado',
    descripcion: 'Sopa tradicional del Pacífico con pescado fresco, plátano, yuca y especias.',
    imagen: 'https://images.unsplash.com/photo-1634118908433-ee63c458516b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb2xvbWJpYW4lMjB0cmFkaXRpb25hbCUyMGZvb2R8ZW58MXx8fHwxNzc1MTg4NDA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ingredientes: ['Pescado fresco', 'Plátano', 'Yuca', 'Cilantro', 'Cebolla', 'Ajo']
  },
  {
    id: '2',
    nombre: 'Arroz con Coco',
    descripcion: 'Arroz cocinado con leche de coco, pasas y azúcar, acompañamiento perfecto para pescado.',
    imagen: 'https://images.unsplash.com/photo-1634118908433-ee63c458516b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb2xvbWJpYW4lMjB0cmFkaXRpb25hbCUyMGZvb2R8ZW58MXx8fHwxNzc1MTg4NDA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ingredientes: ['Arroz', 'Coco rallado', 'Leche de coco', 'Pasas', 'Azúcar', 'Sal']
  },
  {
    id: '3',
    nombre: 'Tapao de Pescado',
    descripcion: 'Guiso de pescado con leche de coco, plátano y especias, servido en hoja de bijao.',
    imagen: 'https://images.unsplash.com/photo-1634118908433-ee63c458516b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb2xvbWJpYW4lMjB0cmFkaXRpb25hbCUyMGZvb2R8ZW58MXx8fHwxNzc1MTg4NDA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ingredientes: ['Pescado', 'Leche de coco', 'Plátano verde', 'Yuca', 'Cebolla', 'Tomate']
  },
  {
    id: '4',
    nombre: 'Bacano',
    descripcion: 'Postre tradicional hecho con plátano maduro, coco y panela.',
    imagen: 'https://images.unsplash.com/photo-1634118908433-ee63c458516b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb2xvbWJpYW4lMjB0cmFkaXRpb25hbCUyMGZvb2R8ZW58MXx8fHwxNzc1MTg4NDA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ingredientes: ['Plátano maduro', 'Coco rallado', 'Panela', 'Canela']
  }
];

// Historia y forma de vida
export const historiaQuibdo = {
  resumen: 'Quibdó es la capital del departamento de Chocó, ubicada en el occidente de Colombia. Fundada en 1654, es una ciudad rica en cultura afrocolombiana e indígena. El río Atrato ha sido históricamente la arteria vital de la ciudad, facilitando el comercio y la comunicación.',
  cultura: 'La cultura de Quibdó es vibrante y diversa, con fuertes raíces africanas e indígenas. La música, especialmente la chirimía y el currulao, son expresiones artísticas fundamentales. El Festival de San Pacho, declarado Patrimonio Cultural Inmaterial de la Humanidad, es la máxima expresión de su identidad cultural.',
  economia: 'La economía se basa principalmente en la minería, la pesca, el comercio y cada vez más en el turismo cultural y ecológico. La biodiversidad única del Chocó ofrece oportunidades para el ecoturismo.',
  biodiversidad: 'El Chocó biogeográfico es una de las regiones más biodiversas del planeta. Con altos niveles de precipitación, alberga una inmensa variedad de especies de flora y fauna, muchas de ellas endémicas.',
  gastronomia: 'La gastronomía chocoana se caracteriza por el uso del coco, pescados frescos y plátano. Los platos reflejan la fusión de tradiciones africanas, indígenas y españolas.'
};
