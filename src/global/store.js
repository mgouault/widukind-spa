let _ = require('lodash');
let Reflux = require('reflux');

let actions = require('./actions');



let _state = {
  'series': {
    data: [],
    value: [],
    loading: false
  },
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
  'configObj': {},
  'log': []
};

function getConfig () {
  let axios = require('axios');
	return axios.get('/config').then((received) => {
		return received.data;
	});
}



let globalStore = Reflux.createStore({
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
    actions.fetchSeries(_state['requestObj']['series']);
    this.refresh();
  },
  onFetchSeries: function () {
    _state['series'].loading = true;
    this.refresh();
  },
  onFetchSeriesFailed: console.error,
  onFetchSeriesCompleted: function (data) {
    // if (!_.isEmpty(data)) {
    //   this.state[c.log] = JSON.stringify(data, null, 2)
    //     + '\n -------------------- \n'
    //     + this.state[c.log];
    // }
    _state['series'].loading = false;
    _state['series'].data = data;
    this.refresh();
  },
  onUpdateSelection: function (selection) {
    _state['series'].value = selection;
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

module.exports = globalStore;
