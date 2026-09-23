import { Router } from 'express';
import { CIUDADES } from '../data/ciudades.js';
import { buscarLugares } from '../services/geocoding.service.js';
import { obtenerPronostico, obtenerResumenNacional } from '../services/weather.service.js';
import { obtenerCalidadAire } from '../services/airQuality.service.js';

const router = Router();

// Envuelve controladores async para mandar errores al middleware central
const h = (fn) => (req, res, next) => fn(req, res, next).catch(next);

function leerCoordenadas(query) {
  const lat = Number(query.lat);
  const lon = Number(query.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    const err = new Error('Parámetros lat y lon son obligatorios y numéricos');
    err.status = 400;
    throw err;
  }
  return { lat, lon };
}

/** Estado del servicio */
router.get('/salud', (_req, res) => {
  res.json({ estado: 'ok', servicio: 'clima-mexico', fecha: new Date().toISOString() });
});

/** Catálogo: capitales de los 32 estados */
router.get('/ciudades', (_req, res) => res.json(CIUDADES));

/** Servicio de geocodificación limitado a México */
router.get('/buscar', h(async (req, res) => {
  const q = String(req.query.q || '').trim();
  if (q.length < 2) return res.json([]);
  res.json(await buscarLugares(q));
}));

/** Servicio de pronóstico: actual, 24 h y 7 días */
router.get('/clima', h(async (req, res) => {
  const { lat, lon } = leerCoordenadas(req.query);
  res.json(await obtenerPronostico(lat, lon));
}));

/** Servicio de calidad del aire */
router.get('/aire', h(async (req, res) => {
  const { lat, lon } = leerCoordenadas(req.query);
  res.json(await obtenerCalidadAire(lat, lon));
}));

/** Servicio agregado: clima actual en todas las capitales */
router.get('/resumen', h(async (_req, res) => {
  res.json(await obtenerResumenNacional());
}));

export default router;
