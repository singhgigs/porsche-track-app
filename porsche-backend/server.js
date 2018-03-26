// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var eventController = require('./api/controllers/event');
var userController = require('./api/controllers/user');
var authController = require('./api/controllers/auth');

var port = process.env.PORT || 3000;

// Connect to the trackdb MongoDB
mongoose.connect('mongodb://localhost:27017/trackdb');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /events
router.route('/events')
.post(authController.isAuthenticated, eventController.postEvents)
.get(authController.isAuthenticated, eventController.getEvents);

router.route('/userdata')
.get(userController.getUserData)
.post(userController.setUserData);


// Create endpoint handlers for /events/:event_id
router.route('/beers/:event_id')
.get(authController.isAuthenticated, eventController.getEvent)
.put(authController.isAuthenticated, eventController.putEvent)
.delete(authController.isAuthenticated, eventController.deleteEvent);

// Create endpoint handlers for /users:event_id
router.route('/users')
.post(userController.postUsers)
.get(authController.isAuthenticated, userController.getUsers);

// Register all our routes with /api
app.use('/api', router);

app.listen(port);

console.log('Porsche backend server started on: ' + port);
