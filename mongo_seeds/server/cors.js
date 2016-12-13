module.exports = function (app) {

  app.use(function (req, res, next) {
    if (req.method === 'OPTIONS') {
      var headers = {};
      headers['Access-Control-Allow-Origin'] = "*";
      headers['Access-Control-Allow-Headers'] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      headers['Access-Control-Allow-Methods'] = "GET, POST, PUT, DELETE, OPTIONS";
      
      res.writeHead(200, headers);
      res.end();
    } else {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
      res.header('Access-Control-Allow-Methods', 'GET, POST PUT, DELETE, OPTIONS');
      next();
    }
  });

  return app;

};