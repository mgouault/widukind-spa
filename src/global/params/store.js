let _ = require('lodash');
let Reflux = require('reflux');

let actions = require('./actions');



let pattern = {
  'provider': {
    data: [],
    value: '',
    setter: actions.selectProvider,
    loading: false,
    active: false,
  },
  'dataset': {
    data: [],
    value: '',
    setter: actions.selectDataset,
    loading: false,
    active: false
  },
  'frequency': {
    data: [],
    value: [],
    setter: actions.selectFrequency,
    loading: false,
    active: false
  },
  'dimension': {
    data: [],
    value: [],
    setter: actions.selectDimension,
    loading: false,
    active: false
  },
  'dimensionvalue': {
    data: [],
    value: []
  }
};

let initValue = {
  'provider': 'insee',
  'dataset': 'insee-ipch-2015-fr-coicop'
}



let _state = _.cloneDeep(pattern);
// todo: prototype extends p1
let _set = {
  'provider': {
    data: function (data) {
      _state['provider'].data = data;
    },
    value: function (value) {
      _state['provider'].value = value;
      _state['dataset'].data = [];
      _state['dataset'].value = '';
      _state['frequency'].data = []
      _state['frequency'].value = [];
      _state['dimension'].data = {};
      _state['dimension'].value = [];
      actions.fetchDataset(value);
    },
    loading: function (isLoading) {
      if (!_state['provider'].active) {
        _state['provider'].active = true;
      }
      _state['provider'].loading = isLoading;
    },
    active: function (isActive) {
      _state['provider'].active = isActive;
    }
  },

  'dataset': {
    data: function (data) {
      _state['dataset'].data = data;
    },
    value: function (value) {
      _state['dataset'].value = value;
      _state['frequency'].data = [];
      _state['frequency'].value = [];
      _state['dimension'].data = {};
      _state['dimension'].value = [];
      actions.fetchFrequency(value);
      actions.fetchDimension(value);
    },
    loading: function (isLoading) {
      if (!_state['dataset'].active) {
        _state['dataset'].active = true;
      }
      _state['dataset'].loading = isLoading;
    },
    active: function (isActive) {
      _state['dataset'].active = isActive;
    }
  },

  'frequency': {
    data: function (data) {
      _state['frequency'].data = data;
    },
    value: function (value) {
      _state['frequency'].value = value;
    },
    loading: function (isLoading) {
      if (!_state['frequency'].active) {
        _state['frequency'].active = true;
      }
      _state['frequency'].loading = isLoading;
    },
    active: function (isActive) {
      _state['frequency'].active = isActive;
    }
  },

  'dimension': {
    data: function (data) {
      _state['dimension'].data = _.filter(Object.keys(data), (key) => {
        (key !== 'freq' && key !== 'frequency')
      });
    },
    value: function (value) {
      _state['dimension'].value = value;
      _state['dimensionvalue'].value = _.map(value, (el) => {
        let data = _.get(
          _.find(_state['dimensionvalue'].data, {'name':el}),
          'data'
        );
        return {
          'name': el,
          'data': data,
          'value': _.head(data) // todo: reminder, default is set here
        };
      });
    },
    loading: function (isLoading) {
      if (!_state['dimension'].active) {
        _state['dimension'].active = true;
      }
      _state['dimension'].loading = isLoading;
    },
    active: function (isActive) {
      _state['dimension'].active = isActive;
    }
  },

  'dimensionvalue': {
    data: function (data) {
      _state['dimensionvalue'].data = _.map(_state['dimensions'].data, (key) => {
        'name': key,
        'data': Object.keys(data[key]) // todo: reminder, keys are picked instead of value
      });
    },
    value: function (value, dimensionName) {
      _.set(
        _.find(_state['dimensionvalue'].value, {'name': dimensionName}),
        'value',
        value
      );
    },
    loading: function (isLoading) {
      if (!_state['dimensionvalue'].active) {
        _state['dimensionvalue'].active = true;
      }
      _state['dimensionvalue'].loading = isLoading;
    },
    active: function (isActive) {
      _state['dimensionvalue'].active = isActive;
    }
  }
});



let store = Reflux.createStore({

  listenables: [actions],
  getInitialState: function () {
    return _state;
  },
  init: function () {
    actions.fetchProvider();
  },
  refresh: function () {
    this.trigger(_state);
  },

  /* onActions Sync */
    onSelectProvider: function (value) {
      _set['provider'].value(value.value);
      this.refresh();
    },
    onSelectDataset: function (value) {
      _set['dataset'].value(value.value);
      this.refresh();
    },
    onSelectFrequency: function (value) {
      _set['frequency'].value(
        _.map(value, (el) => el.value)
      );
      this.refresh();
    },
    onSelectDimension: function (value) {
      _set['dimension'].value(
        _.map(value, (el) => el.value)
      );
      this.refresh();
    },
    onSelectDimensionvalue: function (value, dimensionName) {
      _set['dimensionvalue'].value(
        _.map(value, (el) => el.value),
        dimensionName
      );
      this.refresh();
    },
  /**/

  /* onActions Async */
    onFetchProvider: function () {
      _set['provider'].loading(true);
      this.refresh();
    },
    onFetchDataset: function () {
      _set['dataset'].loading(true);
      this.refresh();
    },
    onFetchFrequency: function () {
      _set['frequency'].loading(true);
      this.refresh();
    },
    onFetchDimension: function () {
      _set['dimension'].loading(true);
      this.refresh();
    },

    onFetchProviderFailed: console.error,
    onFetchDatasetFailed: console.error,
    onFetchFrequencyFailed: console.error,
    onFetchDimensionFailed: console.error,

    onFetchProviderCompleted: function (data) {
      _set['provider'].loading(false);
      _set['provider'].data(data);
      _set['provider'].value(
        _.head(_state['provider'].data)
      );
      // this.refresh();
    },
    onFetchDatasetCompleted: function (data) {
      _set['dataset'].loading(false);
      _set['dataset'].data(data);
      _set['dataset'].value(
        _.head(_state['dataset'].data)
      );
      // this.refresh();
    },
    onFetchFrequencyCompleted: function (data) {
      _set['frequency'].loading(false);
      _set['frequency'].data(data);
      _set['frequency'].value(
        [_.head(_state['frequency'].data)]
      );
      this.refresh();
    },
    onFetchDimensionCompleted: function (data) {
      _set['dimension'].loading(false);
      _set['dimension'].data(data);
      _set['dimensionvalue'].data(data);
      _set['dimension'].value(
        [_.head(_state['dimension'].data)]
      );
      this.refresh();
    }
  /**/

});
// todo: init default value
module.exports = store;
