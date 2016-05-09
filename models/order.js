// TODO an order schema


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.ObjectId;

var Product = require('./Product');

var OrderSchema = new Schema({

  user : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },

  product_ordered : [ Item ]

});

module.exports = mongoose.model('Order', OrderSchema);
