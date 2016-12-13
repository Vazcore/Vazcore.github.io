var mongoose = require('mongoose');
    Schema = mongoose.Schema,
    Category = require('./category'),
    ObjectId = Schema.ObjectId;


var NewsSchema = new Schema({
    author      : String,
    description : String,
    url         : String,
    urlToImage  : String,
    publishedAt : Date,
    category_id : { type: ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('news', NewsSchema);


