const mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/**
 *  Comment Schema
 *    comment -> STRING: The body text of the inputted comment
 *    date.type -> DATE: The comment creation date (defaulted as now)
 *    date.view_id -> LOCATION: The id of the location the comment is associated with
 *    date.username -> STRING: The username connected to the user's account
 */
const commentSchema = new Schema({
  comment: String,
  date: {
    type: Date,
    default: Date.now
  },
  view_id: {
    type: Schema.Types.ObjectId,
    ref: "View"
  },
  username: String
});

module.exports = mongoose.model("Comment", commentSchema);