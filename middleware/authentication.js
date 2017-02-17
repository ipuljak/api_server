const jwt = require('jwt-simple')
  , config = require('../config')
  , User = require('../models/user');

// Encode a token for the user
const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

// Middleware that sends the user their token and user id to sign them in
exports.signin = (req, res, next) => {
  res.send({
    token: tokenForUser(req.user)
  });
};

// Middleware that signs a user up and registers them in the database
exports.signup = (req, res, next) => {
  const username = req.body.username
    , password = req.body.password;

  // Check that a username and password have been supplied
  if (!username || !password) {
    return res.status(422).send({ error: "You must provide username and password" });
  }
  // Check and see if a user with the requested name already exists  
  User.findOne({ username: username }, (err, existingUser) => {
    if (err) return next(err);
    // If a user with username does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: "Username is in use." });
    }
    // If a user with username does NOT exist, create and save user record
    const user = new User({
      username: username,
      password: password,
      favorites: []
    });
    // Save the new user to the database
    user.save(err => {
      if (err) return next(err);
      // Respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
};