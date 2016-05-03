var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var dispatcher = require('../dispatcher/dispatcher');
var constants = require('../constants/constants');
var actions = require('../actions/actions');



var CHANGE_EVENT = 'change';

var _dataObj = {
  'loading': [],
	'json': {},
	'providerSelected': '',
	'datasetSelected': '',
	'dimensionsSelected': [],
	'providers': [],
  'providerObj': {},
  'datasetObj': {},
	'dimensionsObjSelected': []
};



var store = _.assign({}, EventEmitter.prototype, {

  getDataObj: function (checkData) {
    if (checkData) {
      this.checkData();
    }
    return _dataObj;
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

  checkData: function () {
    var providers = this.getProviders();
    var providerObjValue = _.get(_.find(providers, {'name': _dataObj.providerSelected}), 'value');
    var datasetObjValue = _.get(_.find(providerObjValue, {'name': _dataObj.datasetSelected}), 'value');
    if (_.isEmpty(providers)) {
      _dataObj.loading.push('provider');
      this.emitChange();
      actions.providersMissing();
    } else if (_dataObj.providerSelected && _.isEmpty(providerObjValue)) {
      _dataObj.loading.push('dataset');
      this.emitChange();
      actions.datasetsMissing(_dataObj.providerSelected);
    } else if (_dataObj.datasetSelected && _.isEmpty(datasetObjValue)) {
      _dataObj.loading.push('dimensions');
      this.emitChange();
      actions.dimensionsMissing(_dataObj.datasetSelected);
    } 
  },
  
  getProviders: function () {
    var providers = _.get(_dataObj, 'providers');
    if (!(providers instanceof Array)) {
      _dataObj.providers = [];
    }
    return _dataObj.providers;
  },
  
  getProviderObj: function () {
    if (!(_.get(_dataObj, 'providerObj') instanceof Object)) {
      _dataObj.providerObj = {};
    }
    return _dataObj.providerObj;
  },
  
  getProviderObjValue: function () {
    var providerObj = this.getProviderObj();
    if (!(_.get(providerObj, 'value') instanceof Array)) {
      providerObj.value = [];
    }
    return providerObj.value;
  },
  
  getDatasetObj: function () {
    if (!(_.get(_dataObj, 'datasetObj') instanceof Object)) {
      _dataObj.datasetObj = {};
    }
    return _dataObj.datasetObj;
  },
  
  getDatasetObjValue: function () {
    var datasetObj = this.getDatasetObj();
    if (!(_.get(datasetObj, 'value') instanceof Array)) {
      datasetObj.value = [];
    }
    return datasetObj.value;
  },
  
  getDimensionsObjSelected: function () {
    if (!(_.get(_dataObj, 'dimensionsObjSelected') instanceof Array)) {
      _dataObj.dimensionsObjSelected = [];
    }
    return _dataObj.dimensionsObjSelected;
  }

});



dispatcher.register(function (action) {
	switch (action.actionType) {
		
		case constants.PROVIDER_CHANGE:
      _providerChange(action.data);
      store.emitChange();
      store.checkData();
			break;

		case constants.DATASET_CHANGE:
      _datasetChange(action.data);
      store.emitChange();
      store.checkData();
			break;

		case constants.DIMENSIONS_CHANGE:
      _dimensionsChange(action.data);
      store.emitChange();
      store.checkData();
			break;

    case constants.DIMENSION_VALUES_CHANGE:
      _dimensionValuesChange(action.data, action.data2);
      store.emitChange();
      store.checkData();
      break;

    case constants.REQUEST_JSON:
      _requestJSON(action.data);
      store.emitChange();
      break;

    case constants.PROVIDERS_MISSING:
      _providersMissing(action.data);
      _providerChange(_.get(_.head(store.getProviders()), 'name'));
      _dataObj.loading = _.remove(_dataObj.loading, 'provider');
      store.emitChange();
      store.checkData();
      break;

    case constants.DATASETS_MISSING:
      _datasetsMissing(action.data);
      _datasetChange(_.get(_.head(store.getProviderObjValue()), 'name'));
      _dataObj.loading = _.remove(_dataObj.loading, 'dataset');
      store.emitChange();
      store.checkData();
      break;

    case constants.DIMENSIONS_MISSING:
      _dimensionsMissing(action.data);
      _dataObj.loading = _.remove(_dataObj.loading, 'dimensions');
      store.emitChange();
      break;
	}
});



function _providerChange (value) {
  _dataObj.providerSelected = value;
  _dataObj.providerObj = _.find(store.getProviders(), {'name': _dataObj.providerSelected});
  _dataObj.datasetSelected = '';
  _dataObj.datasetObj = {};
  _dataObj.dimensionsSelected = [];
  _dataObj.dimensionsObjSelected = [];

}

function _datasetChange (value) {
  _dataObj.datasetSelected = value;
  _dataObj.datasetObj = _.find(store.getProviderObjValue(), {'name': _dataObj.datasetSelected});
  _dataObj.dimensionsSelected = [];
  _dataObj.dimensionsObjSelected = [];
}

function _dimensionsChange (options) {
  var dimensionsObjSelected = store.getDimensionsObjSelected();
  _.remove(dimensionsObjSelected, function (el) {
    return !_.find(options, {'value': el.name, 'selected': true});
  });
  _.forEach(options, function (el) {
    if (el.selected) {
      var name = el.value;
      _dataObj.dimensionsSelected.push(name);
      if (!_.find(dimensionsObjSelected, {'name': name})) {
        dimensionsObjSelected.push({
          'name': name,
          'value': _.get(_.find(store.getDatasetObjValue(), {'name': name}), 'value')
        });
      }
    }
  });
  _dataObj.dimensionsSelected.sort();
  dimensionsObjSelected.sort(function (a, b) {
    if (a.name < b.name)
      return -1;
    else if (a.name > b.name)
      return 1;
    else
      return 0;
  });
}

function _dimensionValuesChange (options, dimensionName) {
  var dimensionsObjSelected = store.getDimensionsObjSelected();
  var index = _.findIndex(dimensionsObjSelected, {'name': dimensionName});
  if (index < 0) {
    return;
  }
  var values = [];
  _.forEach(options, function (el) {
    if (el.selected) {
      values.push(el.value);
    }
  });
  dimensionsObjSelected[index].selected = values;
}

function _requestJSON (json) {
  _dataObj.json = json;
}

function _providersMissing (data) {
  var providers = store.getProviders();
  _.forEach(data, function (el) {
    providers.push({'name': el, 'value': []});
  });
}

function _datasetsMissing (data) {
  var providerObjValue = store.getProviderObjValue();
  _.forEach(data, function (el) {
    providerObjValue.push({'name': el, 'value': []});
  });
}

function _dimensionsMissing (data) {
  var datasetObjValue = store.getDatasetObjValue();
  _.forEach(Object.keys(data), function (el) {
    datasetObjValue.push({'name': el, 'value': Object.keys(data[el])});
  });
}

module.exports = store;