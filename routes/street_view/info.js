const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load in the models
const Location = require('../../models/location');
const Country = require('../../models/country');
const Category = require('../../models/category');

/**
 *  GET distinct locations API call. To use:
 *      -> http://localhost:3001/api/street_view/get_distincts
 *      It returns a list of all the distinct types and cities.
 */
router.get('/get_distincts', function (req, res) {
  var distincts = {};

  Category.find({}, function (err, result) {
    if (err) {
      res.send(404);
    } else {
      distincts['type'] = result.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    }
  });

  Country.find({}, { 'name': 1, 'data.image': 1 }, function (err, result) {
    if (err) {
      res.send(404);
    } else {
      distincts['country'] = result.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
      res.send(distincts);
    }
  });
});

/**
 *  GET location API call. To use:
 *      -> http://localhost:3001/api/street_view/info/search_locations?search=[term]
 *      where search can be any city or location type.
 *      Returns all resulting locations.
 */
router.get('/search_locations', function (req, res) {

  var term = {};

  // Search either by location type, landmark, or city
  if (req.query.search === 'landmark') {
    term = { 'landmark': true };
  } else {
    term = {
      $or: [{ 'type': req.query.search },
      { 'location.city': req.query.search }]
    };
  }

  Location.find(term, function (err, result) {
    if (err) {
      res.send(404);
    } else {
      res.send(result);
    }
  });
});

/**
 *  GET country info API call. To use:
 *      -> http://localhost:3001/api/street_view/info/get_country_info?country=[country]
 *      It returns the information of a given country along with it's cities.
 */
router.get('/get_country_info', function (req, res) {
  var info = {};
  var country = req.query.country;
  var term = { 'location.country': country };

  Country.findOne({ name: country }, function (err, result) {
    if (err) {
      res.send(404);
    } else {
      info['info'] = result;

      Location.distinct('location.city', term, function (err, cities) {
        if (err) {
          res.send(404);
        } else {
          info['cities'] = cities;
          res.send(info);
        }
      });
    }
  });
});

module.exports = router;