import { getJSON } from '../utils/http.js';

const BASE = 'https://geocoding-api.open-meteo.com/v1/search';

/** Busca localidades mexicanas por nombre */
export async function buscarLugares(texto) {
  const url = `${BASE}?name=${encodeURIComponent(texto)}&count=8&language=es&format=json&countryCode=MX`;
  const datos = await getJSON(url, 24 * 60 * 60 * 1000);

  return (datos.results || []).map((r) => ({
    id: String(r.id),
    nombre: r.name,
    estado: r.admin1 || '',
    municipio: r.admin2 || '',
    lat: r.latitude,
    lon: r.longitude,
    poblacion: r.population || null,
  }));
}
