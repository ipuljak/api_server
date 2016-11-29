var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Define the schema for the location of our street view component
var locationSchema = new Schema({
    type: String,
    name: String,
    location: {
        city: String,
        area: String,
        country: String
    },
    position: {
        lat: Number,
        lng: Number,
        heading: Number,
        pitch: Number,
        zoom: Number
    },
    stats: {
        plays: Number,
        averageTime: Number,
        userCreated: Boolean
    },
    questions: [String]
});

module.exports = mongoose.model("Location", locationSchema);