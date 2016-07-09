let _ = require('lodash');
let Reflux = require('reflux');

let actions = require('./actions');



let _state = {
  'requestPathname': {
    'series': '',
    'values': ''
  },
  'configObj': {}
};

function getConfig () {
  let axios = require('axios');
	return axios.get('/config').then((received) => {
		return received.data;
	});
}



let store = Reflux.createStore({
  listenables: [actions],
  getInitialState: function () {
    return _state;
  },
  refresh: function () {
    this.trigger(_state);
  },

  onBuildURL: function (URL) {
    let dataset = URL['dataset'];
    let querystring = URL['querystring'];
    let QSString = '';
    if (!_.isEmpty(querystring)) {
      let tmp = _.map(Object.keys(querystring), (key) => {
        let val = querystring[key];
        return key+'='+val;
      });
      QSString = '?' + _.join(tmp, '&');
    }
    _state['requestPathname']['series'] = '/datasets/' + dataset + '/series' + QSString;
    _state['requestPathname']['values'] = '/datasets/' + dataset + '/values' + QSString;
    this.refresh();
  },

  getConfigObj: function () {
    if (!_.isEmpty(_state['configObj'])) {
      return Promise.resolve(_state['configObj']);
    }
    return getConfig().then((configObj) => {
      _state['configObj'] = configObj;
      return _state['configObj'];
    });
  }
});

module.exports = store;
