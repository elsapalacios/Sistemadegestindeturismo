-- ============================================================
-- Base de datos de turismo de Quibdó
-- ============================================================

--CREATE DATABASE IF NOT EXISTS turismo
--  CHARACTER SET utf8mb4
--  COLLATE utf8mb4_unicode_ci;

-- USE turismo;

-- ------------------------------------------------------------
-- Tabla: usuarios
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
  id          VARCHAR(36)  NOT NULL,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(150) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabla: opiniones
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS opiniones (
  id              VARCHAR(36)  NOT NULL,
  userId          VARCHAR(36)  NOT NULL,
  userName        VARCHAR(100) NOT NULL,
  rating          TINYINT      NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment         TEXT,
  recommendation  TEXT,
  date            DATE         NOT NULL,
  category        VARCHAR(100),
  PRIMARY KEY (id),
  CONSTRAINT fk_opiniones_usuario
    FOREIGN KEY (userId) REFERENCES usuarios(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabla: zonas_emblematicas
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS zonas_emblematicas (
  id          VARCHAR(36)   NOT NULL,
  nombre      VARCHAR(200)  NOT NULL,
  descripcion TEXT,
  imagen      VARCHAR(500),
  PRIMARY KEY (id)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabla: eventos_culturales
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS eventos_culturales (
  id          VARCHAR(36)   NOT NULL,
  nombre      VARCHAR(200)  NOT NULL,
  fecha       VARCHAR(100),
  descripcion TEXT,
  imagen      VARCHAR(500),
  ubicacion   VARCHAR(200),
  PRIMARY KEY (id)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabla: hospedajes
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS hospedajes (
  id          VARCHAR(36)   NOT NULL,
  nombre      VARCHAR(200)  NOT NULL,
  descripcion TEXT,
  precio      VARCHAR(100),
  imagen      VARCHAR(500),
  direccion   VARCHAR(255),
  telefono    VARCHAR(30),
  PRIMARY KEY (id)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabla: hospedajes_servicios  (relación 1-N)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS hospedajes_servicios (
  id          INT          NOT NULL AUTO_INCREMENT,
  hospedajeId VARCHAR(36)  NOT NULL,
  servicio    VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_servicios_hospedaje
    FOREIGN KEY (hospedajeId) REFERENCES hospedajes(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabla: restaurantes
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS restaurantes (
  id              VARCHAR(36)   NOT NULL,
  nombre          VARCHAR(200)  NOT NULL,
  descripcion     TEXT,
  especialidad    TEXT,
  imagen          VARCHAR(500),
  horario         VARCHAR(150),
  direccion       VARCHAR(255),
  telefono        VARCHAR(30),
  precioPromedio  VARCHAR(80),
  PRIMARY KEY (id)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabla: tours
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tours (
  id          VARCHAR(36)   NOT NULL,
  nombre      VARCHAR(200)  NOT NULL,
  descripcion TEXT,
  duracion    VARCHAR(50),
  precio      VARCHAR(80),
  imagen      VARCHAR(500),
  dificultad  VARCHAR(50),
  PRIMARY KEY (id)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabla: tours_incluye  (relación 1-N)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tours_incluye (
  id      INT          NOT NULL AUTO_INCREMENT,
  tourId  VARCHAR(36)  NOT NULL,
  item    VARCHAR(150) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_incluye_tour
    FOREIGN KEY (tourId) REFERENCES tours(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabla: platos_tipicos
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS platos_tipicos (
  id          VARCHAR(36)   NOT NULL,
  nombre      VARCHAR(200)  NOT NULL,
  descripcion TEXT,
  imagen      VARCHAR(500),
  PRIMARY KEY (id)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabla: platos_ingredientes  (relación 1-N)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS platos_ingredientes (
  id        INT          NOT NULL AUTO_INCREMENT,
  platoId   VARCHAR(36)  NOT NULL,
  ingrediente VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_ingredientes_plato
    FOREIGN KEY (platoId) REFERENCES platos_tipicos(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabla: historia_quibdo  (registro único, clave-valor)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS historia_quibdo (
  clave VARCHAR(50)  NOT NULL,
  valor TEXT        NOT NULL,
  PRIMARY KEY (clave)
) ENGINE=InnoDB;


-- ============================================================
-- DATOS DE EJEMPLO
-- ============================================================

-- Zonas emblemáticas
INSERT INTO zonas_emblematicas (id, nombre, descripcion, imagen) VALUES
('1', 'Catedral de San Francisco de Asís',
 'Hermosa catedral de estilo gótico ubicada en el centro de Quibdó, símbolo religioso y arquitectónico de la ciudad.',
 '/src/imports/image.png'),
('2', 'Malecón del Río Atrato',
 'Paseo peatonal a orillas del majestuoso río Atrato, ideal para caminar y disfrutar de la brisa.',
 '/src/imports/image-1.png'),
('3', 'Plaza de Mercado',
 'Centro comercial tradicional donde se puede apreciar la cultura local, productos frescos y artesanías.',
 'https://images.unsplash.com/photo-1634118908433-ee63c458516b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080');

-- Eventos culturales
INSERT INTO eventos_culturales (id, nombre, fecha, descripcion, imagen, ubicacion) VALUES
('1', 'Festival de San Pacho',
 'Septiembre 20 - Octubre 5',
 'La fiesta patronal más importante del Chocó, declarada Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO. Incluye música, danzas, procesiones y gastronomía.',
 'https://images.unsplash.com/photo-1771980590196-7b0e0c58b99b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
 'Centro de Quibdó'),
('2', 'Festival de Música del Pacífico Petronio Álvarez',
 'Agosto',
 'Celebración de la música tradicional del Pacífico colombiano con chirimías, currulaos y alabaos.',
 'https://images.unsplash.com/photo-1771980590196-7b0e0c58b99b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
 'Plaza Cultural'),
('3', 'Semana Santa',
 'Marzo/Abril',
 'Celebraciones religiosas con procesiones y actividades tradicionales.',
 'https://images.unsplash.com/photo-1559555686-44c2dd5fb708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
 'Catedral de San Francisco');

-- Hospedajes
INSERT INTO hospedajes (id, nombre, descripcion, precio, imagen, direccion, telefono) VALUES
('1', 'Hotel Citará',
 'Hotel moderno en el centro de Quibdó con excelentes servicios y comodidades.',
 'Desde $150,000 COP por noche',
 'https://images.unsplash.com/photo-1719241367647-718f2f7e8956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
 'Carrera 3 #27-30, Centro', '+57 4 672 1234'),
('2', 'Hostal del Río',
 'Alojamiento acogedor cerca al malecón con vista al río Atrato.',
 'Desde $80,000 COP por noche',
 'https://images.unsplash.com/photo-1719241367647-718f2f7e8956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
 'Calle 25 #4-15, Malecón', '+57 4 672 5678'),
('3', 'Hotel San Francisco',
 'Hotel tradicional frente a la catedral, ideal para turistas.',
 'Desde $120,000 COP por noche',
 'https://images.unsplash.com/photo-1719241367647-718f2f7e8956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
 'Carrera 2 #26-10, Centro', '+57 4 672 9012');

-- Servicios de hospedajes
INSERT INTO hospedajes_servicios (hospedajeId, servicio) VALUES
('1', 'WiFi gratis'), ('1', 'Aire acondicionado'), ('1', 'Restaurante'), ('1', 'Piscina'), ('1', 'Parqueadero'),
('2', 'WiFi'), ('2', 'Desayuno incluido'), ('2', 'Ventilador'), ('2', 'Cocina compartida'),
('3', 'WiFi'), ('3', 'TV por cable'), ('3', 'Aire acondicionado'), ('3', 'Servicio a la habitación');

-- Restaurantes
INSERT INTO restaurantes (id, nombre, descripcion, especialidad, imagen, horario, direccion, telefono, precioPromedio) VALUES
('1', 'Sabor Chocoano',
 'Restaurante especializado en comida típica del Pacífico colombiano.',
 'Pescado con coco, arroz con coco, sancocho de pescado',
 'https://images.unsplash.com/photo-1759375341361-00f9054cd5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
 'Lunes a Domingo: 11:00 AM - 10:00 PM',
 'Carrera 4 #28-15', '+57 4 672 3456', '$25,000 - $40,000 COP'),
('2', 'El Atrato',
 'Restaurante con vista al río, famoso por sus mariscos frescos.',
 'Langostinos, cazuela de mariscos, patacones con hogao',
 'https://images.unsplash.com/photo-1759375341361-00f9054cd5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
 'Martes a Domingo: 12:00 PM - 11:00 PM',
 'Malecón, Calle 24 #5-20', '+57 4 672 7890', '$30,000 - $50,000 COP'),
('3', 'La Fogata Pacífica',
 'Comidas rápidas y platos tradicionales en ambiente familiar.',
 'Empanadas de pescado, tapao de pescado, jugos naturales',
 'https://images.unsplash.com/photo-1634118908433-ee63c458516b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
 'Lunes a Sábado: 8:00 AM - 8:00 PM',
 'Carrera 3 #25-08', '+57 4 672 4567', '$15,000 - $30,000 COP');

-- Tours
INSERT INTO tours (id, nombre, descripcion, duracion, precio, imagen, dificultad) VALUES
('1', 'Tour por el Río Atrato',
 'Recorrido en lancha por el río navegable más caudaloso del mundo, observando la biodiversidad única del Chocó.',
 '4 horas', '$80,000 COP por persona',
 'https://images.unsplash.com/photo-1707502275695-2258b614753f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
 'Fácil'),
('2', 'Caminata Ecológica al Jardín Botánico',
 'Exploración de la flora y fauna del Chocó biogeográfico en el jardín botánico del Pacífico.',
 '3 horas', '$50,000 COP por persona',
 'https://images.unsplash.com/photo-1707502275695-2258b614753f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
 'Moderada'),
('3', 'Tour Cultural por Quibdó',
 'Recorrido por los sitios históricos y culturales de la ciudad, incluyendo la catedral, museos y plazas.',
 '2.5 horas', '$40,000 COP por persona',
 'https://images.unsplash.com/photo-1559555686-44c2dd5fb708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
 'Fácil');

-- Ítems incluidos en tours
INSERT INTO tours_incluye (tourId, item) VALUES
('1', 'Transporte en lancha'), ('1', 'Guía local'), ('1', 'Refrigerio'), ('1', 'Chaleco salvavidas'),
('2', 'Guía especializado'), ('2', 'Entrada al jardín'), ('2', 'Refrigerio'), ('2', 'Binoculares'),
('3', 'Guía local'), ('3', 'Entrada a museos'), ('3', 'Degustación de dulces típicos');

-- Platos típicos
INSERT INTO platos_tipicos (id, nombre, descripcion, imagen) VALUES
('1', 'Sancocho de Pescado',
 'Sopa tradicional del Pacífico con pescado fresco, plátano, yuca y especias.',
 'https://images.unsplash.com/photo-1634118908433-ee63c458516b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'),
('2', 'Arroz con Coco',
 'Arroz cocinado con leche de coco, pasas y azúcar, acompañamiento perfecto para pescado.',
 'https://images.unsplash.com/photo-1634118908433-ee63c458516b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'),
('3', 'Tapao de Pescado',
 'Guiso de pescado con leche de coco, plátano y especias, servido en hoja de bijao.',
 'https://images.unsplash.com/photo-1634118908433-ee63c458516b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'),
('4', 'Bacano',
 'Postre tradicional hecho con plátano maduro, coco y panela.',
 'https://images.unsplash.com/photo-1634118908433-ee63c458516b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080');

-- Ingredientes de platos
INSERT INTO platos_ingredientes (platoId, ingrediente) VALUES
('1', 'Pescado fresco'), ('1', 'Plátano'), ('1', 'Yuca'), ('1', 'Cilantro'), ('1', 'Cebolla'), ('1', 'Ajo'),
('2', 'Arroz'), ('2', 'Coco rallado'), ('2', 'Leche de coco'), ('2', 'Pasas'), ('2', 'Azúcar'), ('2', 'Sal'),
('3', 'Pescado'), ('3', 'Leche de coco'), ('3', 'Plátano verde'), ('3', 'Yuca'), ('3', 'Cebolla'), ('3', 'Tomate'),
('4', 'Plátano maduro'), ('4', 'Coco rallado'), ('4', 'Panela'), ('4', 'Canela');

-- Historia de Quibdó
INSERT INTO historia_quibdo (clave, valor) VALUES
('resumen',       'Quibdó es la capital del departamento de Chocó, ubicada en el occidente de Colombia. Fundada en 1654, es una ciudad rica en cultura afrocolombiana e indígena. El río Atrato ha sido históricamente la arteria vital de la ciudad, facilitando el comercio y la comunicación.'),
('cultura',       'La cultura de Quibdó es vibrante y diversa, con fuertes raíces africanas e indígenas. La música, especialmente la chirimía y el currulao, son expresiones artísticas fundamentales. El Festival de San Pacho, declarado Patrimonio Cultural Inmaterial de la Humanidad, es la máxima expresión de su identidad cultural.'),
('economia',      'La economía se basa principalmente en la minería, la pesca, el comercio y cada vez más en el turismo cultural y ecológico. La biodiversidad única del Chocó ofrece oportunidades para el ecoturismo.'),
('biodiversidad', 'El Chocó biogeográfico es una de las regiones más biodiversas del planeta. Con altos niveles de precipitación, alberga una inmensa variedad de especies de flora y fauna, muchas de ellas endémicas.'),
('gastronomia',   'La gastronomía chocoana se caracteriza por el uso del coco, pescados frescos y plátano. Los platos reflejan la fusión de tradiciones africanas, indígenas y españolas.');
