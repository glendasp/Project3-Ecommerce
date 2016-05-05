var express = require('express');
var router = require('express').Router();
var User = require('../models/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/signup', function (req, res){
  res.render('/signup');
});


router.post('/signup', function(req, res, next){
  var user = new User;

  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  //Validates if user already exist if not creates it.
  User.findOne({email: req.body.email}, function(err, existingUser){

    if(existingUser){
      req.flash('errors','This account already exist');
      //console.log(reg.body.email + "already exist");
      return res.redirect('/signup');
    }else{
      user.save(function(err,user){
        if (err) return next (err);
        //todo create user profile page
        return res.redirect('/');
        //res.json ("New user created successfully!! ");
      });
    }
  });
});


module.exports = router;
