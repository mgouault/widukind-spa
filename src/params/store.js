var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var dispatcher = require('../dispatcher');
var constants = require('../constants');
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
    self.emit(CHANGE_EVENT);
  },
  addChangeListener: function (callback) {
    self.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
    self.removeListener(CHANGE_EVENT, callback);
  }
});

var self = store;
var bar = {

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
              'dimensions': 'http://widukind-api-dev.cepremap.org/api/v1/json/datasets/' + _state.datasetSelected + '/dimensions'
            };
            return apiCall(url[name]).then(function (data) {
              var foo = {
                'provider': self.setProviders,
                'dataset': self.setProviderObjValue,
                'dimensions': self.setDatasetObjValue
              };
              foo[name](data);
            });
          }
        })
        .then(function () {
          var value = _state[name + 'Selected'];
          if (_.isEmpty(value) && !(value instanceof Array)) {
            value = _.get(_.head(data), 'name');
            var foo = {
              'provider': self.setProviderSelected,
              'dataset': self.setDatasetSelected
            };
            foo[name](value);
          }
        })
    };

    return Promise.resolve()
      .then(function () {
        return promisesAreFun('provider', self.getProviders());
      })
      .then(function () {
        return promisesAreFun('dataset', self.getProviderObjValue());
      })
      .then(function () {
        return promisesAreFun('dimensions', self.getDatasetObjValue());
      })
      .then(self.emitChange);
  },


  /* Providers */
  getProviders: function () {
    var providers = _.get(_state, 'providers');
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
    var providerSelected = _.get(_state, 'providerSelected');
    if (!(typeof providerSelected === 'string')) {
      providerSelected = '';
    }
    return providerSelected;
  },
  setProviderSelected: function (data) {
    _state.providerSelected = data;
    self.setProviderObj();
    _state.datasetSelected = '';
    _state.datasetObj = {};
    _state.dimensionsSelected = [];
    _state.dimensionsObjSelected = [];
  },
  getProviderObj: function () {
    var providerObj = _.get(_state, 'providerObj');
    if (!(providerObj instanceof Object)) {
      providerObj = {};
    }
    return providerObj;
  },
  setProviderObj: function () {
    _state.providerObj = _.find(self.getProviders(), {'name': self.getProviderSelected()});
  },
  /**/


  /* Datasets */
  getProviderObjValue: function () {
    var providerObj = self.getProviderObj();
    if (!(_.get(providerObj, 'value') instanceof Array)) {
      providerObj.value = [];
    }
    return providerObj.value;
  },
  setProviderObjValue: function (data) {
    var providerObjValue = self.getProviderObjValue();
    _.forEach(data, function (el) {
      providerObjValue.push({'name': el, 'value': []});
    });
  },
  getDatasetSelected: function () {
    var datasetSelected = _.get(_state, 'datasetSelected');
    if (!(typeof datasetSelected === 'string')) {
      datasetSelected = '';
    }
    return datasetSelected;
  },
  setDatasetSelected: function (data) {
    _state.datasetSelected = data;
    self.setDatasetObj();
    _state.dimensionsSelected = [];
    _state.dimensionsObjSelected = [];
  },
  getDatasetObj: function () {
    var datasetObj = _.get(_state, 'datasetObj');
    if (!(datasetObj instanceof Object)) {
      datasetObj = {};
    }
    return datasetObj;
  },
  setDatasetObj: function () {
    _state.datasetObj = _.find(self.getProviderObjValue(), {'name': self.getDatasetSelected()});
  },
  /**/


  /* Dimensions */
  getDatasetObjValue: function () {
    var datasetObj = self.getDatasetObj();
    if (!(_.get(datasetObj, 'value') instanceof Array)) {
      datasetObj.value = [];
    }
    return datasetObj.value;
  },
  setDatasetObjValue: function (data) {
    var datasetObjValue = self.getDatasetObjValue();
    _.forEach(Object.keys(data), function (el) {
      datasetObjValue.push({'name': el, 'value': Object.keys(data[el])});
    });
  },

  getDimensionsSelected: function () {
    var dimensionsSelected = _.get(_state, 'dimensionsSelected');
    if (!(dimensionsSelected instanceof Array)) {
      dimensionsSelected = [];
    }
    return dimensionsSelected;
  },
  setDimensionsSelected: function (data) {
    var dimensionsObjSelected = self.getDimensionsObjSelected();
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
            'value': _.get(_.find(self.getDatasetObjValue(), {'name': name}), 'value')
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
  getDimensionsObjSelected: function () {
    var dimensionsObjSelected = _.get(_state, 'dimensionsObjSelected');
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

};
store = _.assign(store, bar);



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