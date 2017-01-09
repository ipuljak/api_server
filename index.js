var express        = require('express'),
	bodyparser     = require('body-parser'),
    morgan         = require('morgan'),
	mongoose       = require('mongoose'),
    cors           = require('cors'),
	Location       = require('./models/location'),
	User           = require('./models/user'),
	config         = require('./config'),
	app            = express();

// Routes setup
var streetViewAuth = require('./routes/street_view/auth'),
	streetViewCategories = require('./routes/street_view/categories'),
	streetViewComments = require('./routes/street_view/comments'),
	streetViewCountries = require('./routes/street_view/countries'),
	streetViewInfo = require('./routes/street_view/info'),
	streetViewLocations = require('./routes/street_view/locations');

// Database setup
var databaseLink = 'mongodb://default:' + config.password + '@localhost/street_view';
mongoose.connect(databaseLink);

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyparser.json({type: '*/*'}));

// Define the routes for our app to use
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.use('/api/street_view/auth', streetViewAuth);
app.use('/api/street_view/categories', streetViewCategories);
app.use('/api/street_view/comments', streetViewComments);
app.use('/api/street_view/countries', streetViewCountries);
app.use('/api/street_view/info', streetViewInfo);
app.use('/api/street_view/locations', streetViewLocations);


// Start the server and listen on the specified port
app.listen(3001, process.env.IP, function() {
	console.log('The API server has started on port 3001.');
}); 