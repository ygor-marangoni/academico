import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { signAuthToken } from '../services/tokenService.js';
import { env } from '../config/env.js';
import { getAuthCookieOptions } from '../utils/cookies.js';

function serializeUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    provider: user.provider,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function register(req, res) {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.status(409).json({ message: 'Ja existe uma conta com esse email.' });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase(),
    passwordHash,
    provider: 'local',
  });

  const token = signAuthToken(user);
  res.cookie(env.cookieName, token, getAuthCookieOptions());

  return res.status(201).json({ user: serializeUser(user) });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user || !user.passwordHash) {
    return res.status(401).json({ message: 'Email ou senha invalidos.' });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ message: 'Email ou senha invalidos.' });
  }

  const token = signAuthToken(user);
  res.cookie(env.cookieName, token, getAuthCookieOptions());

  return res.json({ user: serializeUser(user) });
}

export async function logout(req, res) {
  res.clearCookie(env.cookieName, {
    ...getAuthCookieOptions(),
    maxAge: undefined,
  });

  return res.status(204).send();
}

export async function me(req, res) {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'Usuario nao encontrado.' });
  }

  return res.json({ user: serializeUser(user) });
}

export function googleDisabled(req, res) {
  return res.redirect(`${env.clientUrl}?auth=google-disabled`);
}

export function googleCallbackSuccess(req, res) {
  const token = signAuthToken(req.user);
  res.cookie(env.cookieName, token, getAuthCookieOptions());
  return res.redirect(`${env.clientUrl}?auth=success`);
}

export function googleCallbackFailure(req, res) {
  return res.redirect(`${env.clientUrl}?auth=error`);
}
