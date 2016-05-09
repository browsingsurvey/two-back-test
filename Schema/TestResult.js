"use strict";

/* jshint node: true */

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var testresult = new Schema({
	id: String,
	num_correct: Number,
	num_total: Number,
	answer_array: Array,
	feedback: String,
	letters: Array,
	times: Array,
	feedback: String
});

// the schema is useless so far
// we need to create a model using it
var TestResult = mongoose.model('TestResult', testresult);

// make this available 
module.exports = TestResult;
