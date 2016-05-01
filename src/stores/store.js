var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var appDispatcher = require('../dispatcher/dispatcher');
var appConstants = require('../constants/constants');
var appActions = require('../actions/actions');

var CHANGE_EVENT = 'change';

var _dataObj = {
  'loading': [],
	'json': {},
	'providers': [],
	'providerSelected': '',
	'datasetSelected': '',
	'dimensionsSelected': [],
  'providerObj': {},
  'datasetObj': {},
	'dimensionsObjSelected': []
};

var appStore = _.assign({}, EventEmitter.prototype, {

  getDataObj: function (checkData) {
    if (checkData) {
      this.checkData()
    }
    return _dataObj;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
    this.checkData();
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  checkData: function () {
    var providers = _.clone(_dataObj.providers);
    var providerObjValue = _.get(_.find(providers, {'name': _dataObj.providerSelected}), 'value');
    var datasetObjValue = _.get(_.find(providerObjValue, {'name': _dataObj.datasetSelected}), 'value');
    if (_.isEmpty(providers)) {
      appActions.providersMissing();
    } else if (_.isEmpty(providerObjValue)) {
      if (_dataObj.providerSelected === 'Select') {
        return;
      }
      appActions.datasetsMissing(_dataObj.providerSelected);
    } else if (_.isEmpty(datasetObjValue)) {
      if (_dataObj.datasetSelected === 'Select') {
        return;
      }
      appActions.dimensionsMissing(_dataObj.datasetSelected);
    } 
  }

});

appDispatcher.register(function (action) {
	switch (action.actionType) {
		
		case appConstants.PROVIDER_CHANGE:
      _providerChange(action.value);
			appStore.emitChange();
			break;

		case appConstants.DATASET_CHANGE:
      _datasetChange(action.value);
			appStore.emitChange();
			break;

		case appConstants.DIMENSIONS_CHANGE:
      _dimensionsChange(action.options);
			appStore.emitChange();
			break;

    case appConstants.DIMENSION_VALUES_CHANGE:
      _dimensionValuesChange(action.options, action.dimensionName);
      appStore.emitChange();
      break;

    case appConstants.REQUEST_JSON:
      _requestJSON(action.json);
      appStore.emitChange();
      break;

    case appConstants.PROVIDERS_MISSING:
      _providersMissing(action.data);
      appStore.emitChange();
      break;

    case appConstants.DATASETS_MISSING:
      _datasetsMissing(action.data);
      appStore.emitChange();
      break;

    case appConstants.DIMENSIONS_MISSING:
      _dimensionsMissing(action.data);
      appStore.emitChange();
      break;
	}
});

function _providerChange (value) {
  _dataObj.providerSelected = value;
  _dataObj.datasetSelected = '';
  _dataObj.dimensionsSelected = [];
  _dataObj.dimensionsObjSelected = [];
  _dataObj.providerObj = _.find(_dataObj.providers, {'name': _dataObj.providerSelected});
}

function _datasetChange (value) {
  _dataObj.datasetSelected = value;
  _dataObj.dimensionsSelected = [];
  _dataObj.dimensionsObjSelected = [];
  _dataObj.datasetObj = _.find(_.get(_dataObj.providerObj, 'value'), {'name': _dataObj.datasetSelected});
}

function _dimensionsChange (options) {
  var dimensionsSelected = [];
  var dimensionsObjSelected = _dataObj.dimensionsObjSelected;
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
          'value': _.get(_.find(_.get(_dataObj.datasetObj, 'value'), {'name': name}), 'value')
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
  _dataObj.dimensionsObjSelected = dimensionsObjSelected;
}

function _dimensionValuesChange (options, dimensionName) {
  var dimensionsObjSelected = _dataObj.dimensionsObjSelected;
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
  _dataObj.dimensionsObjSelected = dimensionsObjSelected;
}

function _requestJSON (json) {
  _dataObj.json = json;
}

function _providersMissing (data) {
  var providers = [];
  _.forEach(data, function (el, i) {
    providers[i] = {'name': el, 'value': []}
  });
  _dataObj.providers = providers;
}

function _datasetsMissing (data) {
  var providers = _.clone(_dataObj.providers);
  var providerObj = _.find(providers, {'name': _dataObj.providerSelected});
  _.forEach(data, function (el, index) {
    providerObj[index] = {'name': el, 'value': []}
  });
  _dataObj.providers = providers;
}

function _dimensionsMissing (data) {
  var providers = _.clone(_dataObj.providers);
  var providerObjValue = _.get(_.find(providers, {'name': _dataObj.providerSelected}), 'value');
  var datasetObjValue = _.get(_.find(providerObjValue, {'name': _dataObj.datasetSelected}), 'value');
  _.forEach(Object.keys(data), function (el, i) {
    datasetObjValue[i] = {'name': el, 'value': Object.keys(data[el])}
  });
  _dataObj.providers = providers;
}

module.exports = appStore;