import { User } from '../models/User.js';
import { env } from '../config/env.js';
import { verifyAuthToken } from '../services/tokenService.js';

export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.[env.cookieName];
    if (!token) {
      return res.status(401).json({ message: 'Nao autenticado.' });
    }

    const payload = verifyAuthToken(token);
    const user = await User.findById(payload.sub).lean();

    if (!user) {
      return res.status(401).json({ message: 'Sessao invalida.' });
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      provider: user.provider,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Sessao invalida.' });
  }
}
