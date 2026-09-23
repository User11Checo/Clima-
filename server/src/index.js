import express from 'express';
import cors from 'cors';
import climaRoutes from './routes/clima.routes.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Registro simple de peticiones
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()}  ${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api', climaRoutes);

app.use((_req, res) => res.status(404).json({ error: 'Recurso no encontrado' }));

// Manejador central de errores
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 502).json({ error: err.message || 'Error interno' });
});

app.listen(PORT, () => {
  console.log(`API Clima México escuchando en http://localhost:${PORT}/api`);
});
