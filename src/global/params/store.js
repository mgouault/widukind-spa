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
  'dimensionValue': {
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

  data: {
    'provider': function (data) {
      _state['provider'].data = data;
    },
    'dataset': function (data) {
      _state['dataset'].data = data;
    },
    'frequency': function (data) {
      _state['frequency'].data = data;
    },
    'dimension': function (data) {
      _state['dimension'].data = _.map(
        _.filter(Object.keys(data), (el) => {
          return (el !== 'freq' && el !== 'frequency');
        }),
        (el) => {
          let value = Object.keys(data[el]);
          _state['dimension'].data.push({'name': el, 'value': value});
        }
      );
    },
    'dimensionValue': function (data) {
      _state['dimension'].data = _.map(
        _.filter(Object.keys(data), (el) => {
          return (el !== 'freq' && el !== 'frequency');
        }),
        (el) => {
          let value = Object.keys(data[el]);
          _state['dimension'].data.push({'name': el, 'value': value});
        }
      );
    }
  },

  value: {
    'provider': function (value) {
      _state['provider'].value = value;
      _state['dataset'].data = [];
      _state['dataset'].value = '';
      _state['frequency'].data = []
      _state['frequency'].value = [];
      _state['dimension'].data = {};
      _state['dimension'].value = [];
      actions.fetchDataset(value);
    },
    'dataset': function (value) {
      _state['dataset'].value = value;
      _state['frequency'].data = []
      _state['frequency'].value = [];
      _state['dimension'].data = {};
      _state['dimension'].value = [];
      actions.fetchFrequency(value);
      actions.fetchDimension(value);
    },
    'frequency': function (value) {
      _state['frequency'].value = value;
    },
    'dimension': function (value) { // todo: factorize default value
      _state['dimension'].value = _.map(value, (el) => {
        let dName = el.value;
        let dValue = _.get(_.find(_state['dimension'].data, {'name': dName}), 'value');
        let dSelected =_.get(_.find(_state['dimension'].value, {'name': dName}), 'selected');
        if (!dSelected) {
          dSelected = [_.head(dValue)];
        }
        return {
          'name': dName,
          'value': dValue,
          'selected': dSelected
        };
      });
    },
    'dimensionValue': function (value, dimensionName) {
      _.set(
        _.find(_state['dimension'].value, {'name': dimensionName}),
        'selected',
        _.map(value, (el) => { return el.value; })
      );
    }
  },

  loading: function (key, isLoading) {
    if (!_state[key].active) {
      _state[key].active = true;
    }
    _state[key].loading = isLoading;
  }, // todo: prototype extends p2

  active: function (key, isActive) {
    _state[key].active = isActive;
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
      _set.value['provider'](value.value);
      this.refresh();
    },
    onSelectDataset: function (value) {
      _set.value['dataset'](value.value);
      this.refresh();
    },
    onSelectFrequency: function (data) {
      _set.value['frequency'](data);
      this.refresh();
    },
    onSelectDimension: function (data) {
      _set.value['dimension'](data);
      this.refresh();
    },
    onSelectDimensionValue: function (data, dimensionName) {
      _set.value['dimensionValue'](data, dimensionName);
      this.refresh();
    },
  /**/

  /* onActions Async */
    onFetchProvider: function () {
      _set.loading('provider', true);
      this.refresh();
    },
    onFetchDataset: function () {
      _set.loading('dataset', true);
      this.refresh();
    },
    onFetchFrequency: function () {
      _set.loading('frequency', true);
      this.refresh();
    },
    onFetchDimension: function () {
      _set.loading('dimension', true);
      this.refresh();
    },

    onFetchProviderFailed: console.error,
    onFetchDatasetFailed: console.error,
    onFetchFrequencyFailed: console.error,
    onFetchDimensionFailed: console.error,

    onFetchProviderCompleted: function (data) {
      _set.loading('provider', false);
      _set.data['provider'](data);
      _set.value['provider'](
        _.get(_.head(_state['provider'].data), 'name')
      );
      // this.refresh();
    },
    onFetchDatasetCompleted: function (data) {
      _set.loading('dataset', false);
      _set.data['dataset'](data);
      _set.value['dataset'](
        _.get(_.head(_state['dataset'].data), 'name')
      );
      // this.refresh();
    },
    onFetchFrequencyCompleted: function (data) {
      _set.loading('frequency', false);
      _set.data['frequency'](data);
      _set.value['frequency']([
        _.head(_state['frequency'].data)
      ]);
      this.refresh();
    },
    onFetchDimensionCompleted: function (data) {
      _set.loading('dimension', false);
      _set.data['dimension'](data);
      _set.value['dimension']([
        _.get(_.head(_state['dimension'].data), 'name')
      ]);
      // _set.value['dimension'](
      //   _.map(_state['dimension'].data, (el) => {
      //     return {value: el.name};
      //   })
      // );
      this.refresh();
    }
  /**/

});
// todo: init default value
module.exports = store;
