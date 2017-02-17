const express = require('express')
  , router = express.Router()
  , mongoose = require('mongoose')
  , passport = require('passport')
  , passportService = require('../config/passport')
  , authentication = require('../middleware/authentication')
  , commentsMiddleware = require('../middleware/comments')
  , Comment = require('../models/comment');

const requireAuth = passport.authenticate('jwt', { session: false });

/**
 *  GET route /get_comments
 *    Retrieve the comments for a particular view
 *    -> http://localhost:3001/api/street_view/comments/get_comments?id=[VIEW_ID]
 *    Requirements:
 *      query.id -> The unique view id
 *    Returns a list of the comments sorted from latest to oldest
 */
router.get('/get_comments', (req, res) => {
  const term = {
    'view_id': mongoose.Types.ObjectId(req.query.id)
  };
  // Find all of the comments in the database
  Comment.find(term, (err, result) => {
    if (err) {
      res.send({
        error: err
      });
    } else {
      res.send(result.reverse());
    }
  });
});

/**
 *  POST route /post_comment
 *    Allows an authenticated user to post a comment to a given view
 *    -> http://localhost:3001/api/street_view/comments/post_comment?id=[VIEW_ID]
 *    Requirements:
 *      query.id -> The unique view id
 *      body.comment -> The body text of the inputted comment
 *      user.username -> The username connected to the user's account
 *    Returns a success string if created   
 */
router.post('/post_comment', requireAuth, (req, res) => {
  const newComment = {
    view_id: req.query.id,
    comment: req.body.comment,
    username: req.user.username
  };

  Comment.create(newComment, (err, comment) => {
    if (err) {
      res.send({
        error: err
      });
    } else {
      res.status(201).send(`Success: Comment posted to view ${req.query.id}`);
    }
  });
});

/**
 *  PUT route /edit_comment
 *    Allows an authenticated user to edit their comment
 *    -> http://localhost:3001/api/street_view/comments/edit_comment?id=[COMMENT_ID]
 *    Requirements:
 *      query.id -> The unique comment id
 *      body.comment -> The body text of the newly edited comment
 *    Returns a success string if edited
 */
router.put('/edit_comment',
  requireAuth, commentsMiddleware.checkCommentOwnership, (req, res) => {
    // Find the comment by it's id and update the text
    Comment.findByIdAndUpdate(req.query.id, req.body, (err, updatedComment) => {
      if (err) {
        res.send({
          error: err
        });
      } else {
        res.status(201).send(`Success: Comment with id ${req.query.id} edited`);
      }
    });
});

/**
 *  DELETE route /delete_comment
 *    Allows an authenticated user to delete their comment from a view
 *    -> http://localhost:3001/api/street_view/comments/delete_comment?id=[COMMENT_ID]
 *    Requirements:
 *      query.id -> The unique comment id
 *    Returns a success string if deleted
 */
router.delete('/delete_comment', 
  requireAuth, commentsMiddleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.query.id, err => {
      if (err) {
        res.send({
          error: err
        });
      } else {
        res.status(201).send(`Success: Comment with id ${req.query.id} deleted`);
      }
    });
});

module.exports = router;