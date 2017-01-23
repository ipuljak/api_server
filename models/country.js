var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Define the schema for the location of our street view component
var countrySchema = new Schema({
  name: String,
  data: {
    info: String,
    link: String,
    image: String,
    source: String
  },
  users: {
    popularity: Number,
    comments: [String]
  }
});

module.exports = mongoose.model("Country", countrySchema);