/**
 * Created by glendex on 5/3/16.
 *
 * Got help from:
 * http://blog.mongodb.org/post/34225138670/password-authentication-with-mongoose-part-2
 */
//Directory /models will store all the database schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/* The user schema:
 Attributes,
 Characteristics,
 Fields
 */

var ItemSchema = new Schema({
        name : String,
        price : Number,
        qtd: Number,
        category: String
});

module.exports = mongoose.model('Item', ItemSchema);
