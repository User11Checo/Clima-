export default function PronosticoHoras({ horas }) {
  return (
    <section className="clay tarjeta horas">
      <h3>Próximas 24 horas</h3>
      <div className="carrusel">
        {(horas || []).map((h, i) => (
          <div key={h.hora + i} className="clay-mini hora">
            <small>{i === 0 ? 'Ahora' : h.hora}</small>
            <span className="hora-icono" title={h.descripcion}>{h.icono}</span>
            <strong>{h.temperatura}°</strong>
            <small className="lluvia">💧 {h.probLluvia ?? 0}%</small>
          </div>
        ))}
      </div>
    </section>
  );
}
