const Comment = require("../models/comment");

// Check that the user owns the comment
exports.checkCommentOwnership = (req, res, next) => {
  // Make sure the user is authenticated
  if (req.isAuthenticated()) {
    // Find the comment by it's given id
    Comment.findById(req.query.id, (err, foundComment) => {
      if (err) {
        res.status(404).send({ error: "Comment not found" });
      } else {
        // If the comment's creater is the same as the user, move on to the next middleware
        if (foundComment.username == req.user.username) {
          next();
        } else {
          res.status(403).send({ error: "You do not have permission to do that" });
        }
      }
    });
  } else {
    res.status(403).send({ error: "You do not have permission to do that" });
  }
};