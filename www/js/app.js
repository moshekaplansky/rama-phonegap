#!/usr/bin/env node --harmony

'use strict';
var express = require('express');
var bodyParser = require('body-parser'); // this allows us to pass JSON values to the server (see app.put below)
var app = express();
var mongoose = require('mongoose'); //new
var uriUtil = require('mongodb-uri');
var fs = require('fs');

// serve static content from the public folder 
app.use("/", express.static(__dirname + '/public'));


// parse the bodies of all other queries as json
app.use(bodyParser.json());
// log the requests
app.use(function(req, res, next) {
    console.log('%s %s %s', req.method, req.url, JSON.stringify(req.body));

    //console.log("myData = "+JSON.stringify(myData));
    next();
});

var mongodbUri= "mongodb://localhost/pleaseWork"; //change pleaseWork to the name of the db
var mongooseUri= uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback (){
    console.log("db connection");
})

fs.readdirSync(__dirname + '/models').forEach(function(filename){
    if(~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});


app.get('/audios', function(req, res){
    mongoose.model('audios').find(function(err, audios){
        res.send(audios);
    });
});

app.get('/audios/:userId', function(req, res){
    mongoose.model('audios').findById(req.params.userId, function(err, audios){
        res.send(audios);
    });
});

app.get('/audios/:userTitle', function(req,res){
    mongoose.model('audios').find({'name': req.params.userTitle}, function(err, audios){
        res.send(audios);
    });

});



/*
How to add to audio
var Audio = mongoose.model('audios')

var katherine = new Audio({
    name: "katherine",
    url: "https://s3.amazonaws.com/RamaAudio/katherine_001.wav"
});
katherine.save(function(err, katherine){
    if(err) return console.error(err);
    console.dir(katherine);
}); */


// listen on port 3000
app.listen(process.env.PORT || 5000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
/*var port = 3000;
app.listen(port, function() {
    console.log("server is listening on port " + port);
}); */
