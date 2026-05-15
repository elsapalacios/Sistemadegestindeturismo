# Sistema de Gestión de Turismo — Quibdó

Aplicación web de turismo para la ciudad de **Quibdó, Chocó (Colombia)**. Permite explorar zonas emblemáticas, eventos culturales, hospedajes, restaurantes, tours y gastronomía típica. Los visitantes pueden registrarse, iniciar sesión y dejar opiniones.

---

## Tecnologías

| Capa | Stack |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| UI | Shadcn UI + Radix UI + Tailwind CSS 4 |
| Enrutamiento | React Router v7 |
| Backend | Node.js + Express 4 |
| Base de datos | MySQL / MariaDB (compatible con MAMP) |
| ORM/Driver | mysql2 |

---

## Requisitos previos

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- MySQL o MariaDB corriendo localmente (MAMP, XAMPP, etc.)

---

## Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd Sistemadegestindeturismo
```

### 2. Instalar dependencias

```bash
# Frontend
pnpm install

# Backend
cd server && npm install && cd ..
```

### 3. Configurar variables de entorno

**Frontend** — crear `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:4000
```

**Backend** — crear `server/.env`:

```env
DB_HOST=127.0.0.1
DB_PORT=8889
DB_USER=root
DB_PASSWORD=root
DB_NAME=quibdo_turismo
PORT=4000
```

> Si usas MAMP, el `db.js` ya está configurado para conectar vía socket Unix (`/Applications/MAMP/tmp/mysql/mysql.sock`). Ajusta `server/src/db.js` si usas otro servidor MySQL.

### 4. Crear e importar la base de datos

Crea la base de datos `quibdo_turismo` desde phpMyAdmin o desde la terminal:

```bash
# Con MAMP
/Applications/MAMP/Library/bin/mysql -u root -proot -P 8889 -e "CREATE DATABASE quibdo_turismo CHARACTER SET utf8mb4;"
/Applications/MAMP/Library/bin/mysql -u root -proot -P 8889 quibdo_turismo < turismo.sql
```

---

## Ejecución en desarrollo

Abre **dos terminales**:

```bash
# Terminal 1 — Backend (puerto 4000)
cd server
npm run dev

# Terminal 2 — Frontend (puerto 5173)
pnpm dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

---

## Estructura del proyecto

```
Sistemadegestindeturismo/
├── src/                        # Frontend React
│   ├── app/
│   │   ├── api.ts              # Capa de fetch centralizada
│   │   ├── context/
│   │   │   └── AuthContext.tsx # Autenticación global
│   │   ├── data/
│   │   │   └── tourismData.ts  # Interfaces TypeScript
│   │   ├── pages/              # Páginas de la app
│   │   │   ├── Home.tsx
│   │   │   ├── Restaurantes.tsx
│   │   │   ├── Hospedaje.tsx
│   │   │   ├── Tours.tsx
│   │   │   ├── Historia.tsx
│   │   │   ├── Opiniones.tsx
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   └── components/         # Componentes UI (Shadcn)
│   └── imports/                # Imágenes locales
├── server/                     # Backend Express
│   ├── src/
│   │   ├── index.js            # API REST (endpoints)
│   │   └── db.js               # Pool de conexión MySQL
│   └── package.json
├── turismo.sql                 # Dump de la base de datos
└── vite.config.ts
```

---

## API REST

Base URL: `http://localhost:4000`

### Datos turísticos

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/zonas` | Zonas emblemáticas |
| GET | `/api/eventos` | Eventos culturales |
| GET | `/api/hospedajes` | Hospedajes (con servicios) |
| GET | `/api/restaurantes` | Restaurantes |
| GET | `/api/tours` | Tours (con lo que incluyen) |
| GET | `/api/platos` | Platos típicos (con ingredientes) |
| GET | `/api/historia` | Historia y cultura de Quibdó |
| GET | `/api/opiniones` | Opiniones de visitantes |
| POST | `/api/opiniones` | Publicar una opinión |

### Autenticación

| Método | Ruta | Body | Descripción |
|---|---|---|---|
| POST | `/api/auth/register` | `{ name, email, password }` | Registrar usuario |
| POST | `/api/auth/login` | `{ email, password }` | Iniciar sesión |

---

## Credenciales de prueba

```
Correo:    elsapalacios@gmail.com
Contraseña: 1234567P
```

> Este usuario se crea automáticamente en la base de datos cuando el servidor arranca por primera vez.

---

## Base de datos

El archivo `turismo.sql` contiene la estructura y los datos iniciales:

| Tabla | Descripción |
|---|---|
| `usuarios` | Cuentas de usuario |
| `zonas_emblematicas` | Lugares icónicos de Quibdó |
| `eventos_culturales` | Festival de San Pacho, etc. |
| `hospedajes` | Hoteles y hostales |
| `hospedajes_servicios` | Servicios por hospedaje |
| `restaurantes` | Restaurantes locales |
| `tours` | Tours disponibles |
| `tours_incluye` | Ítems incluidos por tour |
| `platos_tipicos` | Gastronomía chocoana |
| `platos_ingredientes` | Ingredientes por plato |
| `historia_quibdo` | Textos históricos y culturales |
| `opiniones` | Reseñas de visitantes |
