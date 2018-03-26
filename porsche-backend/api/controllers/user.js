// Load required packages
var User = require('../models/user');
var Redis = require('../dbclient/dbhelper');
var redis = require('redis');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  var jsonResult = {};
  //var userExists = User.userExists(req.body.username);
  User.userExists(req.body.username, function(boolVal) {
    if(!boolVal){
      User.createUser(req.body.username, req.body.password);
      jsonResult.result = "User Added!";
      jsonResult.data = {username: req.body.username};
      res.json(jsonResult);
    } else {
      jsonResult.result = "User already exists!";
      jsonResult.data = {username: req.body.username};
      res.json(jsonResult);
    }
  });
  };

exports.getUserData = function(req, res) {
  console.log("Inside get user data controller");
  var username = req.query.username;
  var dbClientUser = Redis.getRedisClient();
  dbClientUser.hget("trackevent_"+username, "data", function(err, value) {
    var jsonString = value;
    jsonString = jsonString.replace(/\\/g, "");
    console.log("User data hash value is: "+jsonString);
    var jsonResult = JSON.parse(jsonString);
    console.log("jsonResponse is: "+JSON.stringify(jsonResult));
    res.json(jsonResult);
  });
  dbClientUser.quit();
};

exports.setUserData = function(req, res) {
  console.log("Inside set user data controller");
  var username = req.query.username;
  var dataString = JSON.stringify(req.body);
  console.log("Setting this data in redis: "+dataString);
  // data.laps =  req.body.laps;
  // data.best_lap_time = req.body.best_lap_time;
  // data.top_speed = req.body.top_speed;
  // data.avg_speed = req.body.avg_speed;
  var dbClientUser = Redis.getRedisClient();
  dbClientUser.hset("trackevent_"+username, "data", dataString, redis.print);
  dbClientUser.quit();
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  var jsonResult = {};
  jsonResult.users = [{"user" : "testuser1"}, {"user" : "testuser2"}];
  res.json(jsonResult);
};
