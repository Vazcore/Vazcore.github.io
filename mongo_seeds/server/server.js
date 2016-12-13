var express = require('express'),
    app     = express(),
    port    = process.env.PORT || 8080,
    db      = require('./mongo')(),
    News    = require('./models/news');

// set cors
require('./cors')(app);

app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  return next();
});

app.get('/', function (req, res) {
  res.json({ success: true });
});

app.get('/news', function (req, res) {
   News
    .find({})
    .limit(10)
    .exec(function (err, news) {
      if (err) {
        res.json({ success: false }); 
      }
      return res.json({ success: true, articles: news }); 
    });  
});

app.listen(port, function () { 
  console.log('Server is running on port: ' + port); 
});
