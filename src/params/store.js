var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var dispatcher = require('../dispatcher');
var c = require('../constants');
var apiCall = require('../apiCall');



var CHANGE_EVENT = 'change';

var _statePattern = {};
_statePattern[c.S_PROVIDERS] = [];
_statePattern[c.S_SELECTED_PROVIDER] = '';
_statePattern[c.S_DATASETS] = [];
_statePattern[c.S_SELECTED_DATASET] = '';
_statePattern[c.S_DIMENSIONS] = [];
_statePattern[c.S_SELECTED_DIMENSIONS] = [];
_statePattern['validJSON'] = true;

var _state = _.clone(_statePattern);



function getValidData (key) {
  if ((typeof _state[key] !== typeof _statePattern[key]) ||
    ((_state[key] instanceof Array) !== (_statePattern[key] instanceof Array))) {
    _state[key] = _statePattern[key];
  }
  return _state[key];
}

var store = _.assign({}, EventEmitter.prototype);
var self = store;
store = _.assign(store, {

  /* CheckData */
  checkData: function () {
    var promisesAreFun = function (key) {
      return function () {
        var request, getData, setData, getSelectedData, setSelectedData;
        switch (key) {
          case c.S_PROVIDERS:
            request = {
              'pathname': '/providers',
              'query': {}
            };
            getData = self.getProviders;
            setData = self.setProviders;
            getSelectedData = self.getSelectedProvider;
            setSelectedData = self.setSelectedProvider;
            break;
          case c.S_DATASETS:
            request = {
              'pathname': '/datasets',
              'query': {'provider': self.getSelectedProvider()}
            };
            getData = self.getDatasets;
            setData = self.setDatasets;
            getSelectedData = self.getSelectedDataset;
            setSelectedData = self.setSelectedDataset;
            break;
          case c.S_DIMENSIONS:
            request = {
              'pathname': '/dimensions',
              'query': {'dataset': self.getSelectedDataset()}
            };
            getData = self.getDimensions;
            setData = self.setDimensions;
            getSelectedData = self.getSelectedDimensions;
            setSelectedData = self.setSelectedDimensions;
            break;
        }
        /* Stops checkData if provider/dataset not selected */
        if ((key === c.S_DATASETS && _.isEmpty(_state[c.S_SELECTED_PROVIDER]))
          || (key === c.S_DIMENSIONS && _.isEmpty(_state[c.S_SELECTED_DATASET]))) {
          throw null;
        }
        /* Set select default value if it's undefined */
        var lel = function () {
          var value = getSelectedData();
          if (_.isEmpty(value) && key !== c.S_DIMENSIONS) {
            value = _.get(_.head(getData()), 'name', '');
            setSelectedData(value);
          }
        };
        if (!_.isEmpty(getData())) {
          lel();
          return Promise.resolve();
        }
        /* Fetch missing data */
        _state[key] = undefined; // Set 'loading state'
        self.emitChange();
        return apiCall(request)
          .then(setData)
          .then(lel);
      }
    };
    return promisesAreFun(c.S_PROVIDERS)().then(self.emitChange)
      .then(promisesAreFun(c.S_DATASETS)).then(self.emitChange)
      .then(promisesAreFun(c.S_DIMENSIONS)).then(self.emitChange)
      .catch(function () {});
  },
  /**/


  /* Store methods */
  getState: function () {
    return _state;
  },
  emitChange: function () {
    self.emit(CHANGE_EVENT);
  },
  addChangeListener: function (callback) {
    self.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
    self.removeListener(CHANGE_EVENT, callback);
  },
  /**/


  /* Getters-Setters */
    /* Providers */
  getProviders: function () {
    return getValidData(c.S_PROVIDERS);
  },
  setProviders: function (data) {
    if (data === null) {
      return _state[c.S_PROVIDERS] = null;
    }
    _state[c.S_PROVIDERS] = _.map(data, function (el) {
      return {'name': el, 'value': []};
    });
  },
  getSelectedProvider: function () {
    return getValidData(c.S_SELECTED_PROVIDER);
  },
  setSelectedProvider: function (data) {
    _state[c.S_SELECTED_PROVIDER] = data;
    self.setDatasets([]);
    self.setSelectedDataset('');
  },
    /* Datasets */
  getDatasets: function () {
    return getValidData(c.S_DATASETS);
  },
  setDatasets: function (data) {
    if (data === null) {
      return _state[c.S_DATASETS] = null;
    }
    _state[c.S_DATASETS] = _.map(data, function (el) {
      return {'name': el, 'value': []};
    });
  },
  getSelectedDataset: function () {
    return getValidData(c.S_SELECTED_DATASET);
  },
  setSelectedDataset: function (data) {
    _state[c.S_SELECTED_DATASET] = data;
    self.setDimensions({});
    self.setSelectedDimensions([]);
  },
    /* Dimensions */
  getDimensions: function () {
    return getValidData(c.S_DIMENSIONS);
  },
  setDimensions: function (data) {
    if (data === null) {
      return _state[c.S_DIMENSIONS] = null;
    }
    _state[c.S_DIMENSIONS] = _.map(Object.keys(data), function (el) {
      return {'name': el, 'value': Object.keys(data[el])};
    });
  },

  getSelectedDimensions: function () {
    return getValidData(c.S_SELECTED_DIMENSIONS);
  },
  setSelectedDimensions: function (data) {
    _state[c.S_SELECTED_DIMENSIONS] = _.map(_.filter(data, 'selected'), function (el) {
      var name = el.value;
      return {
        'name': name,
        'value': _.get(_.find(self.getDimensions(), {'name': name}), 'value'),
        'selected': _.get(_.find(self.getSelectedDimensions(), {'name': name}), 'selected')
      };
    });
  }
  /**/

});




dispatcher.register(function (action) {
  var data = action.data;

	switch (action.actionType) {
		case c.PROVIDER_CHANGE:
      store.setSelectedProvider(data);
			break;
		case c.DATASET_CHANGE:
      store.setSelectedDataset(data);
			break;
		case c.DIMENSIONS_CHANGE:
      store.setSelectedDimensions(data);
			break;
    case c.DIMENSION_VALUES_CHANGE:
      _.set(
        _.find(_state[c.S_SELECTED_DIMENSIONS], {'name': action.dimensionName}),
        'selected',
        _.map(_.filter(data, 'selected'), function (el) {
          return el.value;
        })
      );
      break;
    case c.REQUEST_JSON:
      _state['validJSON'] = (typeof data !== 'undefined');
      break;
    default:
      return;
	}

  store.checkData();
});

module.exports = store;