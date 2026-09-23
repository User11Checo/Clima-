export default function CalidadAire({ aire, cargando }) {
  const pct = aire?.aqi != null ? Math.min(100, (aire.aqi / 300) * 100) : 0;

  return (
    <section className="clay tarjeta aire">
      <h3>Calidad del aire</h3>
      {aire ? (
        <>
          <div className={`aqi-bola clay-mini aqi-${aire.color}`}>
            <strong>{aire.aqi ?? '—'}</strong>
            <small>AQI</small>
          </div>
          <p className="aqi-nivel">{aire.nivel}</p>
          <div className="barra clay-hundido">
            <div className="barra-relleno" style={{ width: `${pct}%` }} />
          </div>
          <ul className="contaminantes">
            <li><span>PM2.5</span><strong>{fmt(aire.pm25)}</strong></li>
            <li><span>PM10</span><strong>{fmt(aire.pm10)}</strong></li>
            <li><span>Ozono</span><strong>{fmt(aire.ozono)}</strong></li>
            <li><span>NO₂</span><strong>{fmt(aire.no2)}</strong></li>
          </ul>
          <small className="sub">µg/m³</small>
        </>
      ) : (
        <p className="sub">{cargando ? 'Cargando…' : 'Sin datos disponibles'}</p>
      )}
    </section>
  );
}

const fmt = (v) => (v == null ? '—' : Math.round(v));
