var _ = require('lodash');
var Reflux = require('reflux');
/* global io */
var socket = io();

var actions = require('./actions');
let globalActions = require('../actions');

var _state = {
  'config': {}
}



var store = Reflux.createStore({
  listenables: [actions, globalActions],
  getInitialState: function () {
    return _state;
  },
  init: function () {
    socket.on('urlChange', actions.updateConfig);
  },
  refresh: function () {
    this.trigger(_state);
  },

  onUpdateConfig: function (data) {
    _state['config'] = data;
    this.refresh();
  }
});

module.exports = store;
