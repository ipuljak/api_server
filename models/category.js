var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Define the schema for the location of our street view component
var categorySchema = new Schema({
  name: String,
  data: {
    image: String,
    source: String
  }
});

module.exports = mongoose.model("Category", categorySchema);