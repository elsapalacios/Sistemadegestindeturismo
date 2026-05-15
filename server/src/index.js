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

async function initDB() {
  try {
    // Usuario de prueba
    const [existing] = await pool.query('SELECT id FROM usuarios WHERE email = ?', ['elsapalacios@gmail.com']);
    if (existing.length === 0) {
      await pool.query(
        'INSERT INTO usuarios (id, name, email, password) VALUES (?, ?, ?, ?)',
        [randomUUID(), 'Elsa Palacios', 'elsapalacios@gmail.com', '1234567P']
      );
    }
    // Tabla de reservas
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reservas (
        id VARCHAR(36) NOT NULL PRIMARY KEY,
        tipo VARCHAR(20) NOT NULL,
        itemId VARCHAR(36) NOT NULL,
        itemNombre VARCHAR(200) NOT NULL,
        userId VARCHAR(36) NOT NULL,
        userName VARCHAR(100) NOT NULL,
        fecha DATE NOT NULL,
        personas INT NOT NULL DEFAULT 1,
        notas TEXT,
        estado VARCHAR(20) DEFAULT 'pendiente',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
  } catch (err) {
    console.error('Error en initDB:', err.message);
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

app.post('/api/reservas', async (req, res) => {
  const { tipo, itemId, itemNombre, userId, userName, fecha, personas, notas } = req.body;
  if (!tipo || !itemId || !itemNombre || !userId || !userName || !fecha) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  try {
    const id = randomUUID();
    await pool.query(
      'INSERT INTO reservas (id, tipo, itemId, itemNombre, userId, userName, fecha, personas, notas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, tipo, itemId, itemNombre, userId, userName, fecha, personas || 1, notas || null]
    );
    res.status(201).json({ id, tipo, itemId, itemNombre, userId, userName, fecha, personas, notas, estado: 'pendiente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/reservas/usuario/:userId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM reservas WHERE userId = ? ORDER BY createdAt DESC',
      [req.params.userId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Admin CRUD helpers ─────────────────────────────────────────────────────

async function replaceSubItems(table, fkCol, parentId, itemCol, items) {
  await pool.query(`DELETE FROM \`${table}\` WHERE \`${fkCol}\` = ?`, [parentId]);
  if (items && items.length > 0) {
    const vals = items.map(v => [parentId, v]);
    await pool.query(`INSERT INTO \`${table}\` (\`${fkCol}\`, \`${itemCol}\`) VALUES ?`, [vals]);
  }
}

// ── CRUD: Zonas emblemáticas ───────────────────────────────────────────────
app.post('/api/admin/zonas', async (req, res) => {
  const { nombre, descripcion, imagen } = req.body;
  const id = randomUUID();
  try {
    await pool.query('INSERT INTO zonas_emblematicas (id,nombre,descripcion,imagen) VALUES (?,?,?,?)', [id, nombre, descripcion, imagen]);
    res.status(201).json({ id, nombre, descripcion, imagen });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
app.put('/api/admin/zonas/:id', async (req, res) => {
  const { nombre, descripcion, imagen } = req.body;
  try {
    await pool.query('UPDATE zonas_emblematicas SET nombre=?,descripcion=?,imagen=? WHERE id=?', [nombre, descripcion, imagen, req.params.id]);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
app.delete('/api/admin/zonas/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM zonas_emblematicas WHERE id=?', [req.params.id]);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ── CRUD: Eventos culturales ───────────────────────────────────────────────
app.post('/api/admin/eventos', async (req, res) => {
  const { nombre, fecha, descripcion, imagen, ubicacion } = req.body;
  const id = randomUUID();
  try {
    await pool.query('INSERT INTO eventos_culturales (id,nombre,fecha,descripcion,imagen,ubicacion) VALUES (?,?,?,?,?,?)', [id, nombre, fecha, descripcion, imagen, ubicacion]);
    res.status(201).json({ id, nombre, fecha, descripcion, imagen, ubicacion });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
app.put('/api/admin/eventos/:id', async (req, res) => {
  const { nombre, fecha, descripcion, imagen, ubicacion } = req.body;
  try {
    await pool.query('UPDATE eventos_culturales SET nombre=?,fecha=?,descripcion=?,imagen=?,ubicacion=? WHERE id=?', [nombre, fecha, descripcion, imagen, ubicacion, req.params.id]);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
app.delete('/api/admin/eventos/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM eventos_culturales WHERE id=?', [req.params.id]);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ── CRUD: Hospedajes ───────────────────────────────────────────────────────
app.post('/api/admin/hospedajes', async (req, res) => {
  const { nombre, descripcion, precio, imagen, direccion, telefono, servicios } = req.body;
  const id = randomUUID();
  try {
    await pool.query('INSERT INTO hospedajes (id,nombre,descripcion,precio,imagen,direccion,telefono) VALUES (?,?,?,?,?,?,?)', [id, nombre, descripcion, precio, imagen, direccion, telefono]);
    await replaceSubItems('hospedajes_servicios', 'hospedajeId', id, 'servicio', servicios);
    res.status(201).json({ id, nombre, descripcion, precio, imagen, direccion, telefono, servicios });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
app.put('/api/admin/hospedajes/:id', async (req, res) => {
  const { nombre, descripcion, precio, imagen, direccion, telefono, servicios } = req.body;
  try {
    await pool.query('UPDATE hospedajes SET nombre=?,descripcion=?,precio=?,imagen=?,direccion=?,telefono=? WHERE id=?', [nombre, descripcion, precio, imagen, direccion, telefono, req.params.id]);
    await replaceSubItems('hospedajes_servicios', 'hospedajeId', req.params.id, 'servicio', servicios);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
app.delete('/api/admin/hospedajes/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM hospedajes WHERE id=?', [req.params.id]);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ── CRUD: Restaurantes ─────────────────────────────────────────────────────
app.post('/api/admin/restaurantes', async (req, res) => {
  const { nombre, descripcion, especialidad, imagen, horario, direccion, telefono, precioPromedio } = req.body;
  const id = randomUUID();
  try {
    await pool.query('INSERT INTO restaurantes (id,nombre,descripcion,especialidad,imagen,horario,direccion,telefono,precioPromedio) VALUES (?,?,?,?,?,?,?,?,?)', [id, nombre, descripcion, especialidad, imagen, horario, direccion, telefono, precioPromedio]);
    res.status(201).json({ id, nombre, descripcion, especialidad, imagen, horario, direccion, telefono, precioPromedio });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
app.put('/api/admin/restaurantes/:id', async (req, res) => {
  const { nombre, descripcion, especialidad, imagen, horario, direccion, telefono, precioPromedio } = req.body;
  try {
    await pool.query('UPDATE restaurantes SET nombre=?,descripcion=?,especialidad=?,imagen=?,horario=?,direccion=?,telefono=?,precioPromedio=? WHERE id=?', [nombre, descripcion, especialidad, imagen, horario, direccion, telefono, precioPromedio, req.params.id]);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
app.delete('/api/admin/restaurantes/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM restaurantes WHERE id=?', [req.params.id]);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ── CRUD: Tours ────────────────────────────────────────────────────────────
app.post('/api/admin/tours', async (req, res) => {
  const { nombre, descripcion, duracion, precio, imagen, dificultad, incluye } = req.body;
  const id = randomUUID();
  try {
    await pool.query('INSERT INTO tours (id,nombre,descripcion,duracion,precio,imagen,dificultad) VALUES (?,?,?,?,?,?,?)', [id, nombre, descripcion, duracion, precio, imagen, dificultad]);
    await replaceSubItems('tours_incluye', 'tourId', id, 'item', incluye);
    res.status(201).json({ id, nombre, descripcion, duracion, precio, imagen, dificultad, incluye });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
app.put('/api/admin/tours/:id', async (req, res) => {
  const { nombre, descripcion, duracion, precio, imagen, dificultad, incluye } = req.body;
  try {
    await pool.query('UPDATE tours SET nombre=?,descripcion=?,duracion=?,precio=?,imagen=?,dificultad=? WHERE id=?', [nombre, descripcion, duracion, precio, imagen, dificultad, req.params.id]);
    await replaceSubItems('tours_incluye', 'tourId', req.params.id, 'item', incluye);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
app.delete('/api/admin/tours/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM tours WHERE id=?', [req.params.id]);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ── CRUD: Platos típicos ───────────────────────────────────────────────────
app.post('/api/admin/platos', async (req, res) => {
  const { nombre, descripcion, imagen, ingredientes } = req.body;
  const id = randomUUID();
  try {
    await pool.query('INSERT INTO platos_tipicos (id,nombre,descripcion,imagen) VALUES (?,?,?,?)', [id, nombre, descripcion, imagen]);
    await replaceSubItems('platos_ingredientes', 'platoId', id, 'ingrediente', ingredientes);
    res.status(201).json({ id, nombre, descripcion, imagen, ingredientes });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
app.put('/api/admin/platos/:id', async (req, res) => {
  const { nombre, descripcion, imagen, ingredientes } = req.body;
  try {
    await pool.query('UPDATE platos_tipicos SET nombre=?,descripcion=?,imagen=? WHERE id=?', [nombre, descripcion, imagen, req.params.id]);
    await replaceSubItems('platos_ingredientes', 'platoId', req.params.id, 'ingrediente', ingredientes);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
app.delete('/api/admin/platos/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM platos_tipicos WHERE id=?', [req.params.id]);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ── Admin ──────────────────────────────────────────────────────────────────

app.get('/api/admin/stats', async (req, res) => {
  try {
    const [[{ usuarios }]] = await pool.query('SELECT COUNT(*) AS usuarios FROM usuarios');
    const [[{ reservas }]] = await pool.query('SELECT COUNT(*) AS reservas FROM reservas');
    const [[{ opiniones }]] = await pool.query('SELECT COUNT(*) AS opiniones FROM opiniones');
    const [[{ promedio }]] = await pool.query('SELECT ROUND(AVG(rating), 1) AS promedio FROM opiniones');
    const [porTipo] = await pool.query('SELECT tipo, COUNT(*) AS total FROM reservas GROUP BY tipo');
    res.json({ usuarios, reservas, opiniones, promedio: promedio ?? 0, porTipo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/reservas', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reservas ORDER BY createdAt DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/admin/reservas/:id', async (req, res) => {
  const { estado } = req.body;
  if (!['pendiente', 'confirmada', 'cancelada'].includes(estado)) {
    return res.status(400).json({ error: 'Estado inválido' });
  }
  try {
    await pool.query('UPDATE reservas SET estado = ? WHERE id = ?', [estado, req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/usuarios', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email FROM usuarios ORDER BY rowid DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/opiniones', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM opiniones ORDER BY date DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/opiniones/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM opiniones WHERE id = ?', [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  await initDB();
});
