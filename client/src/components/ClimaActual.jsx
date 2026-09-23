export default function ClimaActual({ lugar, clima, cargando }) {
  const a = clima?.actual;
  const hoy = clima?.dias?.[0];

  return (
    <section className={`clay tarjeta principal ${a && !a.esDia ? 'noche' : ''}`}>
      <div className="principal-cabecera">
        <div>
          <h2>{lugar.nombre}</h2>
          <p className="sub">{lugar.estado}</p>
        </div>
        {cargando && <span className="chip">Actualizando…</span>}
      </div>

      {a ? (
        <>
          <div className="principal-cuerpo">
            <span className="icono-grande" aria-hidden>{a.icono}</span>
            <div>
              <div className="temp-grande">{a.temperatura}°</div>
              <p className="descripcion">{a.descripcion}</p>
              {hoy && <p className="sub">Máx {hoy.max}° · Mín {hoy.min}°</p>}
            </div>
          </div>

          <div className="datos">
            <Dato icono="🌡️" etiqueta="Sensación" valor={`${a.sensacion}°`} />
            <Dato icono="💧" etiqueta="Humedad" valor={`${a.humedad}%`} />
            <Dato icono="🍃" etiqueta="Viento" valor={`${a.viento} km/h`} />
            <Dato icono="🔆" etiqueta="Índice UV" valor={a.uv ?? '—'} />
            <Dato icono="🌅" etiqueta="Amanecer" valor={hoy?.amanecer ?? '—'} />
            <Dato icono="🌇" etiqueta="Atardecer" valor={hoy?.atardecer ?? '—'} />
          </div>
        </>
      ) : (
        <div className="esqueleto" />
      )}
    </section>
  );
}

function Dato({ icono, etiqueta, valor }) {
  return (
    <div className="clay-mini dato">
      <span className="dato-icono">{icono}</span>
      <small>{etiqueta}</small>
      <strong>{valor}</strong>
    </div>
  );
}
