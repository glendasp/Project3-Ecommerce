//Directory /models will store all the database schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
        category: String,
        name : String,
        color: String,
        price : Number,
        cart : Boolean
        //qtd: Number
});


module.exports = mongoose.model('Product', ProductSchema);
