var Gebruiker = require('./gebruiker.js');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var jade = require('jade');
var Schema = mongoose.Schema;
var app = express();
var port = process.env.PORT || 8080;


//CONFIG
// use body parser so we can grab information from POST requests
app.use(express.static(__dirname + '/public'));
process.env.NODE_ENV = 'production';
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.render('index', {
    title: 'Hey',
    message: 'Hello there!'
  });
});
// configure our app to handle CORS requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

// log all requests to the console
app.use(morgan('dev'));

//mongo link you can use this one (for the time of the TOCBA project)
mongoose.connect('mongodb://178.62.186.242/ing');

//BSN STUFI CHECK
app.get('/duo/:bsn', function(req, res) {
  Gebruiker.find({
    bsn: req.params.bsn
  }, function(err, gebruiker) {
    if (err) throw err;
    //check if users is found
    if (!gebruiker.length) {
      res.json({
        message: 'geen gebruiker'
      });
    } else {
      res.send(gebruiker);
    }
  });
});

//BKR CHECK based on name for some reason
app.get('/bkr/:name', function(req, res) {
  Gebruiker.find({
    name: req.params.name
  }, function(err, gebruiker) {
    if (err) throw err;
    res.send(gebruiker);
  });
});

//post new users to the db
app.post('/gebruikers', function(req, res) {
  var gebruiker = new Gebruiker();
  gebruiker.name = req.body.name;
  gebruiker.bsn = req.body.bsn;


  //write params to Booleans
  if (req.body.duo == 'true') {
    gebruiker.duo = true;
  } else if (req.body.duo == 'false') {
    gebruiker.duo = false;
  }

  if (req.body.bkr == 'true') {
    gebruiker.bkr = true;
  } else if (req.body.bkr == 'false') {
    gebruiker.bkr = false;
  }

  gebruiker.save(function(err) {
    if (err) {
      // duplicate entry for the BSN
      if (err.code == 11000)
        return res.json({
          success: false,
          message: 'gebruiker bestaat al'
        });
      else
        return res.send(err);
    }
    res.json({
      message: 'Gebruiker aangemaakt'
    });
  });
});

//GET ALL USERS
app.get('/gebruikers', function(req, res) {
  Gebruiker.find(function(err, gebruikers) {
    if (err) return res.send(err);

    // return the users
    res.json(gebruikers);
  });
})

// starting the server
var server = app.listen(port, function() {
  console.log('server is running..');
});
