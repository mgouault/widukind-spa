var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var dispatcher = require('../dispatcher');
var constants = require('../constants');
var actions = require('../actions');
var apiCall = require('../apiCall');



var CHANGE_EVENT = 'change';

var _state = {
  'providers': [],
	'providerSelected': '',
  'providerObj': {},
	'datasetSelected': '',
  'datasetObj': {},
	'dimensionsSelected': [],
	'dimensionsObjSelected': []
};



var store = _.assign({}, EventEmitter.prototype, {

  getState: function () {
    return _state; // todo use all getters ?
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  
  getProviders: function () {
    var providers = _.get(_state, 'providers');
    if (!(providers instanceof Array)) {
      _state.providers = [];
    }
    return _state.providers;
  },
  
  getProviderObj: function () {
    if (!(_.get(_state, 'providerObj') instanceof Object)) {
      _state.providerObj = {};
    }
    return _state.providerObj;
  },
  
  getProviderObjValue: function () {
    var providerObj = this.getProviderObj();
    if (!(_.get(providerObj, 'value') instanceof Array)) {
      providerObj.value = [];
    }
    return providerObj.value;
  },
  
  getDatasetObj: function () {
    if (!(_.get(_state, 'datasetObj') instanceof Object)) {
      _state.datasetObj = {};
    }
    return _state.datasetObj;
  },
  
  getDatasetObjValue: function () {
    var datasetObj = this.getDatasetObj();
    if (!(_.get(datasetObj, 'value') instanceof Array)) {
      datasetObj.value = [];
    }
    return datasetObj.value;
  },
  
  getDimensionsObjSelected: function () {
    if (!(_.get(_state, 'dimensionsObjSelected') instanceof Array)) {
      _state.dimensionsObjSelected = [];
    }
    return _state.dimensionsObjSelected;
  },
  
  checkData: function () {
    var promisesAreFun = function (name, data) {
      return Promise.resolve()
        .then(function () {
          if (_.isEmpty(data)) {
            if ((name === 'dataset' && _.isEmpty(_state.providerSelected)) || (name === 'dimension' && _.isEmpty(_state.datasetSelected))) {
              return;
            }
            var url = {
              'provider': 'http://widukind-api-dev.cepremap.org/api/v1/json/providers/keys',
              'dataset': 'http://widukind-api-dev.cepremap.org/api/v1/json/providers/' + _state.providerSelected + '/datasets/keys',
              'dimension': 'http://widukind-api-dev.cepremap.org/api/v1/json/datasets/' + _state.datasetSelected + '/dimensions'
            };
            return apiCall(url[name])
              .then(function (data) {
                toCall[name+'s'+'Missing'](data);
              });
          }
        })
        .then(function () {
          var value = _state[name + 'Selected'];
          if (_.isEmpty(value) && !(value instanceof Array)) {
            value = _.get(_.head(data), 'value');
            toCall[name+'Change'](value);
          }
        })
    };

    return Promise.resolve()
      .then(function () {
        return promisesAreFun('provider', _state.providers);
      })
      .then(function () {
        return promisesAreFun('dataset', _state.providerObj.value);
      })
      .then(function () {
        return promisesAreFun('dimension', _state.datasetObj.value);
      });
  }

});



dispatcher.register(function (action) {
  var data = action.data;
  
	switch (action.actionType) {
		
		case constants.PROVIDER_CHANGE:
      toCall.providerChange(data);
			break;

		case constants.DATASET_CHANGE:
      toCall.datasetChange(data);
			break;

		case constants.DIMENSION_CHANGE:
      toCall.dimensionChange(data);
			break;

    case constants.DIMENSION_VALUES_CHANGE:
      toCall.dimensionValueChange(data, action.data_);
      break;

    default:
      return;
	}

  store.checkData.then(store.emitChange);
});



var toCall = {// todo refactor in setters
  providerChange: function (data) {
    _state.providerSelected = data;
    _state.providerObj = _.find(store.getProviders(), {'name': _state.providerSelected});
    _state.datasetSelected = '';
    _state.datasetObj = {};
    _state.dimensionsSelected = [];
    _state.dimensionsObjSelected = [];
  },
  datasetChange: function (data) {
    _state.datasetSelected = data;
    _state.datasetObj = _.find(store.getProviderObjValue(), {'name': _state.datasetSelected});
    _state.dimensionsSelected = [];
    _state.dimensionsObjSelected = [];
  },
  dimensionChange: function (data) {
    var dimensionsObjSelected = store.getDimensionsObjSelected();
    _.remove(dimensionsObjSelected, function (el) {
      return !_.find(data, {'value': el.name, 'selected': true});
    });
    _.forEach(data, function (el) {
      if (el.selected) {
        var name = el.value;
        _state.dimensionsSelected.push(name);
        if (!_.find(dimensionsObjSelected, {'name': name})) {
          dimensionsObjSelected.push({
            'name': name,
            'value': _.get(_.find(store.getDatasetObjValue(), {'name': name}), 'value')
          });
        }
      }
    });
    _state.dimensionsSelected.sort();
    dimensionsObjSelected.sort(function (a, b) {
      if (a.name < b.name)
        return -1;
      else if (a.name > b.name)
        return 1;
      else
        return 0;
    });
  },
  dimensionValueChange: function (data, dimensionName) {
    var dimensionsObjSelected_ = store.getDimensionsObjSelected();
    var index = _.findIndex(dimensionsObjSelected, {'name': dimensionName});
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
  },
  providersMissing: function (data) {
    var providers = store.getProviders();
    _.forEach(data, function (el) {
      providers.push({'name': el, 'value': []});
    });
  },
  datasetsMissing: function (data) {
    var providerObjValue = store.getProviderObjValue();
    _.forEach(data, function (el) {
      providerObjValue.push({'name': el, 'value': []});
    });
  },
  dimensionsMissing: function (data) {
    var datasetObjValue = store.getDatasetObjValue();
    _.forEach(Object.keys(data), function (el) {
      datasetObjValue.push({'name': el, 'value': Object.keys(data[el])});
    });
  }
};

module.exports = store;