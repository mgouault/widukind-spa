var _ = require('lodash');
var Reflux = require('reflux');

var c = require('../constants');
var actions = require('../actions');
var paramsStore = require('../params/store');
var apiCall = require('../apiCall');

var pattern = {};
pattern[c.series] = [];
pattern[c.log] = [];
pattern[c.logDisplayed] = false;



var store = Reflux.createStore({
  listenables: [actions],

  getInitialState: function () {
    this.state = _.cloneDeep(pattern);
    return this.state;
  },

  init: function () {
    this.listenTo(paramsStore, actions[c.requestSeries]);
  },

  onRequestSeriesFailed: console.error,
  onRequestSeriesCompleted: function (data) {
    if (!_.isEmpty(data)) {
      this.state[c.log] = JSON.stringify(data, null, 2)
        + '\n -------------------- \n'
        + this.state[c.log];
    }
    this.state[c.series] = data;
    this.trigger(this.state);
  },

  onSelectRow: function (data) {
    var index = _.findIndex(this.state[c.series], {'key': data});
    var serie = this.state[c.series][index];
    serie['checked'] = !serie['checked'];
    this.state[c.series][index] = serie;
    this.trigger(this.state);
  },

  onRequestValuesFailed: console.error,
  onRequestValuesCompleted: function (data) {
    var index = _.findIndex(this.state[c.series], {'key': data['key']});
    var serie = this.state[c.series][index];
    serie['values'] = _.get(data, 'values');
    this.state[c.series][index] = serie;
    this.trigger(this.state);
  },

  onDisplayLog: function (data) {
    this.state[c.logDisplayed] = !this.state[c.logDisplayed];
    this.trigger(this.state);
  }

});

module.exports = store;
