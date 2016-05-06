// TODO your product search pages here


// One route for the search page. this page will have a form on it - user can search for "hat"
// Perhaps this can be your home page?


// One route for list of search results  - show all of the hats in the list of items for sale


// another route for product detail page. Use parameters to display one particular product - details for one hat.
// like in the flowers app.
// this page will have an 'Add to Cart button'


var express = require('express');
var router = express.Router();
var passport = require('passport');


router.get("/search", function(req, res){

//display search form here
    res.send('search form here');
})

router.get("/search", function(req, res){

//display search form here
    var searchTerm = req.body.search;
    req.models.Item.find({ name : searchTerm}, function(err, results){
      //check for errors
      //if none render results page
      res.render('searchResults', {results : yourresults}); //todo

      //searchResults template lists items found
      // searchResults should create URLS in the form
      //    /search/123456789  where 123456789 is the _id from the database.
    })
})


router.get("/search/:item_id", function(req, res) {

//TODO check syntax here!!!!
    req.models.Item.findById({ _id : req.item_id }, function(err, item) {
      //check for errors
      //if none render results page
      res.render('itemDetail', { item : item }); //todo

    })

})


module.exports = router;
