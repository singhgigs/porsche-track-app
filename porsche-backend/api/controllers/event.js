// Load required packages
var Event = require('../models/event');

// Create endpoint /api/events for POST
exports.postEvents = function(req, res) {
  // Create a new instance of the Event model
  var event = new Event();

  // Set the event properties that came from the POST data
  event.name = req.body.name;
  event.type = req.body.type;
  event.id = req.body.id;
  event.quantity = req.body.quantity;
  event.userId = req.user._id;

  // Save the event and check for errors
  event.save(function(err) {
    if (err)
      return res.send(err);
    res.json({ message: 'New track event created!', data: event });
    //write event to db here
  });
};

// Create endpoint /api/events for GET
exports.getEvents = function(req, res) {
  // Use the Event model to find all events
  Event.find({ userId: req.user._id }, function(err, events) {
    if (err)
      return res.send(err);
      //Return events for a user
    res.json(events);
  });
};

// Create endpoint /api/events/:event_id for GET
exports.getEvent = function(req, res) {
  // Use the event model to find a specific event
  Event.find({ userId: req.user._id, _id: req.params.event_id }, function(err, event) {
    if (err)
      return res.send(err);

    res.json(event);
  });
};

// Create endpoint /api/events/:event_id for PUT
exports.putEvent = function(req, res) {
  // Use the event model to find a specific event
  Event.update({ userId: req.user._id, _id: req.params.event_id }, { quantity: req.body.quantity }, function(err, num, raw) {
    if (err)
      return res.send(err);

    res.json({ message: num + ' updated' });
  });
};

// Create endpoint /api/events/:event_id for DELETE
exports.deleteEvent = function(req, res) {
  // Use the Event model to find a specific event and remove it
  Event.remove({ userId: req.user._id, _id: req.params.event_id }, function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'Event removed!' });
  });
};
