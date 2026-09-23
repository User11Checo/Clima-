import { useEffect, useRef, useState } from 'react';
import { api } from '../services/api.js';

export default function Buscador({ onSeleccionar }) {
  const [texto, setTexto] = useState('');
  const [resultados, setResultados] = useState([]);
  const [abierto, setAbierto] = useState(false);
  const caja = useRef(null);

  // Búsqueda con retardo (debounce) para no llamar al servicio en cada tecla
  useEffect(() => {
    if (texto.trim().length < 2) { setResultados([]); return; }
    const t = setTimeout(() => {
      api.buscar(texto).then((r) => { setResultados(r); setAbierto(true); }).catch(() => setResultados([]));
    }, 350);
    return () => clearTimeout(t);
  }, [texto]);

  useEffect(() => {
    const cerrar = (e) => !caja.current?.contains(e.target) && setAbierto(false);
    document.addEventListener('mousedown', cerrar);
    return () => document.removeEventListener('mousedown', cerrar);
  }, []);

  const elegir = (r) => {
    onSeleccionar(r);
    setTexto('');
    setAbierto(false);
  };

  return (
    <div className="buscador" ref={caja}>
      <div className="clay-input">
        <span>🔎</span>
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onFocus={() => resultados.length && setAbierto(true)}
          placeholder="Busca una ciudad o pueblo de México…"
          aria-label="Buscar ciudad"
        />
      </div>
      {abierto && resultados.length > 0 && (
        <ul className="clay resultados">
          {resultados.map((r) => (
            <li key={r.id}>
              <button onClick={() => elegir(r)}>
                <strong>{r.nombre}</strong>
                <small>{[r.municipio, r.estado].filter(Boolean).join(', ')}</small>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
