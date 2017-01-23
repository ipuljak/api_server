const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load in the models
const Location = require('../../models/location');

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
router.post('/add_location',(req, res) => {

  // Instantiate the new location object to be placed into the database
  const newLocation = {
    type: req.body.type,
    landmark: req.body.landmark,
    name: req.body.name,
    location: req.body.location,
    data: req.body.data,
    view: req.body.view,
    users: req.body.users,
    alternate: req.body.alternate
  };

  // Save the object into the database
  Location.create(newLocation, (err, newlyCreated) => {
    if (err) {
      console.log('There was an error adding in the new location', err);
    } else {
      res.send(201, 'Success');
    }
  });
});

module.exports = router;