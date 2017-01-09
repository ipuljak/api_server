const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/**
 *  String property 'capitalize' to capitalize the first letter of a given word
 */
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

module.exports = router;