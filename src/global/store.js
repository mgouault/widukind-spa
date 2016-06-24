var _ = require('lodash');
var Reflux = require('reflux');

var c = require('./constants');
var actions = require('./actions');
var apiCall = require('../helpers/apiCall');

var pattern = {};



var store = Reflux.createStore({
  listenables: [actions],
  getInitialState: function () {
    this.state = _.cloneDeep(pattern);
    return this.state;
  },
  refresh: function () {
    this.trigger(this.state);
  }
});

module.exports = store;
