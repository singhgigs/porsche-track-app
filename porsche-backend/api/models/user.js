var Redis = require('../dbclient/dbhelper');
var redis = require('redis');
var bcrypt = require('bcrypt');
const saltRounds = 10;

exports.createUser = function(uname, pword) {
  //Generate password hash
  var pwordhash = bcrypt.hashSync(pword, saltRounds);
  var dbClientUser = Redis.getRedisClient();
  dbClientUser.hset("usershash", uname, "active", redis.print);
  dbClientUser.hset("USER_"+uname, "password", pwordhash, redis.print);
  dbClientUser.hset("USER_"+uname, "events", "none", redis.print);
  dbClientUser.quit();
}

exports.userExists = function(uname, callback) {
  var userExistsBool = false;
  var dbClientUser = Redis.getRedisClient();
  dbClientUser.hget("usershash", uname, function(err, value) {
    console.log("Current user hash value is: "+value);
    if(value == null || value == "deleted") {
      console.log("User does not exist: "+uname);
      dbClientUser.quit();
      callback(false);
    }
    else {
      console.log("User already exists: "+uname);
      dbClientUser.quit();
      callback(true);
    }
  });
};


exports.verifyPassword = function(uname, pword, callback) {
  var dbClientUser = Redis.getRedisClient();
  dbClientUser.hget("USER_"+uname, "password", function(err, value) {
    console.log("Verifying pword. saved pword is: "+value);
    if(bcrypt.compareSync(pword, value)) {
      console.log("Passwords match!");
      callback(true);
    } else {
      callback(false);
    }
  });
  dbClientUser.quit();
};
