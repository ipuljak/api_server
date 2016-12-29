var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Define the schema for the location of our street view component
var locationSchema = new Schema({
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