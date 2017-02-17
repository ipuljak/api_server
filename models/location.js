const mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/**
 *  Country Schema
 *    type -> STRING: The type of the location (i.e. bridge, church, etc.)
 *    landmark -> BOOLEAN: Whether the location is considered a landmark
 *    name -> STRING: The name of the location
 *    location.continent -> STRING: The continent of the location
 *    location.country -> STRING: The country of the location
 *    location.area -> STRING: The area of the location, usually a state or province
 *    location.city -> STRING: The city of the location
 *    data.image -> STRING: A link to the image
 *    data.source -> STRING: A copyright source to the image if needed
 *    data.link -> STRING: A link to additional information
 *    data.info -> STRING: The info description of the location
 *    view.lat -> NUMBER: The latitude of the location
 *    view.lng -> NUMBER: The longitude of the location
 *    view.heading -> NUMBER: The heading of the location (0-360)
 *    view.pitch -> NUMBER: The pitch of the Street View camera
 *    view.zoom -> NUMBER: The zoom of the Street View camera
 *    view.indoor -> BOOLEAN: Whether the Street View camera of the location is indoors or not
 *    users.popularity -> NUMBER: Popularity rating of the view, defaulted to 0
 *    users.userCreated -> BOOLEAN: Whether the location is user created
 *    users.comments -> ARRAY (STRING): A list of comments for the location
 *    alternate -> OBJECT: An alternate Street View location, same object format as body.view
 *    
 */
const locationSchema = new Schema({
  type: String,
  landmark: Boolean,
  name: String,
  location: {
    continent: String,
    country: String,
    area: String,
    city: String
  },
  data: {
    info: String,
    link: String,
    image: String,
    source: String
  },
  view: {
    lat: Number,
    lng: Number,
    heading: Number,
    pitch: Number,
    zoom: Number,
    indoor: Boolean
  },
  alternate: {
    lat: Number,
    lng: Number,
    heading: Number,
    pitch: Number,
    zoom: Number,
    indoor: Boolean
  },
  users: {
    popularity: Number,
    userCreated: Boolean,
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
  }
});

module.exports = mongoose.model("Location", locationSchema);