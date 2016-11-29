var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
    //id: Schema.Types.ObjectId,
    type: String,
    name: String,
    location: {
        city: String,
        area: String,
        country: String
    },
    position: {
        lat: Number,
        lng: Number
    },
    zoom: Number,
    questions: [String],
    plays: Number,
    averageTime: Number,
    userCreated: Boolean
});

module.exports = mongoose.model("Location", locationSchema);