var _ = require('lodash');
var axios = require('axios');
var EventEmitter = require('events').EventEmitter;

var appDispatcher = require('../dispatcher/dispatcher');
var appConstants = require('../constants/constants');

var CHANGE_EVENT = 'change';

var _dataObj = {
  'loading': [],
	'json': {},
	'data': [],
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
      return this.checkData().then(function (data) {
        _dataObj.data = data;
        return _dataObj;
      });
    } else {
      return _dataObj;
    }
  },

  emitChange: function (el) {
    _dataObj.loading.push(el);
    this.emit(CHANGE_EVENT);
    this.checkData().then(function (data) {
      _dataObj.data = data;
      _dataObj.loading = _.remove(_dataObj.loading, el);
      this.emit(CHANGE_EVENT); 
    }.bind(this));
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  checkData: function () {
    function refreshData(url) {
      var tmpData = {};
      return axios.get(url)
        .then(function (received) {
          received = received.data;
          if (_.has(received, 'error')) {
            console.error(url, received.error.toString());
          } else {
            tmpData = received.data;
          }
          return tmpData;
        })
        .catch(function (xhr, status, err) {
          console.error(url, status, err.toString());
          return tmpData;
        });
    }

    var providers = _.clone(_.get(_dataObj, 'data', []));
    var datasets = _.get(_.find(providers, {'name': _dataObj.providerSelected}), 'value', []);
    var dimensions = _.get(_.find(datasets, {'name': _dataObj.datasetSelected}), 'value', []);
    if (_.isEmpty(providers)) {
      return refreshData('http://widukind-api-dev.cepremap.org/api/v1/json/providers/keys')
        .then(function (tmp) {
          _.forEach(tmp, function (el, index) {
            providers[index] = {'name': el, 'value': []}
          });
          return providers;
        });
    } else if (_.isEmpty(datasets)) {
      if (_dataObj.providerSelected === 'Select') {
        return Promise.resolve(providers);
      }
      return refreshData('http://widukind-api-dev.cepremap.org/api/v1/json/providers/' + _dataObj.providerSelected + '/datasets/keys')
        .then(function (tmp) {
          _.forEach(tmp, function (el, index) {
            datasets[index] = {'name': el, 'value': []}
          });
          return providers;
        });
    } else if (_.isEmpty(dimensions)) {
      if (_dataObj.datasetSelected === 'Select') {
        return Promise.resolve(providers);
      }
      return refreshData('http://widukind-api-dev.cepremap.org/api/v1/json/datasets/' + _dataObj.datasetSelected + '/dimensions')
        .then(function (tmp) {
          _.forEach(Object.keys(tmp), function (el, index) {
            dimensions[index] = {'name': el, 'value': Object.keys(tmp[el])}
          });
          return providers;
        });
    } else {
      return Promise.resolve(providers);
    }
  }

});

appDispatcher.register(function (action) {
	switch (action.actionType) {
		
		case appConstants.PROVIDER_CHANGE:
      _providerChange(action.value);
			appStore.emitChange('datasets');
			break;

		case appConstants.DATASET_CHANGE:
      _datasetChange(action.value);
			appStore.emitChange('dimensions');
			break;

		case appConstants.DIMENSIONS_CHANGE:
      _dimensionsChange(action.options);
			appStore.emitChange('dimensionValues');
			break;

    case appConstants.DIMENSION_VALUES_CHANGE:
      _dimensionValuesChange(action.options, action.dimensionName);
      appStore.emitChange('none');
      break;

    case appConstants.REQUEST_JSON:
      _requestJSON(action.json);
      appStore.emitChange('requestJSON');
      break;

	}
});

function _providerChange (value) {
  _dataObj.providerSelected = value;
  _dataObj.datasetSelected = '';
  _dataObj.dimensionsSelected = [];
  _dataObj.dimensionsObjSelected = [];
  _dataObj.providerObj = _.find(_dataObj.data, {'name': _dataObj.providerSelected});
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

module.exports = appStore;