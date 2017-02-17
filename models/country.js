const mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/**
 *  Country Schema
 *    name -> STRING: The name of the country
 *    data.info -> STRING: The info description of the country
 *    data.link -> STRING: A link to additional information
 *    data.image -> STRING: A link to the image
 *    data.source -> STRING: A copyright source to the image if needed
 *    users.popularity -> NUMBER: A percentage representing the popularity of the country
 *    users.comments -> ARRAY (STRING): A list of comments associated with the country
 */
const countrySchema = new Schema({
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