const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load in the models
const Category = require('../../models/category');

/**
 *  POST country API call. To use:
 *      -> http://localhost:3001/api/add_category
 *  Example usage:
 *  {
 *      "name": "Bridge",
 *      "data": {
 *          "image": ------
 *          "source": -----
 *      }
 *  }
 */
router.post('/add_category', function (req, res) {

  // Instantiate the new category object to be placed into the database
  const newCategory = {
    name: req.body.name,
    data: req.body.data
  };

  // Save the object into the database
  Category.create(newCategory, function (err, newlyCreated) {
    if (err) {
      console.log('There was an error adding in the new category', err);
    } else {
      res.send(201, 'Success');
    }
  });
});

module.exports = router;