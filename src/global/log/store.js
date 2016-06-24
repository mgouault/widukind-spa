var _ = require('lodash');
var Reflux = require('reflux');

var c = require('./constants');
var actions = require('./actions');

var pattern = {};
pattern[c.log] = [];
pattern[c.logDisplayed] = false;



var store = Reflux.createStore({
  listenables: [actions],
  getInitialState: function () {
    this.state = _.cloneDeep(pattern);
    return this.state;
  },
  refresh: function () {
    this.trigger(this.state);
  },

  onDisplayLog: function (data) {
    this.state[c.logDisplayed] = !this.state[c.logDisplayed];
    this.refresh();
  }
});

module.exports = store;
