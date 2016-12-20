var express     = require('express'),
    app         = express(),
    port        = process.env.PORT || 8080,
    bodyParser  = require('body-parser'),
    db          = require('./mongo')(),
    newsCtrl    = require('./controllers/news.controller'),
    loginCtrl    = require('./controllers/login.controller'),
    registerCtrl = require('./controllers/register.controller'),
    expressValidator = require('express-validator'),
    session = require('express-session'),
    flash        = require('connect-flash'),
    passport = require('passport'),
    path        = require('path');

// set cors
require('./cors')(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator([]));

app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true 
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/assets', express.static('assets'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view options', {
  layout: true
});

app.get('/', function (req, res) {
  res.render('login');
});

// app.use(function (req, res, next) {
//   res.setHeader("Content-Type", "text/json");
//   return next();
// });

loginCtrl(express, app);
newsCtrl(express, app);
registerCtrl(express, app);

app.listen(port, function () { 
  console.log('Server is running on port: ' + port); 
});
