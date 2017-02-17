const express = require('express')
  , router = express.Router()
  , mongoose = require('mongoose')
  , Country = require('../models/country');

/**
 *  POST route /add_country
 *    Creates a new view country
 *    -> http://localhost:3001/api/street_view/countries/add_country
 *    Requirements:
 *      body.name -> The name of the country
 *      body.data.image -> A link to the image
 *      body.data.source -> A copyright source to the image if needed
 *      body.data.link -> A link to additional information
 *      body.data.info -> The info description of the country
 *    Example usage of the request body:
 *    {
 *      "name": "Canada",
 *      "data": {
 *        "image": "https://imgur.com/some_image",
 *        "source": "Copyright Some Person CC/SA 3.0",
 *        "link": "https://wikipedia.org/Canada",
 *        "info": "Canada is a great place to live"
 *      }
 *    }
 *    Returns a success string if created
 */
router.post('/add_country', (req, res) => {
  // Instantiate the new country object to be placed into the database
  const newCountry = {
    name: req.body.name,
    data: req.body.data,
    users: req.body.users
  };
  // Save the object into the database
  Country.create(newCountry, (err, country) => {
    if (err) {
      res.send({
        error: err
      });
    } else {
      res.status(201).send(`Success: Added country: ${country.name}`);
    }
  });
});

module.exports = router;