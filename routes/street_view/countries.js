const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load in the models
const Country = require('../../models/country');

/**
 *  POST country API call. To use:
 *      -> http://localhost:3001/api/add_country
 *  Example usage:
 *  {
 *      "name": "Canada",
 *      "data": {
 *          "image": ------
 *          "link": -------
 *          "source": -----
 *          "info": -------
 *      }
 *      "users": [This field is set automatically]
 *  }
 */
router.post('/add_country', function(req, res) {
    
    // Instantiate the new country object to be placed into the database
    const newCountry = {
        name: req.body.name,
        data: req.body.data,
        users: req.body.users
    };

    // Save the object into the database
    Country.create(newCountry, function(err, newlyCreated) {
        if (err) {
            console.log('There was an error adding in the new country', err);
        } else {
            res.send(201, 'Success');
        }
    });
});

module.exports = router;