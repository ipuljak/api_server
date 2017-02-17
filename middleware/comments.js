const Comment = require("../models/comment");

/**
 *  Check that the user owns the comment
 */
exports.checkCommentOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Comment.findById(req.query.id, function (err, foundComment) {
      if (err) {
        res.send(404, "Comment not found.");
      } else {
        if (foundComment.username == req.user.username) {
          next();
        } else {
          res.send(403, "You do not have permission to do that.");
        }
      }
    });
  } else {
    res.send(403, "You must be logged in to do that.");
  }
};