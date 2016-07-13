'use strict'

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var rp = require('request-promise');
var _ = require('lodash');
var debug = require('debug')('spa');
var config = require('config');

var configURLObj = config.get('api.URLObj');
var URLObj = {
  'protocol': process.env['WIDUKIND_API_PROTOCOL'] || configURLObj['protocol'],
  'host': process.env['WIDUKIND_API_HOST'] || configURLObj['host'],
  'hostname': process.env['WIDUKIND_API_HOSTNAME'] || configURLObj['hostname'],
  'port': process.env['WIDUKIND_API_PORT'] || configURLObj['port'],
  'pathname': process.env['WIDUKIND_API_PATHNAME'] || configURLObj['pathname'],
  'query': {
    'per_page': process.env['WIDUKIND_SPA_LIMIT'] || _.get(configURLObj, 'query.per_page')
  }
};

var app = express();
app.set('port', (process.env['WIDUKIND_SPA_PORT'] || config.get('app.port')));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/config', function (req, res, next) {
  let obj = _.cloneDeep(URLObj);
  res.status(200).json(obj);
});

app.use(function (err, req, res, next) {
  res.status(err.status).json(err);
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:'+app.get('port')+'/');
});
