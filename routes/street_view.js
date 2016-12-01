const express = require('express');
const router = express.Router();
const Location = require('../models/location');

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

/**
 *  GET location API call. To use:
 *      -> http://localhost:3001/api/get_locations?type=[type]
 *      where type can be:
 *          city: return all city locations
 *          landmark: return all landmark locations
 *      or blank to return every location
 */
router.get('/get_locations', function(req, res) {
    
    var byType = {};

    // Check to see if a type was specified
    if (typeof req.query.type !== 'undefined') {
        byType = {type: req.query.type};
    }

    // Look up all locations with the given type (or all otherwise)
    Location.find(byType, function(err, result) {
        if (err) {
            res.send(404);
        } else {
            res.send(result);
        }
    });
});


router.get('/find_city_locations', function(req, res) {

    var term = {'location.city': req.query.city.toLowerCase().capitalize()};

    Location.find(term, function(err, result) {
        if (err) {
            res.send(404);
        } else {
            res.send(result);
        }
    });
});

/**
 *  POST location API call. To use:
 *      -> http://localhost:3001/api/add_location
 *  Example usage:
 *   {
        "type": "city | country | location | landmark",
        "location": {
            "continent": "North America",
            "country": "Canada",
            "area": "Ontario",
            "city": "Toronto"
        },
        "data": {
            "blurb": "Toronto is a blah blah blah blah blah",
            "link": "www.wikipedia.org/Toronto",
            "image": "www.wikipedia.org/Toronto.jpg"
        },
        "view": {
            "lat": 43.64918,
            "lng": -79.377907,
            "heading": 250,
            "pitch": 0,
            "zoom": 1
        }
    }
 */
router.post('/add_location', function(req, res) {
    
    // Instantiate the new location object to be placed into the database
    const newLocation = {
        type: req.body.type,
        name: req.body.name,
        location: req.body.location,
        data: req.body.data,
        view: req.body.view,
        users: req.body.users
    };

    // Save the object into the database
    Location.create(newLocation, function(err, newlyCreated) {
        if (err) {
            console.log('There was an error adding in the new location', err);
        } else {
            res.send(201, 'Success');
        }
    });
});

module.exports = router;