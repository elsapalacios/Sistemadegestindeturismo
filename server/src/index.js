import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

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
    const [rows] = await pool.query('SELECT * FROM hospedajes');
    res.json(rows);
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
    const [rows] = await pool.query('SELECT * FROM tours');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/platos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM platos_tipicos');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/historia', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM historia_quibdo');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/opiniones', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM opiniones');
    res.json(rows);
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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
