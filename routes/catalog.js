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


router.get("/search", function(req, res, next){
//display search form here
    res.send('search form here');
});

router.get("/search", function(req, res, next) {

//display search form here
    var searchTerm = req.body.search;
    req.models.Item.find({name: searchTerm}, function (err, results) {
        //check for errors
        //if none render results page

        if (req.query.q) {
            Product.search({
                query_string: {query: req.query.q}
            }, function (err, results) {
                results:
                    if (err) return next(err);
                var data = results.hits.hits.map(function (hit) {
                    return hit;
                });
                res.render('main/search-result', {
                    query: req.query.q,
                    data: data
                });
                //searchResults template lists items found
                // searchResults should create URLS in the form
                //    /search/123456789  where 123456789 is the _id from the database.
            })
        }
    })
});

router.get("/search/:item_id", function(req, res) {
    Item.findById({ _id : req.params.id}, function(err, item) {
      if (err) return next(err);
      res.render('itemDetail', { item : item });
    })
});


//routes - this is for the home page
app.get('/', function(req, res) {

    // Make query for unique colors, to populate the dropdown box
    db.collection('products').distinct('color', function (err, colorDocs) {
        if (err) {
            return res.sendStatus(500);
        }

        //If selecting a color and clicked the colorButton, this has a value
        if (req.query.colorButton) {
            var color = req.query.colorDropDown;    //What color was selected?
            //Get all of the flowers of the desired color.
            db.collection('products').find({'color': color}).toArray(function (err, flowerDocs) {
                if (err) {
                    return res.sendStatus(500);
                }
                //Optional - turn 'red' into 'Red' for display
                var displayColor = color.slice(0, 1).toUpperCase() + color.slice(1, color.length);
                //return res.render statement inside a callback to prevent further processing of response

                console.log(err);
                //console.log('count?' + count);

                //return res.render('productdetail',
                //    {'flowers': flowerDocs, 'currentColor': displayColor, 'flowerColors': colorDocs});
            });
        }
    });
});


module.exports = router;
