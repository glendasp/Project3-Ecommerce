var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');


/* GET home page. */
router.get('/', function(req, res, next) {
  //Use the home page for your application:
  // shows a choice of local login or Twitter login
  res.render('index');

});

//require('./config/passport')(passport);

/* GET signup page */
router.get('/signup', function(req, res, next){
  console.log('signup form request');
  res.render('signup', { message : req.flash('signupMessage') } )
});


router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/secret',
  failureRedirect: '/kaboom',
  failureFlash : true
}));


/* GET Secret */
router.get('/secret', function(req, res){
  console.log('secret page - todo');
  res.send('secret page here, succesful sign up.');
});


/* GET Logout */
router.get('/logout', function(req, res, next) {
  req.logout();         //passport middleware adds these functions to req.
  res.redirect('/');
});


function isLoggedIn(req, res, next) {
  console.log(req);
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;
