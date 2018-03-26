// 'use strict';
// module.exports = function(app) {
//   var eventController = require('./controllers/event');
//   var userController = require('./controllers/user');
//   var authController = require('./controllers/auth');
//
//   // // coros Routes
//   // app.route('/vans')
//   //   .get(coros.list_all_vans)
//   //   .post(coros.create_a_van);
//   //
//   // app.route('/geolocation')
//   //   .post(coros.log_geolocation);
//   //
//   //
//   // app.route('/vans/:vanId')
//   //   .get(coros.read_a_van)
//   //   .put(coros.update_a_van)
//   //   .delete(coros.delete_a_van);
//
//     // Create endpoint handlers for /events
//   app.route('/events')
//     .post(authController.isAuthenticated, eventController.postEvents)
//     .get(authController.isAuthenticated, eventController.getEvents);
//
//   // Create endpoint handlers for /events/:event_id
//   router.route('/beers/:beer_id')
//     .get(authController.isAuthenticated, eventController.getEvent)
//     .put(authController.isAuthenticated, eventController.putEvent)
//     .delete(authController.isAuthenticated, eventController.deleteEvent);
//
//   // Create endpoint handlers for /users
//   router.route('/users')
//     .post(userController.postUsers)
//     .get(authController.isAuthenticated, userController.getUsers);
// };
