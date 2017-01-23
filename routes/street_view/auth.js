const express = require('express');
const router = express.Router();
const passport = require('passport');

const Authentication = require('../../controllers/authentication');
const passportService = require('../../services/passport');

/* when a user is authenticated, don't create a session for them
by default passport wants to make a cookie based session
but we are using tokens, so session: false */
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.get('/', requireAuth, function (req, res) {
  res.send({ message: 'Super secret code is ABC123' });
});

router.get('/test', function (req, res) {
  res.send("Hello!");
});

router.post('/signin', requireSignin, Authentication.signin);

router.post('/signup', Authentication.signup);

module.exports = router;