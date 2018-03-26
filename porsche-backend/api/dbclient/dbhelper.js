var redis = require('redis');

exports.getRedisClient = function() {
  var redisClient = redis.createClient({
    host: 'redis.cache.windows.net',
    port: '6379',
    password: '',
    retry_strategy: function (options) {
          if (options.error.code === 'ECONNREFUSED') {
              // End reconnecting on a specific error and flush all commands with a individual error
              return new Error('The server refused the connection');
          }
          if (options.total_retry_time > 1000 * 60 * 60) {
              // End reconnecting after a specific timeout and flush all commands with a individual error
              return new Error('Retry time exhausted');
          }
          if (options.times_connected > 10) {
              // End reconnecting with built in error
              return undefined;
          }
          // reconnect after
          return Math.max(options.attempt * 100, 3000);
      }
  });
  return redisClient;
}




// exports.log_geolocation = function(req, res){
//   var redisClient = redis.createClient({
//     host: 'corosredis.redis.cache.windows.net',
//     port: '6379',
//     password: '96KrJROB6GsCPaFSNt2uoin4BinT1VP473n4bFX5Mp0=',
//     retry_strategy: function (options) {
//           if (options.error.code === 'ECONNREFUSED') {
//               // End reconnecting on a specific error and flush all commands with a individual error
//               return new Error('The server refused the connection');
//           }
//           if (options.total_retry_time > 1000 * 60 * 60) {
//               // End reconnecting after a specific timeout and flush all commands with a individual error
//               return new Error('Retry time exhausted');
//           }
//           if (options.times_connected > 10) {
//               // End reconnecting with built in error
//               return undefined;
//           }
//           // reconnect after
//           return Math.max(options.attempt * 100, 3000);
//       }
//   });
//   redisClient.on('error', function(err){
//     console.log('Something went wrong while connecting to azure redis', err)
//   });
//
//   var jsonObj = {};
//   if("latitude" in req.body && "longitude" in req.body && "vanId" in req.body && "timestamp" in req.body){
//     jsonObj.result = "Geolocation logged!";
//     jsonObj.data = req.body;
//     redisClient.hset("coroslocation", "latitude", req.body.latitude, redis.print);
//     redisClient.hset("coroslocation", "longitude", req.body.longitude, redis.print);
//     console.log("Geolocation set successfully in azure redis");
//   }
//   else {
//     jsonObj.result = "Parameters Missing! Geolocation not logged. lat long vanId & ts required";
//   }
//   redisClient.quit();
//   res.json(jsonObj);
//
// };
