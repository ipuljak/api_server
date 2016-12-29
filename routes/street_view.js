const express = require('express');
const router = express.Router();

// Load in the models
const Location = require('../models/location');
const Country = require('../models/country');
const Category = require('../models/category');
const Comment = require('../models/comment');

var mongoose = require('mongoose');

/**
 *  String property 'capitalize' to capitalize the first letter of a given word
 */
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

/**
 *  GET distinct locations API call. To use:
 *      -> http://localhost:3001/api/street_view/get_distincts
 *      It returns a list of all the distinct types and cities.
 */
router.get('/get_distincts', function(req, res) {
    var distincts = {};

    Category.find({}, function(err, result) {
        if (err) {
            res.send(404);
        } else {
            distincts['type'] = result.sort(function(a,b) {
                return a.name.localeCompare(b.name);
            });
        }
    });

    Country.find({}, {'name':1, 'data.image':1}, function(err, result) {
        if (err) {
            res.send(404);
        } else {
            distincts['country'] = result.sort(function(a,b) {
                return a.name.localeCompare(b.name);
            });
            res.send(distincts);
        }
    });
});

/**
 *  GET country info API call. To use:
 *      -> http://localhost:3001/api/street_view/get_country_info?country=[country]
 *      It returns the information of a given country along with it's cities.
 */
router.get('/get_country_info', function(req, res) {
    var info = {};
    var country = req.query.country;
    var term = {'location.country': country};

    Country.findOne({name: country}, function(err, result) {
        if (err) {
            res.send(404);
        } else {
            info['country'] = result;

            Location.distinct('location.city', term, function(err, result) {
                if (err) {
                    res.send(404);
                } else {
                    info['cities'] = result;
                    res.send(info);
                }
            });
        }
    });
});

/**
 *  GET location API call. To use:
 *      -> http://localhost:3001/api/street_view/get_locations?type=[type]&city=[name],country=[name],name=[name]
 *      where type can be:
 *          city, country, landmark, location, museum, zoo, sports, religious, etc
 *      and city can be the name of a city
 *      and country the name of a country, etc..
 *      Parameters are optional. Leave blank to return all possible locations.
 */
router.get('/get_locations', function(req, res) {

    var term = {};
    var keys = Object.keys(req.query);

    for (var i = 0; i < keys.length; i++) {
        if (['city', 'country', 'continent', 'area'].indexOf(keys[i]) > -1) {
            term['location.' + keys[i]] = req.query[keys[i]];
        } else {
            term[keys[i]] = req.query[keys[i]];
        }
    }

    Location.find(term, function(err, result) {
        if (err) {
            res.send(404);
        } else {
            res.send(result);
        }
    });
});

/**
 *  GET location API call. To use:
 *      -> http://localhost:3001/api/street_view/search_locations?search=[term]
 *      where search can be any city or location type.
 *      Returns all resulting locations.
 */
router.get('/search_locations', function(req, res) {

    var term = {};

    // Search either by location type, landmark, or city
    if (req.query.search === 'landmark') {
        term = {'landmark':true};
    } else {
        term = {$or:[{'type':req.query.search}, 
            {'location.city':req.query.search}]};
    }

    Location.find(term, function(err, result) {
        if (err) {
            res.send(404);
        } else {
            res.send(result);
        }
    });
});

router.get('/get_comments', function(req, res) {
    var term = {
        'view_id': mongoose.Types.ObjectId(req.query.id)
    };

    console.log(term);

    Comment.find(term, function(err, result) {
        if (err) {
            res.send(404);
        } else {
            res.send(result);
        }
    });
});

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
router.post('/add_location', function(req, res) {
    
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
    Location.create(newLocation, function(err, newlyCreated) {
        if (err) {
            console.log('There was an error adding in the new location', err);
        } else {
            res.send(201, 'Success');
        }
    });
});

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
router.post('/add_category', function(req, res) {
    
    // Instantiate the new category object to be placed into the database
    const newCategory = {
        name: req.body.name,
        data: req.body.data
    };

    // Save the object into the database
    Category.create(newCategory, function(err, newlyCreated) {
        if (err) {
            console.log('There was an error adding in the new category', err);
        } else {
            res.send(201, 'Success');
        }
    });
});

router.post('/post_comment', function(req, res) {
    const newComment = {
        view_id: req.query.id,
        text: req.body.comment,
        username: req.body.username
    };

    // Location.findById(newComment.view, function(err, location) {
    //     if (err) {
    //         console.log("There was an error finding the location", err);
    //         res.send(404, 'Error 1');
    //     } else {
    Comment.create(newComment, function(err, comment) {
        if (err) {
            console.log("There was an error creating the comment", err);
            res.send(404, 'Error 2');
        } else {
            // location.users['comments'].push(comment);
            // location.save();
            console.log("Success");
            res.send(201, 'Success');
        }
    })
});

module.exports = router;
