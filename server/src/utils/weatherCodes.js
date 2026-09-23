// Códigos WMO usados por Open-Meteo -> descripción en español + icono
const CODIGOS = {
  0: ['Despejado', '☀️', '🌙'],
  1: ['Mayormente despejado', '🌤️', '🌙'],
  2: ['Parcialmente nublado', '⛅', '☁️'],
  3: ['Nublado', '☁️', '☁️'],
  45: ['Niebla', '🌫️', '🌫️'],
  48: ['Niebla con escarcha', '🌫️', '🌫️'],
  51: ['Llovizna ligera', '🌦️', '🌧️'],
  53: ['Llovizna', '🌦️', '🌧️'],
  55: ['Llovizna intensa', '🌧️', '🌧️'],
  56: ['Llovizna helada', '🌧️', '🌧️'],
  57: ['Llovizna helada intensa', '🌧️', '🌧️'],
  61: ['Lluvia ligera', '🌦️', '🌧️'],
  63: ['Lluvia', '🌧️', '🌧️'],
  65: ['Lluvia intensa', '🌧️', '🌧️'],
  66: ['Lluvia helada', '🌧️', '🌧️'],
  67: ['Lluvia helada intensa', '🌧️', '🌧️'],
  71: ['Nevada ligera', '🌨️', '🌨️'],
  73: ['Nevada', '🌨️', '🌨️'],
  75: ['Nevada intensa', '❄️', '❄️'],
  77: ['Granizo fino', '🌨️', '🌨️'],
  80: ['Chubascos ligeros', '🌦️', '🌧️'],
  81: ['Chubascos', '🌧️', '🌧️'],
  82: ['Chubascos violentos', '⛈️', '⛈️'],
  85: ['Chubascos de nieve', '🌨️', '🌨️'],
  86: ['Chubascos de nieve intensos', '❄️', '❄️'],
  95: ['Tormenta eléctrica', '⛈️', '⛈️'],
  96: ['Tormenta con granizo', '⛈️', '⛈️'],
  99: ['Tormenta con granizo fuerte', '⛈️', '⛈️'],
};

export function describirClima(codigo, esDia = true) {
  const [descripcion, iconoDia, iconoNoche] = CODIGOS[codigo] || ['Desconocido', '🌡️', '🌡️'];
  return { codigo, descripcion, icono: esDia ? iconoDia : iconoNoche };
}
