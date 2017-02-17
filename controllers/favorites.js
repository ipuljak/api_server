const express = require('express')
  , router = express.Router()
  , mongoose = require('mongoose')
  , passport = require('passport')
  , passportService = require('../config/passport')
  , Authentication = require('../middleware/authentication')
  , User = require('../models/user');

const requireAuth = passport.authenticate('jwt', { session: false });

/**
 *  GET route /get_favorites
 *    Retrieves a list of the user's favorite views
 *    -> http://localhost:3001/api/street_view/favorites/get_favorites?username=[USERNAME]
 *    Requirements:
 *      query.username -> The desired user's username
 *    Returns a list of all of the user's favorite views
 */
router.get('/get_favorites', (req, res) => {
  // Find the desired user in the database
  User.find({ 'username': req.query.username }, (err, result) => {
    if (err) {
      res.send({
        error: err
      });
    } else {
      // If the user is found, return a list of their favorite views
      if (result[0]) {
        res.send(result[0].favorites);
      } else {
        res.status(404).send(`User ${req.query.username} not found`);
      }
    }
  });
});

/**
 *  PUT route /add_favorite
 *    Adds a new favorite view to the user's list of favorites
 *    -> http://localhost:3001/api/street_view/favorites/add_favorite?username=[USERNAME]
 *    Requirements:
 *      query.id -> The unique view id
 *      user.username -> The username connected to the user's account
 *    Returns a success string if favorited
 */
router.put('/add_favorite', requireAuth, (req, res) => {
  // Find the user and update their favorites list with the new view
  User.findOneAndUpdate(
    { username: req.user.username },
    { $addToSet: { favorites: mongoose.Types.ObjectId(req.query.id) } },
    { safe: true, upsert: true },
    (err, updatedFavorites) => {
      if (err) {
        res.send({
          error: err
        });
      } else {
        res.status(201).send(`Success: View with id ${req.query.id} was favorited`);
      }
    });
});

/**
 *  PUT route /remove_favorite
 *    Removes a favorited view from the user's list of favorites
 *    -> http://localhost:3001/api/street_view/favorites/remove_favorite?username=[USERNAME]
 *    Requirements:
 *      query.id -> The unique view id
 *      user.username -> The username connected to the user's account
 *    Returns a success string if deleted
 */
router.put('/remove_favorite', requireAuth, (req, res) => {
  // Find the user and update their favorites list with the view removed
  User.findOneAndUpdate(
    { username: req.user.username },
    { $pull: { favorites: mongoose.Types.ObjectId(req.query.id) } },
    (err, updatedFavorites) => {
      if (err) {
        res.send({
          error: err
        });
      } else {
        res.status(201).send(`Success: View with id ${req.query.id} was deleted`);
      }
    });
});

module.exports = router;