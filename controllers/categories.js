const express = require('express')
  , router = express.Router()
  , mongoose = require('mongoose')
  , Category = require('../models/category');

/**
 *  POST route /add_category
 *    -> http://localhost:3001/api/street_view/categories/add_category
 *    Creates a new view category
 *    Requirements:
 *      body.name -> The name of the category
 *      body.data.image -> A link to the image
 *      body.data.source -> A copyright source to the image if needed
 *    Example usage of the request body:
 *    {
 *      "name": "Bridge",
 *      "data": {
 *        "image": "https://imgur.com/some_image"
 *        "source": "Copyright Some Person CC/SA 3.0"
 *      }
 *    }
 */
router.post('/add_category', (req, res) => {
  // Instantiate the new category object to be placed into the database
  const newCategory = {
    name: req.body.name,
    data: req.body.data
  };
  // Save the object into the database
  Category.create(newCategory, (err, category) => {
    if (err) {
      res.send({
        error: err
      });
    } else {
      res.status(201).send('Success: Added category: ' + category.name);
    }
  });
});

module.exports = router;