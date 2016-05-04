var express = require('express');
var router = express.Router();
var User = require('../models/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/signup', function (req, res, next){
  res.render('/signup');
});


router.post('/signup', function(req, res, next){
  var user = new User;

  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  //mongoose
  User.findOne({email: req.body.email}, function(err, existingUser){

    if(existingUser){
      console.log(reg.body.email + "already exist");
      return res.redirect('/signup');
    }else{
      user.save(function(err,user){
        if (err) return next (err);

        res.json ("New user created successfully!! ");

      });
    }
  });
});

//
//// *** Not saving to the db
//app.post('/Adduser', function(req,res, next){
//  var user = new User();
//  user.profile.name = req.body.name;
//  user.password = req.body.password;
//  user.email = req.body.email;
//
//  user.save(function(err){
//    if (err) return next(err);
//    res.json('New user was created successfully');
//  });
//});



module.exports = router;
