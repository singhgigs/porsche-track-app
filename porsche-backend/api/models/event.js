// Load required packages
var mongoose = require('mongoose');

// Define event schema
var EventSchema   = new mongoose.Schema({
  name: String,
  type: String,
  quantity: Number,
  userId: String
});

// Export the Mongoose model
module.exports = mongoose.model('Event', EventSchema);
