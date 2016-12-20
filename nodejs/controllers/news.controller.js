var News = require('../models/news');
var passport = require('passport');
var fs = require('fs');
var bodyParser  = require('body-parser');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


module.exports = function (express, app) {
  var route = express.Router();

  route.use(function (req, res, next) {    
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.redirect('/login');
    }
    next();
  });
  

  route.get('/', function (req, res) {
    News.find({})
    .populate({ path: 'categories', select: 'title parent' })
    .exec(function (err, news) {
      if (err) return res.render('news', {errors: err});
      return res.render('news', {news: news});
    });
  });

  route.get('/add', function (req, res) {
    return res.render('newsForm');
  });

  route.post('/', multipartMiddleware, function (req, res) {
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('description', 'Description is required').notEmpty();
    req.checkBody('author', 'Author is required').notEmpty();    
    var errors = req.validationErrors();    
    if (req.files.logo.type !== 'image/png' && req.files.logo.type !== 'image/jpg' && req.files.logo.type !== 'image/jpeg') {
      return res.render('newsForm', {errors: [{msg: 'Unsuported images'}]});
    }
    if (errors) {      
      return res.render('newsForm', {errors: errors});
    } else {
      fs.readFile(req.files.logo.path, function (err, data) {
        var fname = "image"+getRandomInt(100,1000000)+".jpg";
        var newPath =  __dirname + "/../assets/images/" + fname;
        fs.writeFile(newPath, data, function (err) {
          if (err) {            
            if (err) return res.render('newsForm', {errors: [{msg: err.message}]});
          }
          var url = 'http://' + req.headers.host + '/assets/images/' + fname;
          var n = new News(req.body);
          n.urlToImage = url;
          n.save(function (err, doc) {
            if (err) return res.render('newsForm', {errors: [{msg: 'Cant register'}]});
            else return res.redirect('news');         
          });
        });
      });     
      
    }
  });

  app.use('/news', route);

  return route;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}