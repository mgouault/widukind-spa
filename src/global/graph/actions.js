var Reflux = require('reflux');
var RefluxPromise = require('reflux-promise');
var Q = require('q');
var bluebird = require('bluebird');

Reflux.use(RefluxPromise(window.Promise));
Reflux.use(RefluxPromise(Q.Promise));
Reflux.use(RefluxPromise(bluebird));

var c = require('./constants');
var apiCall = require('../../helpers/apiCall');

var actions = Reflux.createActions([
]);

actions[c.requestValues] = Reflux.createAction({ asyncResult: true });
actions[c.requestValues].listenAndPromise(function (slug) {
  return apiCall({
    'pathname': '/values',
    'query': {'slug': slug}
  });
});

module.exports = actions;
