var _ = require('lodash');
var Reflux = require('reflux');

var c = require('./constants');
var actions = require('./actions');

var pattern = {};
pattern[c.series] = [];



var store = Reflux.createStore({
  listenables: [actions],
  getInitialState: function () {
    this.state = _.cloneDeep(pattern);
    return this.state;
  },
  refresh: function () {
    this.trigger(this.state);
  },

  onSelectRow: function (data) {
    var index = _.findIndex(this.state[c.series], {'key': data});
    var serie = this.state[c.series][index];
    serie['checked'] = !serie['checked'];
    this.state[c.series][index] = serie;
    this.refresh();
  },
  onSelectRowAll: function (data, checked) {
    _.forEach(this.state[c.series], function (el) {
      el['checked'] = checked;
    });
    this.refresh();
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
  }
});

module.exports = store;
