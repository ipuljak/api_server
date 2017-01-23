var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Define the schema for the location of our street view component
var commentSchema = new Schema({
  comment: String,
  date: { type: Date, default: Date.now },
  view_id: {
    type: Schema.Types.ObjectId,
    ref: "View"
  },
  username: String
});

module.exports = mongoose.model("Comment", commentSchema);