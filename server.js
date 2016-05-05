var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var rp = require('request-promise');
var app = express();

var baseURL = 'http://widukind-api-dev.cepremap.org/api/v1/json';
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use('/data/:key', function (req, res, next) {
  var pathname;
  switch (req.params.key) {
    case 'providers':
      pathname = '/providers/keys'; break;
    case 'datasets':
      pathname = '/providers/'+req.query.provider+'/datasets/keys'; break;
    case 'dimensions':
      pathname = '/datasets/'+req.query.dataset+'/dimensions'; break;
    case 'json':
      pathname = '/datasets/'+req.query.dataset+'/values'
        + '?limit=10'
        + req.query.querystring;
      break;
  }
  if (!pathname) {
    var err = new Error();
    err.status = 400;
    return next(err);
  }
  rp(baseURL + pathname)
    .then(function (response) {
      req.responseData = response;
      next();
    })
    .catch(next);
}, function (req, res, next) {
  res.status(200).json(req.responseData);
});

app.use(function (err, req, res, next) {
  res.status(err.status).json(err);
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:'+app.get('port')+'/');
});
