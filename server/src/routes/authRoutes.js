import { Router } from 'express';
import passport from 'passport';
import rateLimit from 'express-rate-limit';
import { body } from 'express-validator';
import {
  googleCallbackFailure,
  googleCallbackSuccess,
  googleDisabled,
  login,
  logout,
  me,
  register,
} from '../controllers/authController.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validateRequest } from '../middlewares/validateMiddleware.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { env } from '../config/env.js';

const router = Router();

const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

const registerValidation = [
  body('name').trim().isLength({ min: 2, max: 80 }).withMessage('Nome invalido.'),
  body('email').trim().isEmail().withMessage('Email invalido.'),
  body('password')
    .isLength({ min: 6, max: 128 })
    .withMessage('A senha deve ter entre 6 e 128 caracteres.'),
];

const loginValidation = [
  body('email').trim().isEmail().withMessage('Email invalido.'),
  body('password').isLength({ min: 6 }).withMessage('Senha invalida.'),
];

router.post(
  '/register',
  authRateLimit,
  registerValidation,
  validateRequest,
  asyncHandler(register),
);
router.post(
  '/login',
  authRateLimit,
  loginValidation,
  validateRequest,
  asyncHandler(login),
);
router.post('/logout', asyncHandler(logout));
router.get('/me', requireAuth, asyncHandler(me));

if (env.googleClientId && env.googleClientSecret) {
  router.get(
    '/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      session: false,
      prompt: 'select_account',
    }),
  );

  router.get(
    '/google/callback',
    passport.authenticate('google', {
      session: false,
      failureRedirect: `${env.clientUrl}?auth=error`,
    }),
    googleCallbackSuccess,
  );
} else {
  router.get('/google', googleDisabled);
  router.get('/google/callback', googleCallbackFailure);
}

export default router;
