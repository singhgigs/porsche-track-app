var redis = require('redis');

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

console.log("Sending simulated data for porsche2");
//Data randomization to simulate driving
var randomLaps = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
var randomAvgSpeed = Math.floor(Math.random() * (80 - 50 + 1)) + 50;
var randomTopSpeed = Math.floor(Math.random() * (180 - 90 + 1)) + 90;
var random0to60 = (Math.floor(Math.random() * (8 - 2 + 1)) + 2)+"s";
var randomLapTime = "3:"+(Math.floor(Math.random() * (55 - 10 + 1)) + 10);
var randomG = "1."+(Math.floor(Math.random() * (55 - 0 + 1)) + 0);
var jsonDataString = JSON.stringify({
            laps: randomLaps+"",
            best_lap_time: randomLapTime+"",
            top_speed: randomTopSpeed+"",
            avg_speed: randomAvgSpeed+"",
            best_0_60: random0to60+"",
            max_g_force: randomG,
          });
redisClient.hset("trackevent_"+"porsche2", "data", jsonDataString, redis.print);

console.log("Sending simulated data for porsche3");
//Data randomization to simulate driving
var randomLaps = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
var randomAvgSpeed = Math.floor(Math.random() * (80 - 50 + 1)) + 50;
var randomTopSpeed = Math.floor(Math.random() * (180 - 90 + 1)) + 90;
var random0to60 = (Math.floor(Math.random() * (8 - 2 + 1)) + 2)+"s";
var randomLapTime = "3:"+(Math.floor(Math.random() * (55 - 10 + 1)) + 10);
var randomG = "1."+(Math.floor(Math.random() * (55 - 0 + 1)) + 0);
var jsonDataString = JSON.stringify({
            laps: randomLaps+"",
            best_lap_time: randomLapTime+"",
            top_speed: randomTopSpeed+"",
            avg_speed: randomAvgSpeed+"",
            best_0_60: random0to60+"",
            max_g_force: randomG,
          });
redisClient.hset("trackevent_"+"porsche3", "data", jsonDataString, redis.print);

redisClient.quit();
