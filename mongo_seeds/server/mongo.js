var mongoose = require('mongoose');

module.exports = function () {
  mongoose.connect('mongodb://alex:1234@ds133418.mlab.com:33418/camp1');
  return mongoose;
}