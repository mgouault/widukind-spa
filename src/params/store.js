var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var dispatcher = require('../dispatcher');
var c = require('../constants');
var apiCall = require('../apiCall');



var CHANGE_EVENT = 'change';

var _state = {};
_state[c.S_PROVIDERS] = [];
_state[c.S_SELECTED_PROVIDER] = '';
_state[c.S_PROVIDER_OBJ] = {};
_state[c.S_SELECTED_DATASET] = '';
_state[c.S_DATASET_OBJ] = {};
_state[c.S_SELECTED_DIMENSIONS] = [];
_state[c.S_SELECTED_DIMENSIONS_VALUES] = [];



function getValidData (key, valid, value) {
  if (!(valid)) {
    _state[key] = value;
  }
  return _state[key];
}

var store = _.assign({}, EventEmitter.prototype);
var self = store;
store = _.assign(store, {

  /* CheckData */
  checkData: function () {
    var promisesAreFun = function (name, getData) {
      return Promise.resolve()
        .then(function () {
          if (!_.isEmpty(getData()) || (name === c.DATASET && _.isEmpty(_state[c.S_SELECTED_PROVIDER])) || (name === c.DIMENSION && _.isEmpty(_state[c.S_SELECTED_DATASET]))) {
            return;
          }
          var url;
          switch (name) {
            case c.PROVIDER:
              url = 'http://widukind-api-dev.cepremap.org/api/v1/json/providers/keys'; break;
            case c.DATASET:
              url = 'http://widukind-api-dev.cepremap.org/api/v1/json/providers/' + self.getSelectedProvider() + '/datasets/keys'; break;
            case c.DIMENSION:
              url = 'http://widukind-api-dev.cepremap.org/api/v1/json/datasets/' + self.getSelectedDataset() + '/dimensions'; break;
          }
          switch (name) {
            case c.PROVIDER:
              _state[c.S_PROVIDERS] = undefined; break;
            case c.DATASET:
              _state[c.S_PROVIDER_OBJ].value = undefined; break;
            case c.DIMENSION:
              _state[c.S_DATASET_OBJ].value = undefined; break;
          }
          self.emitChange();
          return apiCall(url).then(function (data) {
            switch (name) {
              case c.PROVIDER:
                self.setProviders(data); break;
              case c.DATASET:
                self.setProviderObjValue(data); break;
              case c.DIMENSION:
                self.setDatasetObjValue(data); break;
            }
          });
        })
        .then(function () {
          var value;
          switch (name) {
            case c.PROVIDER:
              value = self.getSelectedProvider(); break;
            case c.DATASET:
              value = self.getSelectedDataset(); break;
            case c.DIMENSION:
              value = self.getSelectedDimensions(); break;
          }
          if (!_.isEmpty(value) || name === c.DIMENSION) {
            return;
          }
          value = _.get(_.head(getData()), 'name', '');
          switch (name) {
            case c.PROVIDER:
              self.setSelectedProvider(value); break;
            case c.DATASET:
              self.setSelectedDataset(value); break;
          }
        })
    };

    return Promise.resolve()
      .then(function () {
        return promisesAreFun(c.PROVIDER, self.getProviders);
      })
      .then(function () {
        self.emitChange();
        return promisesAreFun(c.DATASET, self.getProviderObjValue);
      })
      .then(function () {
        self.emitChange();
        return promisesAreFun(c.DIMENSION, self.getDatasetObjValue);
      })
      .then(self.emitChange);
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
    return getValidData(c.S_PROVIDERS, _state[c.S_PROVIDERS] instanceof Array, []);
  },
  setProviders: function (data) {
    self.getProviders();
    _.forEach(data, function (el) {
      _state[c.S_PROVIDERS].push({'name': el, 'value': []});
    });
  },
  getSelectedProvider: function () {
    return getValidData(c.S_SELECTED_PROVIDER, typeof _state[c.S_SELECTED_PROVIDER] === 'string', '');
  },
  setSelectedProvider: function (data) {
    _state[c.S_SELECTED_PROVIDER] = data;
    self.setProviderObj();
    self.setSelectedDataset('');
    self.setSelectedDimensions([]);
  },
  getProviderObj: function () {
    return getValidData(c.S_PROVIDER_OBJ, typeof _state[c.S_PROVIDER_OBJ] === 'object', {});
  },
  setProviderObj: function () {
    _state[c.S_PROVIDER_OBJ] = _.find(self.getProviders(), {'name': self.getSelectedProvider()});
  },
    /**/

    /* Datasets */
  getProviderObjValue: function () {
    var providerObjValue = self.getProviderObj().value;
    if (!(providerObjValue instanceof Array)) {
      _state[c.S_PROVIDER_OBJ].value = [];
    }
    return _state[c.S_PROVIDER_OBJ].value;
  },
  setProviderObjValue: function (data) {
    self.getProviderObjValue();
    _.forEach(data, function (el) {
      _state[c.S_PROVIDER_OBJ].value.push({'name': el, 'value': []});
    });
  },
  getSelectedDataset: function () {
    return getValidData(c.S_SELECTED_DATASET, typeof _state[c.S_SELECTED_DATASET] === 'string', '');
  },
  setSelectedDataset: function (data) {
    _state[c.S_SELECTED_DATASET] = data;
    self.setDatasetObj();
    self.setSelectedDimensions([]);
  },
  getDatasetObj: function () {
    return getValidData(c.S_DATASET_OBJ, typeof _state[c.S_DATASET_OBJ] === 'object', {});
  },
  setDatasetObj: function () {
    _state[c.S_DATASET_OBJ] = _.find(self.getProviderObjValue(), {'name': self.getSelectedDataset()});
  },
    /**/

    /* Dimensions */
  getDatasetObjValue: function () {
    var datasetObjValue = self.getDatasetObj().value;
    if (!(datasetObjValue instanceof Array)) {
      _state[c.S_DATASET_OBJ].value = [];
    }
    return _state[c.S_DATASET_OBJ].value;
  },
  setDatasetObjValue: function (data) {
    self.getDatasetObjValue();
    _.forEach(Object.keys(data), function (el) {
      _state[c.S_DATASET_OBJ].value.push({'name': el, 'value': Object.keys(data[el])});
    });
  },

  getSelectedDimensions: function () {
    return getValidData(c.S_SELECTED_DIMENSIONS, _state[c.S_SELECTED_DIMENSIONS] instanceof Array, []);
  },
  setSelectedDimensions: function (data) {
    self.getSelectedDimensions();
    _.remove(_state[c.S_SELECTED_DIMENSIONS]);
    self.getSelectedDimensionsValues();
    _.remove(_state[c.S_SELECTED_DIMENSIONS_VALUES], function (el) {
      return !_.find(data, {'value': el.name, 'selected': true});
    });
    _.forEach(data, function (el) {
      if (el.selected) {
        var name = el.value;
        _state[c.S_SELECTED_DIMENSIONS].push(name);
        if (!_.find(_state[c.S_SELECTED_DIMENSIONS_VALUES], {'name': name})) {
          _state[c.S_SELECTED_DIMENSIONS_VALUES].push({
            'name': name,
            'value': _.get(_.find(self.getDatasetObjValue(), {'name': name}), 'value')
          });
        }
      }
    });
    _state[c.S_SELECTED_DIMENSIONS].sort();
    _state[c.S_SELECTED_DIMENSIONS_VALUES].sort(function (a, b) {
      if (a.name < b.name)
        return -1;
      else if (a.name > b.name)
        return 1;
      else
        return 0;
    });
  },
  getSelectedDimensionsValues: function () {
    return getValidData(c.S_SELECTED_DIMENSIONS_VALUES, _state[c.S_SELECTED_DIMENSIONS_VALUES] instanceof Array, []);
  },
  setSelectedDimensionsValues: function (data, dimensionName) {
    self.getSelectedDimensionsValues();
    var index = _.findIndex(_state[c.S_SELECTED_DIMENSIONS_VALUES], {'name': dimensionName});
    if (index < 0) {
      return;
    }
    var values = [];
    _.forEach(data, function (el) {
      if (el.selected) {
        values.push(el.value);
      }
    });
    _state[c.S_SELECTED_DIMENSIONS_VALUES][index].selected = values;
  }
    /**/
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

		case c.DIMENSION_CHANGE:
      store.setSelectedDimensions(data);
			break;

    case c.DIMENSION_VALUES_CHANGE:
      store.setSelectedDimensionsValues(data, action.data_);
      break;

    default:
      return;
	}

  store.checkData();
});

module.exports = store;