import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { env } from '../config/env.js';
import { User } from '../models/User.js';

function buildDisplayName(profile) {
  const fromProfile = profile.displayName?.trim();
  if (fromProfile) return fromProfile;

  const first = profile.name?.givenName?.trim() || '';
  const last = profile.name?.familyName?.trim() || '';
  return `${first} ${last}`.trim() || 'Usuario Google';
}

export function configureGoogleAuth() {
  if (!env.googleClientId || !env.googleClientSecret) {
    return;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: env.googleClientId,
        clientSecret: env.googleClientSecret,
        callbackURL: env.googleCallbackUrl,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value?.toLowerCase();

          if (!email) {
            return done(new Error('Conta Google sem email publico.'));
          }

          let user = await User.findOne({
            $or: [{ googleId: profile.id }, { email }],
          });

          if (!user) {
            user = await User.create({
              name: buildDisplayName(profile),
              email,
              provider: 'google',
              googleId: profile.id,
            });
          } else {
            if (!user.googleId) {
              user.googleId = profile.id;
            }
            user.provider = user.provider || 'google';
            if (!user.name) {
              user.name = buildDisplayName(profile);
            }
            await user.save();
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
}
