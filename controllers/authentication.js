const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
    // always have the same id, so we will encode that instead of an username (they might want to change that later on)
    // jwt is a convention, a standard
    // sub = subject, as in who is the subject? who does it belong to?
    // this very specific user right now
    // iat = issued at time
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.signin = function(req, res, next) {
    // User has already had their username and password authenticated
    // We just need to give them a token

    res.send({token: tokenForUser(req.user)});
}

exports.signup = function(req, res, next) {
    console.log(req.body);

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(422).send({error: "You must provide username and password"});
    }

    // See if a user with the given username exists
    // User = entire collection of users
    User.findOne({username: username}, function(err, existingUser) {
        if (err) {
            return next(err);
        }

        // If a user with username does exist, return an error
        if (existingUser) {
            return res.status(422).send({error: "username is in use"});
        }

        // If a user with username does NOT exist, create and save user record
        const user = new User({
            username: username,
            password: password
        });

        // Save the new user to the database
        user.save(function(err) {
            if (err) {
                return next(err);
            }

            // Respond to request indicating the user was created
            //res.json(user);
            //res.json({success:true});
            res.json({token: tokenForUser(user)});
        });
    });    
    //res.send({success: 'true'}); -> for Postman
}