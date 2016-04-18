var _ = require('lodash');
var $ = require('jquery');
var EventEmitter = require('events').EventEmitter;

var appDispatcher = require('./appDispatcher');
var appConstants = require('./appConstants');

var CHANGE_EVENT = 'change';

var _dataObj = {
	'data': [],
	'providerSelected': 'Select',
	'datasetSelected': 'Select',
	'dimensionsSelected': [],
	'dimensionsObjSelected': []
};

var appStore = _.assign({}, EventEmitter.prototype, {
	
	getDataObj: function () {
		return _dataObj;
	},

	checkData: function () {
		function refreshData (url) {
			var tmpData = {};
			$.ajax({
				url: url,
				async: false,
				success: function (received) {
					if (_.has(received, 'error')) {
						console.error(url, received.error.toString());
					} else {
						tmpData = received.data;
					}
				},
				error: function (xhr, status, err) {
					console.error(url, status, err.toString());
				}
			});
			return tmpData;
		}
		var data = _.clone(_dataObj.data);
		if (!data || _.isEmpty(data)) {
			var tmp = refreshData('http://widukind-api-dev.cepremap.org/api/v1/json/providers/keys');
			data = [];
			tmp.forEach(function (el, index) {
				data[index] = {
					'name': el,
					'value': []
				}
			});
			_dataObj.data = data;
			return;
		}
		var providerObj = _.find(data, {'name': _dataObj.providerSelected});
		if (!providerObj) {
			return;
		}
		if (!providerObj.value || _.isEmpty(providerObj.value)) {
			var tmp = refreshData('http://widukind-api-dev.cepremap.org/api/v1/json/providers/'+_dataObj.providerSelected+'/datasets/keys');
			providerObj.value = [];
			tmp.forEach(function (el, index) {
				providerObj.value[index] = {
					'name': el,
					'value': []
				}
			});
			_dataObj.data = data;
			return;
		}
		var datasetObj = _.find(providerObj.value, {'name': _dataObj.datasetSelected});
		if (!datasetObj) {
			return;
		}
		if (!datasetObj.value || _.isEmpty(datasetObj.value)) {
			var tmp = refreshData('http://widukind-api-dev.cepremap.org/api/v1/json/datasets/'+_dataObj.datasetSelected+'/dimensions');
			datasetObj.value = [];
			Object.keys(tmp).forEach(function (el, index, array) {
				datasetObj.value[index] = {
					'name': el,
					'value': Object.keys(tmp[el])
				}
			});
			_dataObj.data = data;
			return;
		}
	},
	
	emitChange: function () {
		this.checkData();
		this.emit(CHANGE_EVENT);
	},
	
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
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

	}
});

appStore.checkData();

module.exports = appStore;