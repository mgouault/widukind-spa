'use strict'

let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let rp = require('request-promise');
let _ = require('lodash');
let debug = require('debug')('spa');
let config = require('config');

let configURLObj = config.get('api.URLObj');
let URLObj = {
  'protocol': process.env['WIDUKIND_API_PROTOCOL'] || configURLObj['protocol'],
  'host': process.env['WIDUKIND_API_HOST'] || configURLObj['host'],
  'hostname': process.env['WIDUKIND_API_HOSTNAME'] || configURLObj['hostname'],
  'port': process.env['WIDUKIND_API_PORT'] || configURLObj['port'],
  'pathname': process.env['WIDUKIND_API_PATHNAME'] || configURLObj['pathname'],
  'query': {
    'per_page': process.env['WIDUKIND_SPA_LIMIT'] || _.get(configURLObj, 'query.per_page')
  }
};

let app = express();
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
