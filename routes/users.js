var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportConfig = require('../config/passport');
var User = require('../models/user');


//Map between item databse and elastic search - creates a brigde between datase and items
Product.createMapping(function(err, mapping) {
  if (err) {
    console.log("error creating mapping");
    console.log(err);
  } else {
    console.log("Mapping created");
    console.log(mapping);
  }
});

//sync the data with items
var stream = Product.synchronize();
var count = 0;

stream.on('data', function() {
  count++;
});

stream.on('close', function() {
  console.log("Indexed " + count + " documents");
});

stream.on('error', function(err) {
  console.log(err);
});



/* GET home page. */
//Use the home page for your application:
// shows a choice of local login or Twitter login
router.get('/', function(req, res, next) {
  res.render('index');

});

/* GET signup page */
router.get('/signup', function(req, res, next){
  console.log('signup form request');
  res.render('signup', { message : req.flash('signupMessage') } )
});


router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/secret',
  failureRedirect: '/fail',
  failureFlash : true
}));


/* GET login page */
router.get('/login', function(req, res, next){
  console.log('login form request');
  res.render('login', { message : req.flash('loginMessage') } )
});


router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/fail',
  failureFlash : true
}));


/* GET Secret */
router.get('/secret', isLoggedIn, function(req, res){
  console.log('secret page - todo');
  res.send('secret page here, succesful sign up.');
});

/* GET fail */
router.get('/fail', function(req, res){
  console.log('signup failed - todo');
  res.send('fail sign up.');
});


/* GET Logout */
router.get('/logout', function(req, res, next) {
  req.logout();         //passport middleware adds these functions to req.
  res.redirect('/');
});


function isLoggedIn(req, res, next) {
  console.log(req);
  if (req.isAuthenticated()) {
    console.log('User is authenticated')
    console.log(req.user);
    return next();
  }
  console.log('user not authenticated');
  res.redirect('/');
}

module.exports = router;
