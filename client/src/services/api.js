// Capa de servicios del cliente: única puerta de entrada al backend
const BASE = import.meta.env.VITE_API_URL || '/api';

async function get(ruta) {
  const resp = await fetch(`${BASE}${ruta}`);
  const datos = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(datos.error || `Error ${resp.status}`);
  return datos;
}

export const api = {
  ciudades: () => get('/ciudades'),
  buscar: (q) => get(`/buscar?q=${encodeURIComponent(q)}`),
  clima: (lat, lon) => get(`/clima?lat=${lat}&lon=${lon}`),
  aire: (lat, lon) => get(`/aire?lat=${lat}&lon=${lon}`),
  resumen: () => get('/resumen'),
};
