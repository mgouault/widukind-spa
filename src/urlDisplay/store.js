var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var dispatcher = require('../dispatcher');
var c = require('../constants');
var actions = require('../actions');
/* global io */
var ParamsStore = require('../params/store');



var CHANGE_EVENT = 'change';

var _statePattern = {};
_statePattern[c.selectedDataset] = '';
_statePattern[c.selectedDimensions] = [];
_statePattern[c.config] = {};

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
    _state[c.selectedDataset] = paramsState[c.selectedDataset];
    _state[c.selectedDimensions] = paramsState[c.selectedDimensions];
    self.emitChange();
  },

  init: function () {
    ParamsStore.addChangeListener(self.updateState);

    var socket = io();
    socket.on('urlChange', function (data) {
      actions[c.configUpdate](data);
    });
  },

  dispatchToken: dispatcher.register(function (action) {
    var data = action.data;
    switch (action.actionType) {
      case c.configUpdate:
        _state[c.config] = data;
        self.emitChange();
        break;
    }
  })

});



module.exports = store;
