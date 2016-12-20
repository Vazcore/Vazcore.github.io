var User = require('../models/users');

module.exports = function (express, app) {
  var route = express.Router();

  route.get('/', function (req, res) {
    res.render('register', {});
  });

  route.post('/', function (req, res) {
    req.checkBody('password', 'Password is required').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      //res.json(errors);
      res.render('login', {errors: errors});
    } else {
      (new User(req.body)).save(function (err, doc) {
        if (err) return res.render('login', {errors: [{msg: 'Cant register'}]});         
      });
      res.render('login', {});
    }    
  });

  app.use('/register', route);

  return route;
};