var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var appDispatcher = require('../dispatcher/dispatcher');
var appConstants = require('../constants/constants');
var appActions = require('../actions/actions');



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



var appStore = _.assign({}, EventEmitter.prototype, {

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
    var providerObjValue = _.get(_.find(providers, {'name': _dataObj.providerSelected}), 'value', []);
    var datasetObjValue = _.get(_.find(providerObjValue, {'name': _dataObj.datasetSelected}), 'value', []);
    if (_.isEmpty(providers)) {
      appActions.providersMissing();
    } else if (_dataObj.providerSelected && _.isEmpty(providerObjValue)) {
      appActions.datasetsMissing(_dataObj.providerSelected);
    } else if (_dataObj.datasetSelected && _.isEmpty(datasetObjValue)) {
      appActions.dimensionsMissing(_dataObj.datasetSelected);
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



appDispatcher.register(function (action) {
	switch (action.actionType) {
		
		case appConstants.PROVIDER_CHANGE:
      _providerChange(action.data);
      appStore.emitChange();
      appStore.checkData();
			break;

		case appConstants.DATASET_CHANGE:
      _datasetChange(action.data);
      appStore.emitChange();
      appStore.checkData();
			break;

		case appConstants.DIMENSIONS_CHANGE:
      _dimensionsChange(action.data);
      appStore.emitChange();
      appStore.checkData();
			break;

    case appConstants.DIMENSION_VALUES_CHANGE:
      _dimensionValuesChange(action.data, action.data2);
      appStore.emitChange();
      appStore.checkData();
      break;

    case appConstants.REQUEST_JSON:
      _requestJSON(action.data);
      appStore.emitChange();
      break;

    case appConstants.PROVIDERS_MISSING:
      _providersMissing(action.data);
      _providerChange(_.get(_.head(appStore.getProviders()), 'name'));
      appStore.emitChange();
      appStore.checkData();
      break;

    case appConstants.DATASETS_MISSING:
      _datasetsMissing(action.data);
      _datasetChange(_.get(_.head(appStore.getProviderObjValue()), 'name'));
      appStore.emitChange();
      appStore.checkData();
      break;

    case appConstants.DIMENSIONS_MISSING:
      _dimensionsMissing(action.data);
      appStore.emitChange();
      break;
	}
});



function _providerChange (value) {
  _dataObj.providerSelected = value;
  _dataObj.dimensionsSelected = [];
  _dataObj.providerObj = _.find(appStore.getProviders(), {'name': _dataObj.providerSelected});
  _dataObj.datasetObj = {};
  _dataObj.dimensionsObjSelected = [];
}

function _datasetChange (value) {
  _dataObj.datasetSelected = value;
  _dataObj.dimensionsSelected = [];
  _dataObj.datasetObj = _.find(appStore.getProviderObjValue(), {'name': _dataObj.datasetSelected});
  _dataObj.dimensionsObjSelected = [];
}

function _dimensionsChange (options) {
  var dimensionsSelected = [];
  var dimensionsObjSelected = appStore.getDimensionsObjSelected();
  _.remove(dimensionsObjSelected, function (el) {
    return !_.find(options, {'value': el.name, 'selected': true});
  });
  _.forEach(options, function (el) {
    if (el.selected) {
      var name = el.value;
      dimensionsSelected.push(name);
      if (!_.find(dimensionsObjSelected, {'name': name})) {
        dimensionsObjSelected.push({
          'name': name,
          'value': _.get(_.find(appStore.getDatasetObjValue(), {'name': name}), 'value')
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
  _dataObj.dimensionsSelected = dimensionsSelected;
}

function _dimensionValuesChange (options, dimensionName) {
  var dimensionsObjSelected = appStore.getDimensionsObjSelected();
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
  var providers = appStore.getProviders();
  _.forEach(data, function (el) {
    providers.push({'name': el, 'value': []});
  });
}

function _datasetsMissing (data) {
  var providerObjValue = appStore.getProviderObjValue();
  _.forEach(data, function (el) {
    providerObjValue.push({'name': el, 'value': []});
  });
}

function _dimensionsMissing (data) {
  var datasetObjValue = appStore.getDatasetObjValue();
  _.forEach(Object.keys(data), function (el) {
    datasetObjValue.push({'name': el, 'value': Object.keys(data[el])});
  });
}

module.exports = appStore;