var express        = require("express"),
	bodyparser     = require("body-parser"),
    morgan         = require("morgan"),
	mongoose       = require("mongoose"),
    cors           = require("cors"),
	Location       = require("./models/location"),
	User           = require("./models/user"),
	app            = express();

// Routes setup
var streetViewAPI  = require("./routes/street_view"),
    authRoutes = require("./routes/auth");

// Database setup
mongoose.connect('mongodb://localhost/street_view');

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyparser.json({type: '*/*'}));

// Define the routes for our app to use
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
})

app.use("/auth", authRoutes);
app.use("/api/street_view", streetViewAPI);

// Start the server and listen on the specified port
app.listen(3001, process.env.IP, function() {
	console.log("The StreetView API server has started on port 3001.");
}); 