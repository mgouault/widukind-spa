let _ = require('lodash');
let Reflux = require('reflux');

let actions = require('./actions');



let _state = {
  'requestObj': {
    'series': {
      pathname: '',
      query: {}
    },
    'values': {
      pathname: '',
      query: {}
    }
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
    let query = URL['query'];
    _state['requestObj']['series'].pathname = '/datasets/' + dataset + '/series';
    _state['requestObj']['series'].query = query;
    _state['requestObj']['values'].pathname = '/datasets/' + dataset + '/values';
    _state['requestObj']['values'].query = query;
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
