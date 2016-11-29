const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
    // always have the same id, so we will encode that instead of an email (they might want to change that later on)
    // jwt is a convention, a standard
    // sub = subject, as in who is the subject? who does it belong to?
    // this very specific user right now
    // iat = issued at time
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.signin = function(req, res, next) {
    // User has already had their email and password authenticated
    // We just need to give them a token

    res.send({token: tokenForUser(req.user)});
}

exports.signup = function(req, res, next) {
    console.log(req.body);

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({error: "You must provide email and password"});
    }

    // See if a user with the given email exists
    // User = entire collection of users
    User.findOne({email: email}, function(err, existingUser) {
        if (err) {
            return next(err);
        }

        // If a user with email does exist, return an error
        if (existingUser) {
            return res.status(422).send({error: "Email is in use"});
        }

        // If a user with email does NOT exist, create and save user record
        const user = new User({
            email: email,
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