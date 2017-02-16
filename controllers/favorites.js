const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Authentication = require('../middleware/authentication');
const passportService = require('../config/passport');

const requireAuth = passport.authenticate('jwt', { session: false });

// Load in the models
const User = require('../models/user');

/**
 *  GET get_favorites API call which fetches all of the users favorited views
 */
router.get('/get_favorites', function (req, res) {
  User.find({ 'username': req.query.username }, function (err, result) {
    if (err) {
      res.send(404, "Could not find user.");
    } else {
      if (result[0]) {
        res.send(result[0].favorites);
      } else {
        res.send(404, "User not found.");
      }
    }
  });
});

/**
 *  PUT add_favorite API call which adds a new favorite view of the user
 */
router.put('/add_favorite', requireAuth, function (req, res) {
  User.findOneAndUpdate(
    { username: req.user.username },
    { $addToSet: { favorites: mongoose.Types.ObjectId(req.query.id) } },
    { safe: true, upsert: true },
    function (err, updatedFavorites) {
      if (err) {
        res.send(400, "There was an error favoriting this view.");
      } else {
        res.send(201, "Success");
      }
    })
});

/**
 *  PUT remove_favorite API call which unfavorites a view of the user
 */
router.put('/remove_favorite', requireAuth, function (req, res) {
  User.findOneAndUpdate(
    { username: req.user.username },
    { $pull: { favorites: mongoose.Types.ObjectId(req.query.id) } },
    function (err, updatedFavorites) {
      if (err) {
        res.send(400, "There was an error unfavoriting this view.");
      } else {
        res.send(201, "Success");
      }
    })
});

module.exports = router;