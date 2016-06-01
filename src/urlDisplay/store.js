var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var dispatcher = require('../dispatcher');
var c = require('../constants');
var actions = require('../actions');
/* global io */
var ParamsStore = require('../params/store');



var CHANGE_EVENT = 'change';

var _statePattern = {};
_statePattern[c.S_DATASETS] = [];
_statePattern[c.S_DIMENSIONS] = [];
_statePattern['config'] = {};

var _state = _.cloneDeep(_statePattern);



var store = _.assign({}, EventEmitter.prototype);
var self = store;
store = _.assign(store, {

  /* Store methods */
  getState: function () {
    return _state;
  },
  emitChange: function () {
    self.emit(CHANGE_EVENT);
  },
  addChangeListener: function (callback) {
    self.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
    self.removeListener(CHANGE_EVENT, callback);
  },
  /**/

  connect: function () {
    var socket = io();
    socket.on('urlChange', function (data) {
      actions[c.CONFIG_UPDATE](data);
    });
  },

  dispatchToken: dispatcher.register(function (action) {
    var data = action.data;
    switch (action.actionType) {

      case c.PROVIDER_CHANGE || c.DATASET_CHANGE || c.DIMENSIONS_CHANGE || c.DIMENSION_VALUES_CHANGE:
        dispatcher.waitFor([ParamsStore.dispatchToken]);
        var paramsState = ParamsStore.getState();
        _state['S_DATASETS'] = paramsState['S_DATASETS'];
        _state['S_DIMENSIONS'] = paramsState['S_DIMENSIONS'];
        store.emitChange();
        break;

      case c.CONFIG_UPDATE:
        _state['config'] = data;
        store.emitChange();
        break;

    }
  })
  
});



module.exports = store;