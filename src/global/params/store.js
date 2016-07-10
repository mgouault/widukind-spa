let _ = require('lodash');
let Reflux = require('reflux');

let actions = require('./actions');
let globalActions = require('../actions');



/* Constructor */
  let setConstructor = function (key) {
    return {
      data: function (data) {
        _state[key].data = data;
        _set[key].defaultValue();
      },
      value: function (value) {
        _state[key].value = value;
        actions.buildQuery(_state);
      },
      defaultValue: function () {
        if (_state[key].init) {
          return _set[key].init();
        }
        _set[key].value([_.head(_state[key].data)]);
      },
      init: function () {
        _set[key].value([_state[key].init]);
        _state[key].init = null;
      },
      loading: function (isLoading) {
        _state[key].loading = isLoading;
      }
    };
  };

  let stateConstructor = function (key) {
    return {
      data: [],
      value: [],
      loading: false
    };
  };
/**/



/* Private */
  let _state = {
    'provider': stateConstructor('provider'),
    'dataset': stateConstructor('dataset'),
    'frequency': stateConstructor('frequency'),
    'dimension': stateConstructor('dimension')
  };

   _.assign(_state['provider'], {
    value: '',
    setter: actions.selectProvider,
    init: 'insee'
  });

   _.assign(_state['dataset'], {
    value: '',
    setter: actions.selectDataset,
    init: 'insee-ipch-2015-fr-coicop'
  });

   _.assign(_state['frequency'], {
    setter: actions.selectFrequency,
  });

   _.assign(_state['dimension'], {
    setter: actions.selectDimension
  });



  let _set = {
    'provider': setConstructor('provider'),
    'dataset': setConstructor('dataset'),
    'frequency': setConstructor('frequency'),
    'dimension': setConstructor('dimension'),
  };

  _.assign(_set['provider'], {
    value: function (value) {
      if (value instanceof Array) {
        value = _.head(value);
      }
      _state['provider'].value = value;
      _state['dataset'].data = [];
      _set['dataset'].value('');
      actions.fetchDataset(value);
    }
  });

  _.assign(_set['dataset'], {
    value: function (value) {
      if (value instanceof Array) {
        value = _.head(value);
      }
      _state['dataset'].value = value;
      _state['frequency'].data = [];
      _state['frequency'].value = [];
      _state['dimension'].data = [];
      _state['dimension'].value = [];
      actions.buildQuery(_state);
      actions.fetchFrequency(value);
      actions.fetchDimension(value);
    }
  });

  _.assign(_set['dimension'], {
    data: function (data) {
      let filteredKeys = _.filter(Object.keys(data),
        (key) => (key !== 'freq' && key !== 'frequency')
      );
      _state['dimension'].data = _.map(filteredKeys, (key) => {
        return {
          'name': key,
          'data': Object.keys(data[key]), // reminder: keys are picked instead of value
          'value': key,
          'label': key
        }
      });
      _set['dimension'].defaultValue();
    },
    value: function (value) {
      let addedValue = _.filter(value, (el) => {
        return (!_.find(_state['dimension'].value, {'name':el.name}));
      });
      _.remove(_state['dimension'].value, (el) => {
        return (!_.find(value, {'name': el.name}));
      });
      _.reduce(addedValue, (acc, el) => {
        let tmp = _.cloneDeep(_.find(_state['dimension'].data, {'name':el.name}));
        tmp.value = [_.head(tmp.data)] // reminder: default is set here
        acc.push(tmp);
        return acc;
      }, _state['dimension'].value);
      actions.buildQuery(_state);
    }
  });

  _.assign(_set, {
    'dimensionvalue': function (value, dimensionName) {
      _.set(
        _.find(_state['dimension'].value, {'name': dimensionName}),
        'value',
        value
      );
      actions.buildQuery(_state);
    }
  });
/**/



let paramsStore = Reflux.createStore({
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

  /* onAction Sync */
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
      _set['dimension'].value(value);
      this.refresh();
    },
    onSelectDimensionvalue: function (value, dimensionName) {
      _set['dimensionvalue'](
        _.map(value, (el) => el.value), dimensionName
      );
      this.refresh();
    },
  /**/

  /* onAction Async */
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
    },
    onFetchDatasetCompleted: function (data) {
      _set['dataset'].loading(false);
      _set['dataset'].data(data);
    },
    onFetchFrequencyCompleted: function (data) {
      _set['frequency'].loading(false);
      _set['frequency'].data(data);
      this.refresh();
    },
    onFetchDimensionCompleted: function (data) {
      _set['dimension'].loading(false);
      _set['dimension'].data(data);
      this.refresh();
    },
  /**/

  onBuildQuery: function (state) {
    let query = {};
    if (!_.isEmpty(state['frequency'].value)) {
      query['frequency'] = _.join(state['frequency'].value, '+');
    }
    query = _.reduce(state['dimension'].value, (acc, el) => {
      if (!_.isEmpty(el.value)) {
        acc[el.name] = _.join(el.value, '+');
      }
      return acc;
    }, query);
    globalActions.buildURL({
      'dataset': state['dataset'].value,
      'query': query
    });
  }
});

module.exports = paramsStore;
