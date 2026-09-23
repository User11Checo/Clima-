import { getJSON } from '../utils/http.js';
import { describirClima } from '../utils/weatherCodes.js';
import { CIUDADES } from '../data/ciudades.js';

const BASE = 'https://api.open-meteo.com/v1/forecast';

/** Pronóstico completo de un punto: condición actual, próximas 24 h y 7 días */
export async function obtenerPronostico(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,pressure_msl,uv_index',
    hourly: 'temperature_2m,weather_code,precipitation_probability,is_day',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset',
    timezone: 'auto',
    forecast_days: 7,
  });
  const d = await getJSON(`${BASE}?${params}`);
  const c = d.current;

  // Próximas 24 horas a partir de la hora actual local
  const horaActual = c.time.slice(0, 13);
  const inicio = Math.max(0, d.hourly.time.findIndex((t) => t.startsWith(horaActual)));
  const horas = d.hourly.time.slice(inicio, inicio + 24).map((t, i) => {
    const k = inicio + i;
    return {
      hora: t.slice(11, 16),
      temperatura: Math.round(d.hourly.temperature_2m[k]),
      probLluvia: d.hourly.precipitation_probability[k],
      ...describirClima(d.hourly.weather_code[k], d.hourly.is_day[k] === 1),
    };
  });

  const dias = d.daily.time.map((fecha, i) => ({
    fecha,
    max: Math.round(d.daily.temperature_2m_max[i]),
    min: Math.round(d.daily.temperature_2m_min[i]),
    probLluvia: d.daily.precipitation_probability_max[i],
    amanecer: d.daily.sunrise[i].slice(11),
    atardecer: d.daily.sunset[i].slice(11),
    ...describirClima(d.daily.weather_code[i]),
  }));

  return {
    zonaHoraria: d.timezone,
    actual: {
      hora: c.time,
      temperatura: Math.round(c.temperature_2m),
      sensacion: Math.round(c.apparent_temperature),
      humedad: c.relative_humidity_2m,
      viento: Math.round(c.wind_speed_10m),
      presion: Math.round(c.pressure_msl),
      precipitacion: c.precipitation,
      uv: c.uv_index,
      esDia: c.is_day === 1,
      ...describirClima(c.weather_code, c.is_day === 1),
    },
    horas,
    dias,
  };
}

/** Clima actual de las 32 capitales en una sola petición a Open-Meteo */
export async function obtenerResumenNacional() {
  const params = new URLSearchParams({
    latitude: CIUDADES.map((c) => c.lat).join(','),
    longitude: CIUDADES.map((c) => c.lon).join(','),
    current: 'temperature_2m,weather_code,is_day',
    timezone: 'auto',
  });
  const lista = await getJSON(`${BASE}?${params}`);
  const arr = Array.isArray(lista) ? lista : [lista];

  return CIUDADES.map((ciudad, i) => ({
    ...ciudad,
    temperatura: Math.round(arr[i].current.temperature_2m),
    ...describirClima(arr[i].current.weather_code, arr[i].current.is_day === 1),
  }));
}
