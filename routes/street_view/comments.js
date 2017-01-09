const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Authentication = require('../../controllers/authentication');
const passportService = require('../../services/passport');

const requireAuth = passport.authenticate('jwt', {session:false});

// Load in the models
const Comment = require('../../models/comment');

router.get('/get_comments', function(req, res) {
    var term = {
        'view_id': mongoose.Types.ObjectId(req.query.id)
    };

    Comment.find(term, function(err, result) {
        if (err) {
            res.send(404);
        } else {
            res.send(result.reverse());
        }
    });
});

router.post('/post_comment', requireAuth, function(req, res) {
    const newComment = {
        view_id: req.query.id,
        comment: req.body.comment,
        username: req.user.username
    };

    Comment.create(newComment, function(err, comment) {
        if (err) {
            console.log("There was an error creating the comment", err);
            res.send(404, 'Error 2');
        } else {
            console.log("Success");
            res.send(201, 'Success');
        }
    })
});

module.exports = router;