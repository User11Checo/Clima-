const nombreDia = (fecha, i) => {
  if (i === 0) return 'Hoy';
  const d = new Date(`${fecha}T12:00:00`);
  const txt = d.toLocaleDateString('es-MX', { weekday: 'long' });
  return txt.charAt(0).toUpperCase() + txt.slice(1);
};

export default function PronosticoDias({ dias }) {
  if (!dias) return <section className="clay tarjeta dias"><h3>Próximos 7 días</h3></section>;

  // Rango global de la semana para dibujar las barras de temperatura
  const minSemana = Math.min(...dias.map((d) => d.min));
  const maxSemana = Math.max(...dias.map((d) => d.max));
  const rango = Math.max(1, maxSemana - minSemana);

  return (
    <section className="clay tarjeta dias">
      <h3>Próximos 7 días</h3>
      <ul className="lista-dias">
        {dias.map((d, i) => (
          <li key={d.fecha} className="dia">
            <span className="dia-nombre">{nombreDia(d.fecha, i)}</span>
            <span className="dia-icono" title={d.descripcion}>{d.icono}</span>
            <small className="lluvia">💧{d.probLluvia ?? 0}%</small>
            <span className="dia-min">{d.min}°</span>
            <div className="rango clay-hundido">
              <div
                className="rango-relleno"
                style={{
                  left: `${((d.min - minSemana) / rango) * 100}%`,
                  width: `${((d.max - d.min) / rango) * 100}%`,
                }}
              />
            </div>
            <span className="dia-max">{d.max}°</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
