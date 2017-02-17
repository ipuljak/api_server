const mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/**
 *  Category Schema
 *    name -> STRING: The name of the category
 *    data.image -> STRING: A link to the image
 *    data.source -> STRING: A copyright source to the image if needed
 */
const categorySchema = new Schema({
  name: String,
  data: {
    image: String,
    source: String
  }
});

module.exports = mongoose.model('Category', categorySchema);