var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var rp = require('request-promise');
var url = require('url');
var config = require('config');
var _ = require('lodash');

var app = express();
app.set('port', (process.env.PORT || config.get('app.port')));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});



app.use('/data/:key', function (req, res, next) {
  var URLObj = config.get('api.URLObj');
  switch (req.params.key) {
    case 'providers':
      URLObj.pathname += '/providers/keys'; break;
    case 'datasets':
      URLObj.pathname += '/providers/'+req.query.provider+'/datasets/keys'; break;
    case 'dimensions':
      URLObj.pathname += '/datasets/'+req.query.dataset+'/dimensions'; break;
    case 'json':
      URLObj.pathname += '/datasets/'+req.query.dataset+'/values';
      _.assign(URLObj.query, req.query.controls);
      break;
    default:
      var err = new Error();
      err.status = 400;
      return next(err);
  }
  rp(url.format(URLObj))
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
