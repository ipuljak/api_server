const express = require('express')
  , router = express.Router()
  , mongoose = require('mongoose')
  , Category = require('../models/category')
  , Country = require('../models/country')
  , Location = require('../models/location');

/**
 *  GET route /get_distincts
 *    Get all of the distinct categories and countries that host views
 *    -> http://localhost:3001/api/street_view/info/get_distincts
 *    Returns an object containing lists of all available categories and countries
 */
router.get('/get_distincts', (req, res) => {
  let distincts = {};
  // Find all of the categories and insert them into the distincts object
  Category.find({}, (err, result) => {
    if (err) {
      res.send({
        error: err
      });
    } else {
      // Sort the categories alphabetically
      distincts['type'] = result.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
  });

  // Find all of the countries and insert them into the distincts object
  Country.find({}, { 'name': 1, 'data.image': 1 }, (err, result) => {
    if (err) {
      res.send({
        error: err
      });
    } else {
      // Sort the countries alphabetically
      distincts['country'] = result.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      // Send the object to the user
      res.send(distincts);
    }
  });
});

/**
 *  GET route /search_locations
 *    Search all locations given a city or location type
 *    -> http://localhost:3001/api/street_view/info/search_locations?search=[TERM]
 *    Requirements:
 *      query.search -> A city or location type (e.g. landmark, church, Toronto, Prague, etc).
 *    Returns a list of views under the search term
 */
router.get('/search_locations', (req, res) => {
  let term = {};
  // Construct the term object based on the given query search term
  if (req.query.search === 'landmark') {
    term = { 'landmark': true };
  } else {
    term = {
      $or: [{ 'type': req.query.search },
      { 'location.city': req.query.search }]
    };
  }

  // Search either by location type, landmark, or city
  Location.find(term, (err, result) => {
    if (err) {
      res.send({
        error: err
      });
    } else {
      res.send(result);
    }
  });
});

/**
 *  GET route /get_country_info
 *    Obtain the information and cities of a queried country
 *    -> http://localhost:3001/api/street_view/info/get_country_info?country=[COUNTRY]
 *    Requirements:
 *      query.country -> The given country to obtain the information of
 *    Returns an object containing the country's information and it's cities
 */
router.get('/get_country_info', (req, res) => {
  const country = req.query.country;
  let info = {};
  let term = { 'location.country': country };
  // Find the given country and insert it's information into the constructed object
  Country.findOne({ name: country }, (err, result) => {
    if (err) {
      res.send({
        error: err
      });
    } else {
      info['info'] = result;
      // Search for the all of the cities in the given country
      Location.distinct('location.city', term, (err, cities) => {
        if (err) {
          res.send({
            error: err
          });
        } else {
          info['cities'] = cities;
          // Finally send the constructed object to the user
          res.send(info);
        }
      });
    }
  });
});

module.exports = router;