// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

passport.use(new BasicStrategy(
  function(username, password, callback) {
    console.log("Inside passport. Username: "+username);
      // No user found with that username
      User.userExists(username, function(doesUeserExist) {
        if(!doesUeserExist) {
          console.log("user does not exist auth failed");
          return callback(null, false);
        } else {
          console.log("Trying to verify password");
          User.verifyPassword(username, password, function(pwMatch) {
            if(pwMatch) {
              return callback(null, true);
            } else {
              return callback(null, false);
            }
          });
        }
      });
    }));

exports.isAuthenticated = passport.authenticate('basic', { session : false });
