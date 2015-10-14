'use strict';

var mongoose = require('mongoose');

var stockSchema = new mongoose.Schema({
  // Owner: {Object._id}
  Company: String,
  Symbol: String,
  Shares: Number,
  Price: Number,
  Total: Number,
});


module.exports = mongoose.model('Stock', stockSchema);
