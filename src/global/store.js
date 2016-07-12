let _ = require('lodash');
let Reflux = require('reflux');

let actions = require('./actions');



let _state = {
  'series': {
    data: [],
    value: [],
    loading: false
  },
  'selection': {
    data: [],
    loading: false
  },
  'requestObj': {
    pathname: '',
    query: {}
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

  /* onActions Sync */
    onBuildURL: function (URL) {
      _state['requestObj'].dataset = URL['dataset'];
      _state['requestObj'].controls = URL['controls'];
      actions.fetchSeries(_state['requestObj']);
      this.refresh();
    },
    onUpdateSelection: function (selection) {
      _state['series'].value = selection;
      if (_.isEmpty(selection)) {
        _state['selection'].data = [];
      } else {
        let storedSelection = _.map(_state['selection'].data, (el) => {
          return el['slug']
        });
        let wantedSelection = _.difference(selection, storedSelection);
        actions.fetchSelection(wantedSelection);
      }
      this.refresh();
    },
  /**/

  /* onActions Async */
    onFetchSeries: function () {
      _state['series'].loading = true;
      this.refresh();
    },
    onFetchSelection: function () {
      _state['selection'].loading = true;
      this.refresh();
    },

    onFetchSeriesFailed: console.error,
    onFetchSelectionFailed: console.error,

    onFetchSeriesCompleted: function (data) {
      if (!_.isEmpty(data)) {
        _state['log'] = JSON.stringify(data, null, 2)
          + '\n -------------------- \n'
          + _state['log'];
      }
      _state['series'].loading = false;
      _state['series'].data = data;
      this.refresh();
    },
    onFetchSelectionCompleted: function (data) {
      if (!(data instanceof Array)) {
        data = [data];
      }
      if (!_.isEmpty(data)) {
        _state['log'] = JSON.stringify(data, null, 2)
          + '\n -------------------- \n'
          + _state['log'];
      }
      _state['selection'].loading = false;

      let tmp = _state['selection'].data;
      _.remove(tmp, (el) => {
        return !_.find(_state['series'].value, (el_) => {
          return el_ === el['slug']
        });
      });
      _state['selection'].data = _.concat(
        _.compact(tmp),
        _.compact(data)
      );
      this.refresh();
    },
  /**/

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
