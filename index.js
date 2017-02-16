// Server requirements
const express = require('express')
  , bodyparser = require('body-parser')
  , methodOverride = require("method-override")
  , morgan = require('morgan')
  , mongoose = require('mongoose')
  , cors = require('cors')
  , Location = require('./models/location')
  , User = require('./models/user')
  , config = require('./config')
  , app = express();

// Server setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyparser.json({ type: '*/*' }));
app.use(methodOverride("_method"));

// Database setup
//const databaseLink = 'mongodb://default:' + config.password + '@localhost/street_view';
//mongoose.connect(databaseLink);
mongoose.connect('mongodb://localhost/street_view');

// Routes setup
const streetViewAuth = require('./controllers/auth'),
  streetViewCategories = require('./controllers/categories'),
  streetViewComments = require('./controllers/comments'),
  streetViewCountries = require('./controllers/countries'),
  streetViewFavorites = require('./controllers/favorites'),
  streetViewInfo = require('./controllers/info'),
  streetViewLocations = require('./controllers/locations');

// Set the index file to be served
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use('/api/street_view/auth', streetViewAuth);
app.use('/api/street_view/categories', streetViewCategories);
app.use('/api/street_view/comments', streetViewComments);
app.use('/api/street_view/countries', streetViewCountries);
app.use('/api/street_view/favorites', streetViewFavorites);
app.use('/api/street_view/info', streetViewInfo);
app.use('/api/street_view/locations', streetViewLocations);

// Start the server and listen on the specified port
app.listen(3001, process.env.IP, () => {
  console.log('The API server has started on port 3001.');
}); 