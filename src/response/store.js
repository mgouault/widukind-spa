var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var dispatcher = require('../dispatcher');
var c = require('../constants');



var CHANGE_EVENT = 'change';

var _state = {
  'json': []
};



var store = _.assign({}, EventEmitter.prototype, {

  getState: function () {
    return _state;
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
  var data = action.data;
  
  switch (action.actionType) {
    case c.REQUEST_JSON:
      _state.json = data;
      break;
    default:
      return;
  }

  store.emitChange();
});

module.exports = store;