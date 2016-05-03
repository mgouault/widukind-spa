var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var dispatcher = require('../dispatcher/dispatcher');
var constants = require('../constants/constants');
var actions = require('../actions/actions');



var CHANGE_EVENT = 'change';

var _dataObj = {
  'loading': []
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
      break;

    case constants.DATASET_CHANGE:
      break;

    case constants.DIMENSIONS_CHANGE:
      break;

    case constants.DIMENSION_VALUES_CHANGE:
      break;

    case constants.REQUEST_JSON:
      break;

    case constants.PROVIDERS_MISSING:
      break;

    case constants.DATASETS_MISSING:
      break;

    case constants.DIMENSIONS_MISSING:
      break;
  }
});



module.exports = store;