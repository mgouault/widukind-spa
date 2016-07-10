let Reflux = require('reflux');
let RefluxPromise = require('reflux-promise');
let Q = require('q');
let bluebird = require('bluebird');

Reflux.use(RefluxPromise(window.Promise));
Reflux.use(RefluxPromise(Q.Promise));
Reflux.use(RefluxPromise(bluebird));

let getData = require('./getData');



let globalActions = Reflux.createActions({
	'buildURL': {},
	'fetchSeries': { asyncResult: true },
	'updateSelection': {}
});

globalActions.fetchSeries.listenAndPromise((requestObj) => {
  return getData(requestObj);
});

module.exports = globalActions;
