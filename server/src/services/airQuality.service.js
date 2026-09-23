import { getJSON } from '../utils/http.js';

const BASE = 'https://air-quality-api.open-meteo.com/v1/air-quality';

function clasificarAQI(aqi) {
  if (aqi == null) return { nivel: 'Sin datos', color: 'gris' };
  if (aqi <= 50) return { nivel: 'Buena', color: 'verde' };
  if (aqi <= 100) return { nivel: 'Aceptable', color: 'amarillo' };
  if (aqi <= 150) return { nivel: 'Dañina para grupos sensibles', color: 'naranja' };
  if (aqi <= 200) return { nivel: 'Dañina', color: 'rojo' };
  return { nivel: 'Muy dañina', color: 'morado' };
}

/** Índice de calidad del aire (US AQI) y contaminantes principales */
export async function obtenerCalidadAire(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: 'us_aqi,pm2_5,pm10,ozone,nitrogen_dioxide',
    timezone: 'auto',
  });
  const d = await getJSON(`${BASE}?${params}`, 30 * 60 * 1000);
  const c = d.current || {};

  return {
    aqi: c.us_aqi ?? null,
    ...clasificarAQI(c.us_aqi),
    pm25: c.pm2_5 ?? null,
    pm10: c.pm10 ?? null,
    ozono: c.ozone ?? null,
    no2: c.nitrogen_dioxide ?? null,
  };
}
