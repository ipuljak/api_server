const passport = require('passport')
  , JwtStrategy = require('passport-jwt').Strategy
  , ExtractJwt = require('passport-jwt').ExtractJwt
  , LocalStrategy = require('passport-local')
  , User = require('../models/user')
  , config = require('../config');

// Create local strategy
const localOptions = { usernameField: 'username' };

const localLogin = new LocalStrategy(localOptions, (username, password, done) => {
  // Verify this username and password, callback done with the user info
  User.findOne({ username: username }, (err, user) => {
    if (err) return done(err);
    // If the user is not found, return false
    if (!user) return done(null, false);
    // Compare the given password with the password in the database
    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err);
      isMatch ? done(null, user) : done(null, false);
    });
  });
});

// Setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // Verify the user exists in the database
  User.findById(payload.sub, (err, user) => {
    if (err) return done(err, false);
    // Return the user if it exists, otherwise return false
    user ? done(null, user) : done(null, false);
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);