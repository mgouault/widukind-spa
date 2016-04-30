var _ = require('lodash');
var axios = require('axios');
var EventEmitter = require('events').EventEmitter;

var appDispatcher = require('./appDispatcher');
var appConstants = require('./appConstants');

var CHANGE_EVENT = 'change';

var _dataObj = {
	'json': {},
	'data': [],
	'providerSelected': 'Select',
	'datasetSelected': 'Select',
	'dimensionsSelected': [],
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

  emitChange: function () {
    this.checkData().then(function (data) {
      _dataObj.data = data;
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
    function refreshData (url) {
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
      return refreshData('http://widukind-api-dev.cepremap.org/api/v1/json/providers/'+_dataObj.providerSelected+'/datasets/keys')
        .then(function (tmp) {
          _.forEach(tmp, function (el, index) {
            datasets[index] = {'name': el, 'value': []}
          });
          return providers;
        });
    } else if (_.isEmpty(dimensions)) {
      return refreshData('http://widukind-api-dev.cepremap.org/api/v1/json/datasets/'+_dataObj.datasetSelected+'/dimensions')
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
			_dataObj.providerSelected = action.value;
			_dataObj.datasetSelected = 'Select';
			_dataObj.dimensionsSelected = [];
			_dataObj.dimensionsObjSelected = [];
			appStore.emitChange();
			break;

		case appConstants.DATASET_CHANGE:
			_dataObj.datasetSelected = action.value;
			_dataObj.dimensionsSelected = [];
			_dataObj.dimensionsObjSelected = [];
			appStore.emitChange();
			break;

		case appConstants.DIMENSIONS_CHANGE:
			_dataObj.dimensionsSelected = action.value1;
			_dataObj.dimensionsObjSelected = action.value2;
			appStore.emitChange();
			break;

    case appConstants.DIMENSION_VALUES_CHANGE:
      _dataObj.dimensionsObjSelected = action.value2;
      appStore.emitChange();
      break;

    case appConstants.REQUEST_JSON:
      _dataObj.json = action.json;
      appStore.emitChange();
      break;

	}
});

appStore.checkData();

module.exports = appStore;