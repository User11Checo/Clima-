import { useEffect, useState } from 'react';
import { api } from './services/api.js';
import Buscador from './components/Buscador.jsx';
import ClimaActual from './components/ClimaActual.jsx';
import PronosticoHoras from './components/PronosticoHoras.jsx';
import PronosticoDias from './components/PronosticoDias.jsx';
import CalidadAire from './components/CalidadAire.jsx';
import ResumenNacional from './components/ResumenNacional.jsx';

const INICIAL = { id: 'cdmx', nombre: 'Ciudad de México', estado: 'CDMX', lat: 19.4326, lon: -99.1332 };

export default function App() {
  const [lugar, setLugar] = useState(INICIAL);
  const [clima, setClima] = useState(null);
  const [aire, setAire] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelado = false;
    setCargando(true);
    setError('');

    // Consumimos dos servicios independientes en paralelo
    Promise.allSettled([api.clima(lugar.lat, lugar.lon), api.aire(lugar.lat, lugar.lon)])
      .then(([rClima, rAire]) => {
        if (cancelado) return;
        if (rClima.status === 'fulfilled') setClima(rClima.value);
        else setError(rClima.reason.message);
        setAire(rAire.status === 'fulfilled' ? rAire.value : null);
      })
      .finally(() => !cancelado && setCargando(false));

    return () => { cancelado = true; };
  }, [lugar]);

  const seleccionar = (l) => {
    setLugar(l);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <header className="encabezado">
        <div className="marca clay">
          <span className="marca-icono">⛅</span>
          <div>
            <h1>Clima México</h1>
            <p>Pronóstico en tiempo real para toda la República</p>
          </div>
        </div>
        <Buscador onSeleccionar={seleccionar} />
      </header>

      {error && <div className="clay alerta">⚠️ {error}</div>}

      <main className="rejilla">
        <ClimaActual lugar={lugar} clima={clima} cargando={cargando} />
        <CalidadAire aire={aire} cargando={cargando} />
        <PronosticoHoras horas={clima?.horas} />
        <PronosticoDias dias={clima?.dias} />
      </main>

      <ResumenNacional seleccionado={lugar.id} onSeleccionar={seleccionar} />

      <footer className="pie">
        Datos: <a href="https://open-meteo.com" target="_blank" rel="noreferrer">Open-Meteo</a> (API gratuita) ·
        React + Node.js
      </footer>
    </div>
  );
}
