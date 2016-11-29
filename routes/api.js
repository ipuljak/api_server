const express = require('express');
const router = express.Router();
const Location = '../models/location';

// Test to see if it works
router.get('/testing2', function(req, res) {
    res.send("Testing to see if API works.");
});

// CREATE a new location
router.post('/', function(req, res) {
    
});

module.exports = router;