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

  onRequestValues: function () {
    this.load('values');
    this.refresh();
  },
  onRequestValuesFailed: console.error,
  onRequestValuesCompleted: function (data) {
    this.unload('values');
    if (!_.isEmpty(data)) {
      this.state[c.log] = JSON.stringify(data, null, 2)
        + '\n -------------------- \n'
        + this.state[c.log];
    }
    var index = _.findIndex(this.state[c.series], {'key': data['key']});
    var serie = this.state[c.series][index];
    serie['values'] = _.get(data, 'values');
    this.state[c.series][index] = serie;
    this.refresh();
  }
});

module.exports = store;
