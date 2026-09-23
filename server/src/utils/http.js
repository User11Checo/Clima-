// Cliente HTTP con caché en memoria (TTL) para no saturar las APIs externas
const cache = new Map();

export async function getJSON(url, ttlMs = 10 * 60 * 1000) {
  const hit = cache.get(url);
  if (hit && hit.expira > Date.now()) return hit.datos;

  const resp = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!resp.ok) {
    const err = new Error(`Servicio externo respondió ${resp.status}`);
    err.status = 502;
    throw err;
  }
  const datos = await resp.json();
  cache.set(url, { datos, expira: Date.now() + ttlMs });
  return datos;
}
