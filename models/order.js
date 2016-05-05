// TODO an order schema


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.ObjectId;

var Item = require('./item');

var OrderSchema = new Schema({

  user : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },

  items_ordered : [ Item ]

});

module.exports = mongoose.model('Order', OrderSchema);
