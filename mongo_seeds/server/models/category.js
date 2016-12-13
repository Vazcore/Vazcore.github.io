var mongoose = require('mongoose');
    Schema = mongoose.Schema,    
    ObjectId = Schema.ObjectId;

var CategorySchema = new Schema({
  title: String,
  parent: String
});

module.exports = mongoose.model('categories', CategorySchema); 