import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import crypto from 'crypto';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://data-software-pvt-ltd-web.onrender.com/api/auth/google/callback",
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find user by email from Google profile
      let user = await User.findOne({ email: profile.emails[0].value });
      
      if (!user) {
        // Create new user if they don't exist
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          profileImage: profile.photos[0]?.value,
          // Generate a secure random password since they use Google to login
          password: crypto.randomBytes(20).toString('hex')
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// Required for passport session handling
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

export default passport;