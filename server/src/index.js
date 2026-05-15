import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { randomUUID } from 'crypto';
import pool from './db.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Insertar usuario de prueba si no existe al arrancar
async function seedTestUser() {
  try {
    const [existing] = await pool.query('SELECT id FROM usuarios WHERE email = ?', ['elsapalacios@gmail.com']);
    if (existing.length === 0) {
      await pool.query(
        'INSERT INTO usuarios (id, name, email, password) VALUES (?, ?, ?, ?)',
        [randomUUID(), 'Elsa Palacios', 'elsapalacios@gmail.com', '1234567P']
      );
    }
  } catch (err) {
    console.error('Error al crear usuario de prueba:', err.message);
  }
}

app.get('/api/zonas', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM zonas_emblematicas');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/eventos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM eventos_culturales');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/hospedajes', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT h.*, GROUP_CONCAT(hs.servicio ORDER BY hs.id SEPARATOR '|||') AS servicios
      FROM hospedajes h
      LEFT JOIN hospedajes_servicios hs ON h.id = hs.hospedajeId
      GROUP BY h.id
    `);
    const result = rows.map(r => ({ ...r, servicios: r.servicios ? r.servicios.split('|||') : [] }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/restaurantes', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM restaurantes');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/tours', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT t.*, GROUP_CONCAT(ti.item ORDER BY ti.id SEPARATOR '|||') AS incluye
      FROM tours t
      LEFT JOIN tours_incluye ti ON t.id = ti.tourId
      GROUP BY t.id
    `);
    const result = rows.map(r => ({ ...r, incluye: r.incluye ? r.incluye.split('|||') : [] }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/platos', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, GROUP_CONCAT(pi.ingrediente ORDER BY pi.id SEPARATOR '|||') AS ingredientes
      FROM platos_tipicos p
      LEFT JOIN platos_ingredientes pi ON p.id = pi.platoId
      GROUP BY p.id
    `);
    const result = rows.map(r => ({ ...r, ingredientes: r.ingredientes ? r.ingredientes.split('|||') : [] }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/historia', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM historia_quibdo');
    const historia = {};
    rows.forEach(r => { historia[r.clave] = r.valor; });
    res.json(historia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/opiniones', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM opiniones ORDER BY date DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/opiniones', async (req, res) => {
  const { userId, userName, rating, comment, recommendation, category } = req.body;
  if (!userId || !userName || !rating || !comment) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  try {
    const id = randomUUID();
    const date = new Date().toISOString().split('T')[0];
    await pool.query(
      'INSERT INTO opiniones (id, userId, userName, rating, comment, recommendation, date, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, userId, userName, rating, comment, recommendation || null, date, category || 'general']
    );
    res.status(201).json({ id, userId, userName, rating, comment, recommendation, date, category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/usuarios', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email FROM usuarios');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  try {
    const [existing] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'El correo ya está registrado' });
    }
    const id = randomUUID();
    await pool.query(
      'INSERT INTO usuarios (id, name, email, password) VALUES (?, ?, ?, ?)',
      [id, name, email, password]
    );
    res.status(201).json({ id, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  try {
    const [rows] = await pool.query(
      'SELECT id, name, email FROM usuarios WHERE email = ? AND password = ?',
      [email, password]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  await seedTestUser();
});
