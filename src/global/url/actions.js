var Reflux = require('reflux');
var RefluxPromise = require('reflux-promise');
var Q = require('q');
var bluebird = require('bluebird');

Reflux.use(RefluxPromise(window.Promise));
Reflux.use(RefluxPromise(Q.Promise));
Reflux.use(RefluxPromise(bluebird))

var apiCall = require('../../helpers/apiCall');

var actions = Reflux.createActions({
  'updateConfig': {}
});

module.exports = actions;
