const express = require('express')
  , router = express.Router()
  , mongoose = require('mongoose')
  , Location = require('../models/location');

/**
 *  POST route /add_location
 *    Adds a new location to the website
 *    -> http://localhost:3001/api/locations/add_location
 *    Requirements:
 *      body.type -> The type of the location (i.e. bridge, church, etc.)
 *      body.landmark -> Boolean true|false whether the location is considered a landmark
 *      body.name -> The name of the location
 *      body.location.continent -> The continent of the location
 *      body.location.country -> The country of the location
 *      body.location.area -> The area of the location, usually a state or province
 *      body.location.city -> The city of the location
 *      body.data.image -> A link to the image
 *      body.data.source -> A copyright source to the image if needed
 *      body.data.link -> A link to additional information
 *      body.data.info -> The info description of the location
 *      body.view.lat -> The latitude of the location
 *      body.view.lng -> The longitude of the location
 *      body.view.heading -> The heading of the location (0-360)
 *      body.view.pitch -> The pitch of the Street View camera
 *      body.view.zoom -> The zoom of the Street View camera
 *      body.view.indoor -> Boolean true|false whether the Street View camera of the location is indoors or not
 *      body.users.popularity -> Popularity rating of the view, defaulted to 0
 *      body.users.userCreated -> Boolean true|false whether the location is user created
 *      body.users.comments -> A list of comments for the location
 *      body.alternate -> An alternate Street View location, same object format as body.view
 *    Returns a success string when created
 */
router.post('/add_location', (req, res) => {
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
      res.send({
        error: err
      });
    } else {
      res.status(201).send(`Success: Location ${req.body.name} created`);
    }
  });
});

module.exports = router;