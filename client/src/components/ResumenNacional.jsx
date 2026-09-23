import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api.js';

const ORDENES = {
  nombre: { etiqueta: 'A–Z', fn: (a, b) => a.estado.localeCompare(b.estado, 'es') },
  calor: { etiqueta: '🔥 Más calor', fn: (a, b) => b.temperatura - a.temperatura },
  frio: { etiqueta: '🧊 Más frío', fn: (a, b) => a.temperatura - b.temperatura },
};

// Color de fondo según temperatura (frío = azul, calor = coral)
const tono = (t) => {
  if (t <= 10) return 'var(--frio)';
  if (t <= 18) return 'var(--fresco)';
  if (t <= 25) return 'var(--templado)';
  if (t <= 31) return 'var(--calido)';
  return 'var(--caliente)';
};

export default function ResumenNacional({ seleccionado, onSeleccionar }) {
  const [ciudades, setCiudades] = useState([]);
  const [orden, setOrden] = useState('nombre');
  const [error, setError] = useState('');

  useEffect(() => {
    api.resumen().then(setCiudades).catch((e) => setError(e.message));
  }, []);

  const lista = useMemo(() => [...ciudades].sort(ORDENES[orden].fn), [ciudades, orden]);

  return (
    <section className="nacional">
      <div className="nacional-cabecera">
        <h2>México ahora · 32 capitales</h2>
        <div className="clay-hundido selector">
          {Object.entries(ORDENES).map(([k, o]) => (
            <button key={k} className={orden === k ? 'activo' : ''} onClick={() => setOrden(k)}>
              {o.etiqueta}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="sub">No se pudo cargar el resumen: {error}</p>}

      <div className="mosaico">
        {lista.length === 0 && !error &&
          Array.from({ length: 8 }).map((_, i) => <div key={i} className="clay ciudad esqueleto-mini" />)}
        {lista.map((c) => (
          <button
            key={c.id}
            className={`clay ciudad ${seleccionado === c.id ? 'seleccionada' : ''}`}
            style={{ '--tono': tono(c.temperatura) }}
            onClick={() => onSeleccionar(c)}
            title={c.descripcion}
          >
            <span className="ciudad-icono">{c.icono}</span>
            <span className="ciudad-temp">{c.temperatura}°</span>
            <strong>{c.nombre}</strong>
            <small>{c.estado}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
