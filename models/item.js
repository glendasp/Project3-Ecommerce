//Directory /models will store all the database schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
        category: { type: Schema.Types.ObjectId, ref: 'Category'},
        name : String,
        price : Number,
        qtd: Number
});

module.exports = mongoose.model('Item', ItemSchema);
