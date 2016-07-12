let Reflux = require('reflux');
let RefluxPromise = require('reflux-promise');
let Q = require('q');
let bluebird = require('bluebird');

Reflux.use(RefluxPromise(window.Promise));
Reflux.use(RefluxPromise(Q.Promise));
Reflux.use(RefluxPromise(bluebird));

let getData = () => {return Promise.resolve()};



let globalActions = Reflux.createActions({
	'buildURL': {
		shouldEmit: function (URL) {
			return !_.isEmpty(URL['dataset']);
		}
	},
	'fetchSeries': { asyncResult: true },
	'updateSelection': {}
});

globalActions.fetchSeries.listenAndPromise((requestObj) => {
  return getData(requestObj);
});

globalActions.connectAPIService = function () {
	getData = require('./getData');
}

module.exports = globalActions;
