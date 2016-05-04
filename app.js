var express = require('express'); // Requiring the library
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan'); //
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); //takes the body of my request and parse it to whatever

var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./models/user');
var routes = require('./routes/index');

var db = 'mongodb://localhost:27017/ecommerce';
//mongoose.connect(db);

var app = express(); // app refering to express object

mongoose.connect('mongodb://localhost:27017/ecommerce', function(err){
  if (err){
    console.log(err);
  }else{
    console.log("Connected to the database");
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//Creating Middleware
//Got help for this part from https://github.com/minneapolis-edu/nested_mongoose/blob/master/app.js

app.use(logger('dev'));
app.use(bodyParser.json()); //allows my express application to parse json
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var mainRoutes = require('./routes/index');
var userRoutes = require('./routes/users');


app.use(mainRoutes);
//app.use(userRoutes);

//app.get('/', function (req, resp){
//  res.render('index');
//});

//app.get('/layout', function (req, resp){
//  res.render('layout');
//});

//app.get('/login', function (req, resp){
//  res.render('login');
//});


//Callback function to check if there is an error or if it successefully running
app.listen(3000, function(err){
  if (err) throw err;
  console.log("Server is Running on port 3000")

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/models/user', User);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
