const express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , Authentication = require('../middleware/authentication')
  , passportService = require('../config/passport');

// Set session to false as we are using tokens, not cookies
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

/**
 *  POST route /signin
 *    Logs the user in
 *    Requirements
 *      body.username -> The username of the account you wish to authenticate
 *      body.password -> The password of the account you wish to authenticate 
 */
router.post('/signin', requireSignin, Authentication.signin);

/**
 *  POST route /signup
 *    Creates a user
 *    Requirements
 *      body.username -> The username of the new account you wish to register
 *      body.password -> The password of the new account you wish to reigster 
 */
router.post('/signup', Authentication.signup);

module.exports = router;