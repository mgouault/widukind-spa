let Reflux = require('reflux');
let _ = require('lodash');

let actions = require('./actions');



/* Constructor */
  let setConstructor = function (key) {
    return {
      data: function (data) {
        _state[key].data = data;
      },
      value: function (value) {
        _state[key].value = value;
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
    'dimension': stateConstructor('dimension'),
    'dimensionvalue': stateConstructor('dimensionvalue')
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
    'dimensionvalue': setConstructor('dimensionvalue')
  };

  _.assign(_set['provider'], {
    value: function (value) {
      if (value instanceof Array) {
        value = _.head(value);
      }
      _state['provider'].value = value;
      _state['dataset'].data = [];
      _state['dataset'].value = '';
      _state['frequency'].data = []
      _state['frequency'].value = [];
      _state['dimension'].data = [];
      _state['dimension'].value = [];
      _state['dimensionvalue'].data = [];
      _state['dimensionvalue'].value = [];
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
      _state['dimensionvalue'].data = [];
      _state['dimensionvalue'].value = [];
      actions.fetchFrequency(value);
      actions.fetchDimension(value);
    }
  });

  _.assign(_set['dimension'], {
    data: function (data) {
      _state['dimension'].data = _.filter(Object.keys(data),
        (key) => (key !== 'freq' && key !== 'frequency')
      );
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
          'value': _.head(data) // reminder: default is set here
        };
      });
    }
  });

  _.assign(_set['dimensionvalue'], {
    data: function (data) {
      _state['dimensionvalue'].data = _.map(_state['dimension'].data, (key) => {
        return {
          'name': key,
          'data': Object.keys(data[key]) // reminder: keys are picked instead of value
        }
      });
    },
    value: function (value, dimensionName) {
      _.set(
        _.find(_state['dimensionvalue'].value, {'name': dimensionName}),
        'value',
        value
      );
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
      _set['provider'].defaultValue();
    },
    onFetchDatasetCompleted: function (data) {
      _set['dataset'].loading(false);
      _set['dataset'].data(data);
      _set['dataset'].defaultValue();
    },
    onFetchFrequencyCompleted: function (data) {
      _set['frequency'].loading(false);
      _set['frequency'].data(data);
      _set['frequency'].defaultValue();
      this.refresh();
    },
    onFetchDimensionCompleted: function (data) {
      _set['dimension'].loading(false);
      _set['dimension'].data(data);
      _set['dimensionvalue'].data(data);
      _set['dimension'].defaultValue();
      this.refresh();
    }
  /**/
});

module.exports = paramsStore;
