const express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , passportService = require('../config/passport')
  , Authentication = require('../middleware/authentication');

// Set session to false as we are using tokens, not cookies
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

/**
 *  POST route /signin
 *    Logs the user in
 *    Requirements:
 *      body.username -> The username of the account you wish to authenticate
 *      body.password -> The password of the account you wish to authenticate
 *    Returns a JWT token upon a successful login, otherwise an error
 */
router.post('/signin', requireSignin, Authentication.signin);

/**
 *  POST route /signup
 *    Creates a user
 *    Requirements:
 *      body.username -> The username of the new account you wish to register
 *      body.password -> The password of the new account you wish to reigster 
 *    Returns a JWT token upon a successful register, otherwise an error
 */
router.post('/signup', Authentication.signup);

module.exports = router;