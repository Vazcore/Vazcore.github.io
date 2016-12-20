var mongoose = require('mongoose');
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


var UserSchema = new Schema({
    email      : String,
    name       : String,
    password   : String    
});

module.exports = mongoose.model('users', UserSchema);


