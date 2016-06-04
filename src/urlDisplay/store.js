var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var dispatcher = require('../dispatcher');
var c = require('../constants');
var actions = require('../actions');
/* global io */
var ParamsStore = require('../params/store');



var CHANGE_EVENT = 'change';

var _statePattern = {};
_statePattern[c.S_SELECTED_DATASET] = '';
_statePattern[c.S_SELECTED_DIMENSIONS] = [];
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

  updateState: function () {
    var paramsState = ParamsStore.getState();
    _state['S_SELECTED_DATASET'] = paramsState['S_SELECTED_DATASET'];
    _state['S_SELECTED_DIMENSIONS'] = paramsState['S_SELECTED_DIMENSIONS'];
    self.emitChange();
  },

  init: function () {
    ParamsStore.addChangeListener(self.updateState);

    var socket = io();
    socket.on('urlChange', function (data) {
      actions[c.CONFIG_UPDATE](data);
    });
  },

  dispatchToken: dispatcher.register(function (action) {
    var data = action.data;
    switch (action.actionType) {
      case c.CONFIG_UPDATE:
        _state['config'] = data;
        self.emitChange();
        break;
    }
  })
  
});



module.exports = store;