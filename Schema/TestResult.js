"use strict";

/* jshint node: true */

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var testresult = new Schema({
	id: String,
	two_back_results: Object,
	three_back_results: Object,
	feedback: String
});

// the schema is useless so far
// we need to create a model using it
var TestResult = mongoose.model('TestResult', testresult);

// make this available 
module.exports = TestResult;
