import { API_KEY } from './constants.js';

export function authMiddleware(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey && apiKey === API_KEY) {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden: Invalid API Key', code: 403 });
  }
}

export function errorMiddleware(err, req, res, next) {
  if (err.name === 'SyntaxError') {
    console.error(err.message);
    res.status(500).json({ error: 'Invalid JSON!', message: err.message });
  }

  if (err) {
    res.status(500).json({ error: 'Random Error!', message: err.message });
  }

  next();
}
