var User = require('../models/users'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function (express, app) {
  var route = express.Router();

  route.get('/', function (req, res) {
    res.render('login', {});
  });

  passport.use(new LocalStrategy(
    function(email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.password !== password) {          
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  route.post('/',
   passport.authenticate('local', 
    { successRedirect: '/news', failureRedirect: '/login', failureFlash: true  }
   ),
   function (req, res) {
    res.redirect('/news');
  });

  route.get('/logout', function(req, res){
    req.logout();    
    res.redirect('/login');
  });

  app.use('/login', route);

  return route;
};