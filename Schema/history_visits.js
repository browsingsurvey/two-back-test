"use strict";

/* jshint node: true */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('history_visits', new Schema({
  user: String,
  data: String,
  hid: Number,
  time: Number,
  timeloc: String,
  idx: Number,
  totalparts: Number,
}));
