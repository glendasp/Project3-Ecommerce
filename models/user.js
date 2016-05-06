/**
 * Created by glendex on 5/3/16.
 *
 * Got help from:
 * http://blog.mongodb.org/post/34225138670/password-authentication-with-mongoose-part-2
 */
//Directory /models will store all the database schema

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var Item = require('./item');
/* The user schema:
   Attributes,
   Characteristics,
   Fields
 */

var UserSchema = new Schema({

    local: {
        username:{
            type: String,
            unique: true,
            required: true
        },
        password: String
    },


    //name : String,
    email: { type:String, unique: true, lowercase: true},
    //password: String,

    address: String,

    history:[{
     date: Date,
     paid:{type: Number, default:0}
   }],

    signUpdate: {type: Date,
        default: Date.now()},

   cart : {
     items : [ Item ]
   }

});



/* Hash the password before I save it to the database
* per = is one of mongoose method that allow us to pre save before we actually
* save it to the database
* */

UserSchema.pre('save', function(next){
    var user = this; //this refer to userSchema
    console.log('hash');

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next(); // if pwd is not modified next

    // generate a salt which is a random data that will be created by genSalt
    bcrypt.genSalt(10, function(err, salt) {  //more info about SALT_WORK_FACTOR: http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
        if (err) return next(err);

        // hash the password along with my new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err); // if there is an erro I want to return the callback with the error
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

/* Compare password in the database and the one that the use typed*/


UserSchema.methods.validPassword = function(password){
    //Hash entered password, compare with store hash
    return bcrypt.compareSync(password, this.local.password);
};
module.exports = mongoose.model('User', UserSchema);
