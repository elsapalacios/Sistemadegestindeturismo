-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-05-2026 a las 02:44:08
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `turismo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos_culturales`
--

CREATE TABLE `eventos_culturales` (
  `id` varchar(36) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `fecha` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `imagen` varchar(500) DEFAULT NULL,
  `ubicacion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `eventos_culturales`
--

INSERT INTO `eventos_culturales` (`id`, `nombre`, `fecha`, `descripcion`, `imagen`, `ubicacion`) VALUES
('1', 'Festival de San Pacho', 'Septiembre 20 - Octubre 5', 'La fiesta patronal más importante del Chocó, declarada Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO. Incluye música, danzas, procesiones y gastronomía.', 'https://www.otraparte.org/wp-content/uploads/fiestas-de-san-pacho-2.jpg', 'Centro de Quibdó'),
('2', 'La Alborada', 'Septiembre 3', 'Tradicional inicio de las fiestas de San Pacho, donde la comunidad recorre las calles al amanecer con música de chirimía.', 'https://choco7dias.com/wp-content/uploads/2022/09/image-11.png', 'Calles de Quibdó'),
('3', 'Semana Santa', 'Marzo/Abril', 'Celebraciones religiosas con procesiones y actividades tradicionales.', 'https://choco7dias.com/wp-content/uploads/2025/04/obispo-wiston-baculo.jpg', 'Catedral de San Francisco');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historia_quibdo`
--

CREATE TABLE `historia_quibdo` (
  `clave` varchar(50) NOT NULL,
  `valor` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historia_quibdo`
--

INSERT INTO `historia_quibdo` (`clave`, `valor`) VALUES
('biodiversidad', 'El Chocó biogeográfico es una de las regiones más biodiversas del planeta. Con altos niveles de precipitación, alberga una inmensa variedad de especies de flora y fauna, muchas de ellas endémicas.'),
('cultura', 'La cultura de Quibdó es vibrante y diversa, con fuertes raíces africanas e indígenas. La música, especialmente la chirimía y el currulao, son expresiones artísticas fundamentales. El Festival de San Pacho, declarado Patrimonio Cultural Inmaterial de la Humanidad, es la máxima expresión de su identidad cultural.'),
('economia', 'La economía se basa principalmente en la minería, la pesca, el comercio y cada vez más en el turismo cultural y ecológico. La biodiversidad única del Chocó ofrece oportunidades para el ecoturismo.'),
('gastronomia', 'La gastronomía chocoana se caracteriza por el uso del coco, pescados frescos y plátano. Los platos reflejan la fusión de tradiciones africanas, indígenas y españolas.'),
('resumen', 'Quibdó es la capital del departamento de Chocó, ubicada en el occidente de Colombia. Fundada en 1654, es una ciudad rica en cultura afrocolombiana e indígena. El río Atrato ha sido históricamente la arteria vital de la ciudad, facilitando el comercio y la comunicación.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hospedajes`
--

CREATE TABLE `hospedajes` (
  `id` varchar(36) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` varchar(100) DEFAULT NULL,
  `imagen` varchar(500) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hospedajes`
--

INSERT INTO `hospedajes` (`id`, `nombre`, `descripcion`, `precio`, `imagen`, `direccion`, `telefono`) VALUES
('1', 'Hotel Shaira', 'Hotel moderno en el centro de Quibdó con excelentes servicios y comodidades.', 'Desde $154,000 COP por noche', 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/183114106.jpg?k=80cc955be4da918193fd956e00d5381094f04929fd675277acaa78134bf38151&o=', 'Carrera 5 #27-15, Centro', '+57 4 672 1234'),
('2', 'MIA Hotel Chocó', 'Nuestra innovadora propuesta de alojamiento combina un oasis de descanso con un concepto de fusión étnica que se descubre en el diseño, en el servicio de Boga Restaurante Bar, en los Salones de eventos y en el maravilloso personal que le cuidará durante toda su estadía.', 'Desde $220,336 COP por noche', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/02/a3/63/getlstd-property-photo.jpg?w=1100&h=600&s=1', 'Barrio los Ángeles, Centro Comercial el Caraño, 270001 Quibdó, Colombia', '+57 4 672 5678'),
('3', 'HOTEL BOHO BOUTIQUE', 'HOTEL BOHO BOUTIQUE, que cuenta con bar, está en Quibdó. Este alojamiento, que tiene servicio de habitaciones, también ofrece terraza. El alojamiento dispone de recepción 24 horas y servicio de organización de tours.\n\nTodas las habitaciones de este alojamiento están equipadas con TV de pantalla plana. Las habitaciones de este alojamiento disponen de wifi gratis y de baño privado con ducha y artículos de aseo gratuitos. En el hotel, las habitaciones cuentan con ropa de cama y toallas.\n\nEl aeropuerto (Aeropuerto de El Caraño) está a 2 km.\n\nA las parejas les encanta la ubicación — Le han puesto un 8,0 para viajes de dos personas.', 'Desde $165,600 COP por noche', 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/512219160.jpg?k=02aa291ee49c6d6868e1bc5d2eca74b382f7d4e5c2b2b3b87c1b2c0f7da36241&o=', 'Carrera 3 # 25-32, 270002 Quibdó, Colombia.', '+57 4 672 9012');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hospedajes_servicios`
--

CREATE TABLE `hospedajes_servicios` (
  `id` int(11) NOT NULL,
  `hospedajeId` varchar(36) NOT NULL,
  `servicio` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hospedajes_servicios`
--

INSERT INTO `hospedajes_servicios` (`id`, `hospedajeId`, `servicio`) VALUES
(14, '1', 'WiFi gratis'),
(15, '1', 'Aire acondicionado'),
(16, '1', 'Restaurante'),
(17, '1', 'Piscina'),
(18, '2', 'WiFi'),
(19, '2', 'Desayuno incluido'),
(20, '2', 'Restaurante Bar'),
(21, '3', 'WiFi'),
(22, '3', 'Aire acondicionado'),
(23, '3', 'Servicio a la habitación'),
(24, '3', 'Habitaciones familiares'),
(25, '3', 'Bar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opiniones`
--

CREATE TABLE `opiniones` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `userName` varchar(100) NOT NULL,
  `rating` tinyint(4) NOT NULL,
  `comment` text DEFAULT NULL,
  `recommendation` text DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `category` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `opiniones`
--

INSERT INTO `opiniones` (`id`, `userId`, `userName`, `rating`, `comment`, `recommendation`, `date`, `category`) VALUES
('8c7eea45-204e-4868-9d13-10638731b475', 'u_elsa_001', 'Elsa Palacios', 5, 'La comida es buenísima y el ambiente es muy acogedor', 'Super recomendados, vale la pena', '2026-05-16 00:00:00', 'restaurantes'),
('950c2ae3-231f-48d2-a1dc-e169751a91f2', '58470d1b-d5f2-42dd-8d6d-d5ae4fc7d79f', 'Franchesca', 5, 'Gau es todo muy lindo la verda', 'Claro, les va a encantar', '2026-05-16 00:00:00', 'general');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platos_ingredientes`
--

CREATE TABLE `platos_ingredientes` (
  `id` int(11) NOT NULL,
  `platoId` varchar(36) NOT NULL,
  `ingrediente` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `platos_ingredientes`
--

INSERT INTO `platos_ingredientes` (`id`, `platoId`, `ingrediente`) VALUES
(23, '1', 'Pescado fresco'),
(24, '1', 'Plátano'),
(25, '1', 'Yuca'),
(26, '1', 'Cilantro'),
(27, '1', 'Cebolla'),
(28, '1', 'Ajo'),
(35, '2', 'Arroz'),
(36, '2', 'Coco'),
(37, '2', 'Leche de coco'),
(38, '2', 'Pasas'),
(39, '2', 'Azúcar'),
(40, '2', 'Sal'),
(47, '3', 'Pescado'),
(48, '3', 'Leche de coco'),
(49, '3', 'Plátano verde'),
(50, '3', 'Yuca'),
(51, '3', 'Cebolla'),
(52, '3', 'Tomate'),
(53, '4', 'Coco rallado'),
(54, '4', 'Panela'),
(55, '4', 'Canela'),
(56, '4', 'Azúcar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platos_tipicos`
--

CREATE TABLE `platos_tipicos` (
  `id` varchar(36) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `imagen` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `platos_tipicos`
--

INSERT INTO `platos_tipicos` (`id`, `nombre`, `descripcion`, `imagen`) VALUES
('1', 'Sancocho de Pescado', 'Sopa tradicional del Pacífico con pescado fresco, plátano, yuca y especias.', 'https://i0.wp.com/www.zampatelmundo.com/wp-content/uploads/2022/03/Sancocho-de-lubina.jpeg?w=1242&ssl=1'),
('2', 'Arroz con Coco', 'Arroz cocinado con leche de coco, pasas y azúcar, acompañamiento perfecto para pescado.', 'https://cdn0.recetasgratis.net/es/posts/1/1/2/arroz_con_coco_caribeno_53211_1200.webp'),
('3', 'Tapao de Pescado', 'Guiso de pescado con leche de coco, plátano y especias, servido en hoja de bijao.', 'https://img.goraymi.com/2018/06/28/5733bac6cfd2882a46a3f72946cd27c2_xl.jpg'),
('4', 'Cocadas', 'El dulce por excelencia de las costas colombianas, elaborado con coco rallado y panela o azúcar.', 'https://www.elespectador.com/resizer/v2/FZGJSIB7IZH45JB7WBD7NXOFR4.jpg?auth=8658819118112aa5187ea066af5e999bff8cdbb18604520713df48517a5ea4f0&width=920&height=613&smart=true&quality=60');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` varchar(36) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `itemId` varchar(36) NOT NULL,
  `itemNombre` varchar(200) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `userName` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `personas` int(11) NOT NULL DEFAULT 1,
  `notas` text DEFAULT NULL,
  `estado` varchar(20) DEFAULT 'pendiente',
  `createdAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id`, `tipo`, `itemId`, `itemNombre`, `userId`, `userName`, `fecha`, `personas`, `notas`, `estado`, `createdAt`) VALUES
('050d5978-4850-43d3-97a9-a57478767ba5', 'tour', '1', 'Tour por el Río Atrato', 'u_elsa_001', 'Elsa Palacios', '2026-05-29', 2, NULL, 'pendiente', '2026-05-15 22:43:46'),
('2a3bc36c-c05a-4f70-8c7f-cde21647e7eb', 'tour', '1', 'Tour por el Río Atrato', 'bc4f7445-a60f-492f-9d1e-b466016dd492', 'Lina López', '2026-05-29', 1, 'No', 'cancelada', '2026-05-15 15:20:46'),
('4aac9c94-5ff0-491e-9fa7-4e871f3fdf7c', 'hospedaje', '2', 'MIA Hotel Chocó', '58470d1b-d5f2-42dd-8d6d-d5ae4fc7d79f', 'Franchesca', '2026-05-31', 2, 'Cena romántica', 'pendiente', '2026-05-15 22:53:37'),
('992b1e9e-9b7e-4123-95c9-ce2bf399c730', 'hospedaje', '1', 'Hotel Shaira', 'u_elsa_001', 'Elsa Palacios', '2026-05-29', 2, 'Para un aniversario', 'confirmada', '2026-05-15 22:42:55');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restaurantes`
--

CREATE TABLE `restaurantes` (
  `id` varchar(36) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `especialidad` text DEFAULT NULL,
  `imagen` varchar(500) DEFAULT NULL,
  `horario` varchar(150) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `precioPromedio` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `restaurantes`
--

INSERT INTO `restaurantes` (`id`, `nombre`, `descripcion`, `especialidad`, `imagen`, `horario`, `direccion`, `telefono`, `precioPromedio`) VALUES
('1', 'La Paila de Mi Abuela', 'Restaurante especializado en comida típica del Pacífico colombiano.', 'Arroz Atollao Chocoano, Sancocho de las Tres Carnes, Mero Encocado o Pargo Sudado en Coco, Enyucados y Queso Frito', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/d9/ce/6e/img-20190317-wa0003-largejpg.jpg?w=1400&h=-1&s=1', 'Martes a Viernes: 8:00 AM a 3:30 PM - Domingos y Lunes: 8:30 AM a 3:30 PM', 'Carrera 2 #26-66 AL Lado de la Catedral, Quibdó 270001 Colombia', '+57 4 671 4061', '$30,000 COP - $60,000 COP'),
('2', 'Brisas del Atrato', 'Restaurante con vista al río, famoso por sus Cazuela de Mariscos.\n\nEste restaurante se encuentra a orillas del río Atrato en la ciudad de Quibdó, cuando llegues al restaurante es mejor que te ubiques en las mesas que se encuentran frente al río porque así tu recibes la brisa y observarás el paisaje todo el tiempo.', 'Langostinos, Cazuela de Mariscos, Patacones con Hogao, Dientón Ahumado del Atrato, Queso Apanado, Salmón al Horno', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/64/b6/62/mesas-frente-al-rio.jpg?w=2000&h=-1&s=1', 'Lunes a Domingo: 10:00 AM a 10:00 PM', 'Calle 1 #33-03', '+57 4 671 1781', '$40,000 COP - $140,000 COP'),
('3', 'Al Carbón Parilla Bar', 'Este establecimiento está ubicado en una esquina estratégica de la Zona Rosa de Quibdó (Calle 31 con Carrera 2). Cuenta con un espacio cerrado con aire acondicionado, siendo un lugar muy concurrido para reuniones, celebraciones especiales o citas románticas debido a su ambiente contemporáneo y ejecutivo.', 'Cortes de res y cerdo, Acompañamientos: Tostones de plátano (patacones) tradicionales de la región, Coctelería de Autor: Cuentan con una barra de licores especializada que ofrece cócteles inspirados en la cultura chocoana (como su famoso cóctel Manduco)', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/62/ac/38/un-lugar-diferente.jpg?w=1400&h=-1&s=1', 'Lunes a Domingo: 12:00 PM a 12:00 AM (Medianoche)', 'Calle 31 Zona Rosa Quibo Frente al parque, Quibdó 270001 Colombia', '+57 4 670 7060', '$40,000 COP - $60,000 COP');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tours`
--

CREATE TABLE `tours` (
  `id` varchar(36) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `duracion` varchar(50) DEFAULT NULL,
  `precio` varchar(80) DEFAULT NULL,
  `imagen` varchar(500) DEFAULT NULL,
  `dificultad` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tours`
--

INSERT INTO `tours` (`id`, `nombre`, `descripcion`, `duracion`, `precio`, `imagen`, `dificultad`) VALUES
('1', 'Tour por el Río Atrato', 'Recorrido en lancha por el río navegable más caudaloso del mundo, observando la biodiversidad única del Chocó.', '4 horas', 'Paseo básico en el Malecón de Quibdó ($25,000 COP) - Sendero de Beté en el Medio', 'https://colombiavisible.com/wp-content/uploads/2025/07/Foto-3-Champa-Mia-1536x864.jpg', 'Fácil'),
('2', 'Sendero Ecológico Tutunendo', 'Exploración de la flora y fauna del Chocó biogeográfico en el Sendero Ecológico Tutunendo.\n\nInfraestructura cómoda: Está construido con una combinación de madera, piedra y cemento, lo que facilita el acceso para personas de casi todas las edades.Atractivo principal: El camino bordea las aguas cristalinas del río y culmina en una caída de agua natural llamada Sal de Frutas, nombrada así por el efecto efervescente que genera el agua al chocar con las rocas.Retorno alternativo: Algunos operadores ofrecen la opción de regresar flotando río abajo sobre llantas inflables (tubing) en lugar de caminar de vuelta.', '1.5 a 2 horas', 'Entrada autónoma de $5,000 COP por persona, mientras que los tours guiados con t', 'https://choco7dias.com/wp-content/uploads/2020/09/tutunendo-sendero-ecologico-quibdo-choco.jpg', 'Moderada'),
('3', 'Ichotur', 'Recorrido por los sitios históricos y culturales del pueblo, incluyendo los paisajes, hoteles e iglesia.', '2.5 horas', '$40,000 COP por persona', 'https://s0.wklcdn.com/image_123/3691648/30931891/19841373.700x525.jpg', 'Fácil');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tours_incluye`
--

CREATE TABLE `tours_incluye` (
  `id` int(11) NOT NULL,
  `tourId` varchar(36) NOT NULL,
  `item` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tours_incluye`
--

INSERT INTO `tours_incluye` (`id`, `tourId`, `item`) VALUES
(22, '2', 'Guía especializado'),
(23, '2', 'Entrada al sendero'),
(24, '1', 'Transporte en lancha'),
(25, '1', 'Guía local'),
(26, '1', 'Chaleco salvavidas'),
(27, '3', 'Guía local');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `name`, `email`, `password`) VALUES
('58470d1b-d5f2-42dd-8d6d-d5ae4fc7d79f', 'Franchesca', 'fran@gmail.com', '1234567F'),
('bc4f7445-a60f-492f-9d1e-b466016dd492', 'Lina López', 'lin26@gmail.com', '12345L'),
('u6a0678eb4fd4a4.17855097', 'Meredithn Grey', 'mer@gmail.com', '$2y$10$E4yold2ZP4ISJrCVF.eIPOjqBSXx6O2/T4WdTzgC18eaWvLuB0loi'),
('u_elsa_001', 'Elsa Palacios', 'elsapalacios@gmail.com', '1234567P');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zonas_emblematicas`
--

CREATE TABLE `zonas_emblematicas` (
  `id` varchar(36) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `imagen` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `zonas_emblematicas`
--

INSERT INTO `zonas_emblematicas` (`id`, `nombre`, `descripcion`, `imagen`) VALUES
('1', 'Catedral de San Francisco de Asís', 'Hermosa catedral de estilo gótico ubicada en el centro de Quibdó, símbolo religioso y arquitectónico de la ciudad.', 'https://www.elpais.com.co/resizer/v2/D3DK5L4PUJAY3DOIUF5NIQYOV4.jpg?auth=34aedcb40721eb4ee0a4130062447379fa3d9cb5548b3c6c043a5d084ee37413&smart=true&quality=75&width=1280&height=720'),
('2', 'Malecón del Río Atrato', 'Paseo peatonal a orillas del majestuoso río Atrato, ideal para caminar y disfrutar de la brisa.', 'https://revistaaxxis.com.co/wp-content/smush-webp/2025/07/Quibdo_CoCrea_9-1024x683-1.png.webp'),
('3', 'Plaza de Mercado', 'Comercio tradicional donde se puede apreciar la cultura local, productos frescos y artesanías.', 'https://elbaudoseno.com/wp-content/uploads/2025/12/elbaudoseno_2025_12_renovacion_plaza_de_mercado_de_quibdo_choco-6.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `eventos_culturales`
--
ALTER TABLE `eventos_culturales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `historia_quibdo`
--
ALTER TABLE `historia_quibdo`
  ADD PRIMARY KEY (`clave`);

--
-- Indices de la tabla `hospedajes`
--
ALTER TABLE `hospedajes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `hospedajes_servicios`
--
ALTER TABLE `hospedajes_servicios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_servicios_hospedaje` (`hospedajeId`);

--
-- Indices de la tabla `opiniones`
--
ALTER TABLE `opiniones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_opiniones_usuario` (`userId`);

--
-- Indices de la tabla `platos_ingredientes`
--
ALTER TABLE `platos_ingredientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ingredientes_plato` (`platoId`);

--
-- Indices de la tabla `platos_tipicos`
--
ALTER TABLE `platos_tipicos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `restaurantes`
--
ALTER TABLE `restaurantes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tours`
--
ALTER TABLE `tours`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tours_incluye`
--
ALTER TABLE `tours_incluye`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_incluye_tour` (`tourId`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `zonas_emblematicas`
--
ALTER TABLE `zonas_emblematicas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `hospedajes_servicios`
--
ALTER TABLE `hospedajes_servicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `platos_ingredientes`
--
ALTER TABLE `platos_ingredientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT de la tabla `tours_incluye`
--
ALTER TABLE `tours_incluye`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `hospedajes_servicios`
--
ALTER TABLE `hospedajes_servicios`
  ADD CONSTRAINT `fk_servicios_hospedaje` FOREIGN KEY (`hospedajeId`) REFERENCES `hospedajes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `opiniones`
--
ALTER TABLE `opiniones`
  ADD CONSTRAINT `fk_opiniones_usuario` FOREIGN KEY (`userId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `platos_ingredientes`
--
ALTER TABLE `platos_ingredientes`
  ADD CONSTRAINT `fk_ingredientes_plato` FOREIGN KEY (`platoId`) REFERENCES `platos_tipicos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tours_incluye`
--
ALTER TABLE `tours_incluye`
  ADD CONSTRAINT `fk_incluye_tour` FOREIGN KEY (`tourId`) REFERENCES `tours` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
