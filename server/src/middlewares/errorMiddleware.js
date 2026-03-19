export function notFoundHandler(req, res) {
  res.status(404).json({ message: 'Rota nao encontrada.' });
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  if (error?.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'JSON invalido.' });
  }

  if (error?.code === 11000) {
    return res.status(409).json({ message: 'Ja existe um cadastro com esse email.' });
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Erro interno do servidor.';

  return res.status(statusCode).json({ message });
}
