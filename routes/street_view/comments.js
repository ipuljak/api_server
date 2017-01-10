const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Authentication = require('../../controllers/authentication');
const passportService = require('../../services/passport');
const middleware = require('../../middleware');

const requireAuth = passport.authenticate('jwt', {session:false});

// Load in the models
const Comment = require('../../models/comment');

/**
 *  GET get_comments API call which fetches all comments for a given view
 */
router.get('/get_comments', function(req, res) {
    var term = {
        'view_id': mongoose.Types.ObjectId(req.query.id)
    };

    Comment.find(term, function(err, result) {
        if (err) {
            res.send(404, "The comments could not be located.");
        } else {
            res.send(result.reverse());
        }
    });
});

/**
 *  POST post_comment API call which allows an authenticated user to post to a given view
 */
router.post('/post_comment', requireAuth, function(req, res) {
    const newComment = {
        view_id: req.query.id,
        comment: req.body.comment,
        username: req.user.username
    };

    Comment.create(newComment, function(err, comment) {
        if (err) {
            res.send(400, 'There was an error creating the comment.');
        } else {
            res.send(201, 'Success');
        }
    })
});

/**
 *  PUT edit_comment API call which allows an authenticated user to edit their comment
 */
router.put('/edit_comment', requireAuth, middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.query.id, req.body, function(err, updatedComment) {
        if (err) {
            res.send(400, "There was an error updating your comment.");
        } else {
            res.send(201, "Success");
        }
    });
});

/**
 *  DELETE delete_comment API call which allows an authenticated user to delete their comment
 */
router.delete('/delete_comment', requireAuth, middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.query.id, function(err) {
        if (err) {
            res.send(400, "There was an error deleting your comment.");
        } else {
            res.send(201, "Success");
        }
    });
});

module.exports = router;