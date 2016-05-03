var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var dispatcher = require('../dispatcher/dispatcher');
var constants = require('../constants/constants');
var actions = require('../actions/actions');



var CHANGE_EVENT = 'change';

var _dataObj = {
	'datasetSelected': '',
	'dimensionsObjSelected': []
};



var store = _.assign({}, EventEmitter.prototype, {

  getData: function () {
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
  }
});



dispatcher.register(function (action) {
  switch (action.actionType) {

    case constants.PROVIDER_CHANGE:
      // update dataset
      break;

    case constants.DATASET_CHANGE:
      _dataObj.datasetSelected = action.data;
      store.emitChange();
      break;

    case constants.DIMENSIONS_CHANGE:
      // update dimensionValues
      break;

    case constants.DIMENSION_VALUES_CHANGE:
      // update dimensionValues
      break;

    case constants.REQUEST_JSON:
      break;

    case constants.PROVIDERS_MISSING:
      // update dataset
      break;

    case constants.DATASETS_MISSING:
      // update dataset
      break;

    case constants.DIMENSIONS_MISSING:
      // update dimensionValues
      break;
  }
});



module.exports = store;