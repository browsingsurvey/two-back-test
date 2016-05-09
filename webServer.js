"use strict";
/*
var mongoose = require('mongoose');
var async = require('async');

var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');

//Load the Mongoose schema for SurveyResult
var SurveyResult = require('./Schema/TestResult.js');

var express = require('express');
var app = express();

app.use(session({secret: 'secretKey', resave: false, saveUninitialized: false}));
app.use(bodyParser.json({limit: '1000mb'}));

var is_heroku = false;
var mongo_url = 'mongodb://localhost/hci-project';
/*if (process.env.MONGODB_URI) {
    is_heroku = true;
    mongo_url = process.env.MONGODB_URI;
}

var http_port = 3000
if (process.env.PORT) {
    http_port = process.env.PORT;
}

mongoose.connect(mongo_url);

// We have the express static module (http://expressjs.com/en/starter/static-files.html) do all
// the work for us.
app.use(express.static(__dirname));

*/


var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');

// Load the Mongoose Test Result
var TestResult = require('./Schema/TestResult.js');

var express = require('express');
var app = express();

app.use(session({secret: 'secretKey', resave: false, saveUninitialized: false}));
app.use(bodyParser.json({limit: '1000mb'}));

var is_heroku = false;
var mongo_url = 'mongodb://localhost/hci-project';
if (process.env.MONGODB_URI) {
    is_heroku = true;
    mongo_url = process.env.MONGODB_URI;
}

var http_port = 3000
if (process.env.PORT) {
    http_port = process.env.PORT;
}

mongoose.connect(mongo_url);

// We have the express static module (http://expressjs.com/en/starter/static-files.html) do all
// the work for us.
app.use(express.static(__dirname));







app.post('/testResult', function(request, response) {

    var id = request.body.id;
    var num_correct = request.body.num_correct;
    var num_total = request.body.num_total;
    var answer_array = request.body.answer_array;
    var feedback = request.body.feedback;
    var letters = request.body.letters;
    var times = request.body.times;
   
    TestResult.create({id: id,
                     num_correct: num_correct,
                     num_total: num_total,
                     answer_array: answer_array,
                     feedback: feedback,
                     letters: letters,
                     times: times
                }, function(err, result) {
                console.log('Saved new test result');
                console.log(err);
                console.log(result);
                response.status(200).send(JSON.stringify(result)); 
        }); 

});

/*
require('./log_history')(app)
if (!is_heroku) { // disable this on heroku to avoid potentially crashing the server
    require('./view_history')(app)
}
*/

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});

/*
var server = app.listen(http_port, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});
*/

