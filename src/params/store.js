var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var dispatcher = require('../dispatcher');
var constants = require('../constants');
var apiCall = require('../apiCall');



var CHANGE_EVENT = 'change';

var _state = {};
_state[constants.S_PROVIDERS] = [];
_state[constants.S_SELECTED_PROVIDER] = '';
_state[constants.S_PROVIDER_OBJ] = {};
_state[constants.S_SELECTED_DATASET] = '';
_state[constants.S_DATASET_OBJ] = {};
_state[constants.S_SELECTED_DIMENSIONS] = [];
_state[constants.S_SELECTED_DIMENSIONS_VALUES] = [];



var store = _.assign({}, EventEmitter.prototype);
var self = store;
store = _.assign(store, {

  checkData: function () {
    var promisesAreFun = function (name, data) {
      return Promise.resolve()
        .then(function () {
          if (!_.isEmpty(data) || (name === constants.DATASET && _.isEmpty(_state[constants.S_SELECTED_PROVIDER])) || (name === constants.DIMENSION && _.isEmpty(_state[constants.S_SELECTED_DATASET]))) {
            return;
          }
          var url;
          switch (name) {
            case constants.PROVIDER:
              url = 'http://widukind-api-dev.cepremap.org/api/v1/json/providers/keys'; break;
            case constants.DATASET:
              url = 'http://widukind-api-dev.cepremap.org/api/v1/json/providers/' + _state[constants.S_SELECTED_PROVIDER] + '/datasets/keys'; break;
            case constants.DIMENSION:
              url = 'http://widukind-api-dev.cepremap.org/api/v1/json/datasets/' + _state[constants.S_SELECTED_DATASET] + '/dimensions'; break;
          }
          return apiCall(url).then(function (data) {
            switch (name) {
              case constants.PROVIDER:
                self.setProviders(data); break;
              case constants.DATASET:
                self.setProviderObjValue(data); break;
              case constants.DIMENSION:
                self.setDatasetObjValue(data); break;
            }
          });
        })
        .then(function () {
          var value;
          switch (name) {
            case constants.PROVIDER:
              value = _state[constants.S_SELECTED_PROVIDER]; break;
            case constants.DATASET:
              value = _state[constants.S_SELECTED_DATASET]; break;
            case constants.DIMENSION:
              value = _state[constants.S_SELECTED_DIMENSIONS]; break;
          }
          if (!_.isEmpty(value) || name === constants.DIMENSION) {
            return;
          }
          value = _.get(_.head(data), 'name');
          switch (name) {
            case constants.PROVIDER:
              self.setProviderSelected(value); break;
            case constants.DATASET:
              self.setDatasetSelected(value); break;
          }
        })
    };

    return Promise.resolve()
      .then(function () {
        return promisesAreFun(constants.PROVIDER, self.getProviders());
      })
      .then(function () {
        return promisesAreFun(constants.DATASET, self.getProviderObjValue());
      })
      .then(function () {
        return promisesAreFun(constants.DIMENSION, self.getDatasetObjValue());
      })
      .then(self.emitChange);
  },

  /* Store methods */
  getState: function () {
    return _state; // todo use all getters ?
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

  /* Providers */
  getProviders: function () {
    var providers = _.get(_state, constants.S_PROVIDERS);
    if (!(providers instanceof Array)) {
      providers = [];
    }
    return providers;
  },
  setProviders: function (data) {
    var providers = self.getProviders();
    _.forEach(data, function (el) {
      providers.push({'name': el, 'value': []});
    });
  },
  getProviderSelected: function () {
    var providerSelected = _.get(_state, constants.S_SELECTED_PROVIDER);
    if (!(typeof providerSelected === 'string')) {
      providerSelected = '';
    }
    return providerSelected;
  },
  setProviderSelected: function (data) {
    _state[constants.S_SELECTED_PROVIDER] = data;
    self.setProviderObj();
    _state[constants.S_SELECTED_DATASET] = '';
    _state[constants.S_DATASET_OBJ] = {};
    _state[constants.S_SELECTED_DIMENSIONS] = [];
    _state[constants.S_SELECTED_DIMENSIONS_VALUES] = [];
  },
  getProviderObj: function () {
    var providerObj = _.get(_state, constants.S_PROVIDER_OBJ);
    if (!(providerObj instanceof Object)) {
      providerObj = {};
    }
    return providerObj;
  },
  setProviderObj: function () {
    _state[constants.S_PROVIDER_OBJ] = _.find(self.getProviders(), {'name': self.getProviderSelected()});
  },
  /**/


  /* Datasets */
  getProviderObjValue: function () {
    var providerObjValue = self.getProviderObj().value;
    if (!(providerObjValue instanceof Array)) {
      providerObjValue = [];
    }
    return providerObjValue;
  },
  setProviderObjValue: function (data) {
    var providerObjValue = self.getProviderObjValue();
    _.forEach(data, function (el) {
      providerObjValue.push({'name': el, 'value': []});
    });
  },
  getDatasetSelected: function () {
    var datasetSelected = _.get(_state, constants.S_SELECTED_DATASET);
    if (!(typeof datasetSelected === 'string')) {
      datasetSelected = '';
    }
    return datasetSelected;
  },
  setDatasetSelected: function (data) {
    _state[constants.S_SELECTED_DATASET] = data;
    self.setDatasetObj();
    _state[constants.S_SELECTED_DIMENSIONS] = [];
    _state[constants.S_SELECTED_DIMENSIONS_VALUES] = [];
  },
  getDatasetObj: function () {
    var datasetObj = _.get(_state, constants.S_DATASET_OBJ);
    if (!(datasetObj instanceof Object)) {
      datasetObj = {};
    }
    return datasetObj;
  },
  setDatasetObj: function () {
    _state[constants.S_DATASET_OBJ] = _.find(self.getProviderObjValue(), {'name': self.getDatasetSelected()});
  },
  /**/


  /* Dimensions */
  getDatasetObjValue: function () {
    var datasetObjValue = self.getDatasetObj().value;
    if (!(datasetObjValue instanceof Array)) {
      datasetObjValue = [];
    }
    return datasetObjValue;
  },
  setDatasetObjValue: function (data) {
    var datasetObjValue = self.getDatasetObjValue();
    _.forEach(Object.keys(data), function (el) {
      datasetObjValue.push({'name': el, 'value': Object.keys(data[el])});
    });
  },

  getDimensionsSelected: function () {
    var dimensionsSelected = _.get(_state, constants.S_SELECTED_DIMENSIONS);
    if (!(dimensionsSelected instanceof Array)) {
      dimensionsSelected = [];
    }
    return dimensionsSelected;
  },
  setDimensionsSelected: function (data) {
    var dimensionsSelected = self.getDimensionsSelected();
    _.remove(dimensionsSelected);
    var dimensionsObjSelected = self.getDimensionsObjSelected();
    _.remove(dimensionsObjSelected, function (el) {
      return !_.find(data, {'value': el.name, 'selected': true});
    });
    _.forEach(data, function (el) {
      if (el.selected) {
        var name = el.value;
        dimensionsSelected.push(name);
        if (!_.find(dimensionsObjSelected, {'name': name})) {
          dimensionsObjSelected.push({
            'name': name,
            'value': _.get(_.find(self.getDatasetObjValue(), {'name': name}), 'value')
          });
        }
      }
    });
    dimensionsSelected.sort();
    dimensionsObjSelected.sort(function (a, b) {
      if (a.name < b.name)
        return -1;
      else if (a.name > b.name)
        return 1;
      else
        return 0;
    });
  },
  getDimensionsObjSelected: function () {
    var dimensionsObjSelected = _.get(_state, constants.S_SELECTED_DIMENSIONS_VALUES);
    if (!(dimensionsObjSelected instanceof Array)) {
      dimensionsObjSelected = [];
    }
    return dimensionsObjSelected
  },
  setDimensionsObjSelected: function (data, dimensionName) {
    var dimensionsObjSelected_ = self.getDimensionsObjSelected();
    var index = _.findIndex(dimensionsObjSelected_, {'name': dimensionName});
    if (index < 0) {
      return;
    }
    var values = [];
    _.forEach(data, function (el) {
      if (el.selected) {
        values.push(el.value);
      }
    });
    dimensionsObjSelected_[index].selected = values;
  }
  /**/

});



dispatcher.register(function (action) {
  var data = action.data;

	switch (action.actionType) {

		case constants.PROVIDER_CHANGE:
      store.setProviderSelected(data);
			break;

		case constants.DATASET_CHANGE:
      store.setDatasetSelected(data);
			break;

		case constants.DIMENSION_CHANGE:
      store.setDimensionsSelected(data);
			break;

    case constants.DIMENSION_VALUES_CHANGE:
      store.setDimensionsObjSelected(data, action.data_);
      break;

    default:
      return;
	}

  store.checkData();
});

module.exports = store;