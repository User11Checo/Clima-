# ⛅ Clima México

> Aplicación Orientada a Servicios

App sencilla, **orientada a servicios**, para consultar el clima de cualquier lugar de México.
Frontend en **React (Vite)**, backend en **Node.js (Express)** y datos de **Open-Meteo** (gratis, sin API key).
La interfaz usa el estilo **Claymorphism**.

## Arquitectura

```
┌──────────────┐   /api/*   ┌──────────────────────────┐   HTTPS   ┌────────────────────────┐
│ React (5173) │ ─────────▶ │ Node/Express (4000)       │ ────────▶ │ Open-Meteo Forecast    │
│  services/   │            │  routes → services → http │ ────────▶ │ Open-Meteo Geocoding   │
│  api.js      │ ◀───────── │  (caché en memoria + TTL) │ ────────▶ │ Open-Meteo Air Quality │
└──────────────┘    JSON    └──────────────────────────┘           └────────────────────────┘
```

El backend actúa como **API Gateway**: el cliente nunca habla con las APIs externas. Cada servicio
tiene una responsabilidad única, traduce la respuesta a un contrato propio en español y la guarda en caché.

| Servicio (backend)                | Endpoint                         | API externa              |
|-----------------------------------|----------------------------------|--------------------------|
| Salud                             | `GET /api/salud`                 | —                        |
| Catálogo de capitales             | `GET /api/ciudades`              | — (datos locales)        |
| Geocodificación (solo MX)         | `GET /api/buscar?q=oaxaca`       | Open-Meteo Geocoding     |
| Pronóstico (actual, 24 h, 7 días) | `GET /api/clima?lat=..&lon=..`   | Open-Meteo Forecast      |
| Calidad del aire                  | `GET /api/aire?lat=..&lon=..`    | Open-Meteo Air Quality   |
| Resumen nacional (32 capitales)   | `GET /api/resumen`               | Open-Meteo Forecast      |

## Estructura

```
clima/
├── package.json            # scripts para instalar y levantar todo
├── server/                 # Node.js + Express
│   └── src/
│       ├── index.js        # arranque, middlewares, errores
│       ├── routes/         # capa de rutas (contrato REST)
│       ├── services/       # un servicio por API externa
│       ├── data/           # catálogo de capitales
│       └── utils/          # cliente HTTP con caché, códigos WMO
└── client/                 # React + Vite
    └── src/
        ├── services/api.js # capa de acceso a la API propia
        ├── components/     # UI por componentes
        └── styles.css      # sistema visual Claymorphism
```

## Requisitos

- Node.js 18 o superior (https://nodejs.org)

## Cómo ejecutarlo

```bash
cd clima
npm run instalar
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:4000/api/salud

También puedes levantarlos por separado: `npm run dev` dentro de `server/` y de `client/`.
