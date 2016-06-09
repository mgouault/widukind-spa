var _ = require('lodash');
var Reflux = require('reflux');
/* global io */
var socket = io();

var c = require('../constants');
var actions = require('../actions');
var paramsStore = require('../params/store');

var pattern = {};
pattern[c.selectedDataset] = '';
pattern[c.selectedDimensions] = [];
pattern[c.config] = {};



var store = Reflux.createStore({
  listenables: [actions],
  
  getInitialState: function () {
    this.state = _.cloneDeep(pattern);
    return this.state;
  },

  init: function () {
    socket.on('urlChange', actions[c.updateConfig]);
    this.listenTo(paramsStore, this.paramsStoreUpdate);
  },

  paramsStoreUpdate : function (paramsStoreState) {
    this.state[c.selectedDataset] = paramsStoreState[c.selectedDataset];
    this.state[c.selectedDimensions] = paramsStoreState[c.selectedDimensions];
    this.trigger(this.state);
  },

  onUpdateConfig: function (data) {
    this.state[c.config] = data;
    this.trigger(this.state);
  }

});



module.exports = store;
