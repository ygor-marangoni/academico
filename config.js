const isLocalHost =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

window.APP_CONFIG = {
  API_BASE_URL: isLocalHost
    ? 'http://localhost:3000'
    : 'https://academico-api.onrender.com',
};
