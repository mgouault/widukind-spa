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
pattern[c.loading] = [];



var store = Reflux.createStore({
  listenables: [actions],
  getInitialState: function () {
    this.state = _.cloneDeep(pattern);
    return this.state;
  },
  init: function () {
    this.listenTo(paramsStore, actions[c.requestSeries]);
  },
  refresh: function () {
    this.trigger(this.state);
  },

  load: function (key) {
    this.state[c.loading].push(key);
  },
  unload: function (key) {
    var index = this.state[c.loading].indexOf(key);
    this.state[c.loading].splice(index, 1);
  },

  onRequestSeries: function () {
    this.load('series');
    this.refresh();
  },
  onRequestSeriesFailed: console.error,
  onRequestSeriesCompleted: function (data) {
    this.unload('series');
    if (!_.isEmpty(data)) {
      this.state[c.log] = JSON.stringify(data, null, 2)
        + '\n -------------------- \n'
        + this.state[c.log];
    }
    this.state[c.series] = data;
    this.refresh();
  },

  onSelectRow: function (data) {
    var index = _.findIndex(this.state[c.series], {'key': data});
    var serie = this.state[c.series][index];
    serie['checked'] = !serie['checked'];
    this.state[c.series][index] = serie;
    this.refresh();
  },

  onRequestValues: function () {
    this.load('values');
    this.refresh();
  },
  onRequestValuesFailed: console.error,
  onRequestValuesCompleted: function (data) {
    this.unload('values');
    var index = _.findIndex(this.state[c.series], {'key': data['key']});
    var serie = this.state[c.series][index];
    serie['values'] = _.get(data, 'values');
    this.state[c.series][index] = serie;
    this.refresh();
  },

  onDisplayLog: function (data) {
    this.state[c.logDisplayed] = !this.state[c.logDisplayed];
    this.refresh();
  }

});

module.exports = store;
