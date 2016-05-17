"use strict";

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
    var two_back_results = request.body.two_back_results;
    var three_back_results = request.body.three_back_results;
    var feedback = request.body.feedback;
    
    TestResult.create({id: id,
                       two_back_results: two_back_results,
                       three_back_results: three_back_results,
                       feedback: feedback 
                }, function(err, result) {
                console.log('Saved new test result');
                console.log(err);
                console.log(result);
                response.status(200).send(JSON.stringify(result)); 
        }); 
});

require('./log_history')(app)
if (!is_heroku) { // disable this on heroku to avoid potentially crashing the server
    require('./view_history')(app)
}

var server = app.listen(http_port, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});


