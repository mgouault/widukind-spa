var Reflux = require('reflux');
var RefluxPromise = require('reflux-promise');
var Q = require('q');
var bluebird = require('bluebird');

Reflux.use(RefluxPromise(window.Promise));
Reflux.use(RefluxPromise(Q.Promise));
Reflux.use(RefluxPromise(bluebird))



var logActions = Reflux.createActions({
  'displayLog': {},
});

module.exports = logActions;
