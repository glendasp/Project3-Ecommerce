var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  //Use the home page for your application:
  // shows a choice of local login or Twitter login
  res.render('index',{ title: 'Express' });
});


/* GET signup page */
router.get('/signup', function(req, res, next){
  res.render('signup', { message : req.flash('signupMessage') } )
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/secret',
  failureRedirect: '/signup',
  failureFlash :true
}));


//
///* GET login page */
//router.get('/login', function(req, res, next){
//  res.render('login', { updateMessage : req.flash('loginMessage')})
//});
//
//
///* POST login - this is called when clicking login button
// Very similar to signup, except using local-login.  */
//router.post('/login', passport.authenticate('local-login', {
//  failureRedirect: '/login',
//  failureFlash: true
//}));


/* GET Logout */
router.get('/logout', function(req, res, next) {
  req.logout();         //passport middleware adds these functions to req.
  res.redirect('/');
});




router.get('/auth/gmail', passport.authenticate('gmail'));

router.get('/auth/gmail/callback', passport.authenticate('gmail', {
//  successRedirect : '/secret',
  failureRedirect : '/'
}));



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}


module.exports = router;

