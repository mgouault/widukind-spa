let Reflux = require('reflux');
let RefluxPromise = require('reflux-promise');
let Q = require('q');
let bluebird = require('bluebird');

Reflux.use(RefluxPromise(window.Promise));
Reflux.use(RefluxPromise(Q.Promise));
Reflux.use(RefluxPromise(bluebird))



let actions = Reflux.createActions({
	'buildURL': {
		shouldEmit: function (URL) {
			return !_.isEmpty(URL['dataset']);
		}
	}
});

module.exports = actions;
