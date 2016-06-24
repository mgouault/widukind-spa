var Reflux = require('reflux');
var RefluxPromise = require('reflux-promise');
var Q = require('q');
var bluebird = require('bluebird');

Reflux.use(RefluxPromise(window.Promise));
Reflux.use(RefluxPromise(Q.Promise));
Reflux.use(RefluxPromise(bluebird))

var c = require('./constants');
var apiCall = require('../../helpers/apiCall');

var actions = Reflux.createActions([
  c.requestSeries,
  c.selectRow,
  c.selectRowAll
]);

actions[c.requestSeries] = Reflux.createAction({
  asyncResult: true,
  shouldEmit: function (state) {
    return (state[c.selectedDataset] && !_.isEmpty(state[c.selectedDataset]));
  }
});
actions[c.requestSeries].listenAndPromise(function (state) {
  var controls = _.cloneDeep(state[c.selectedDimensions]);
  controls.push({
    'name': 'frequency',
    'selected': state[c.selectedFrequencies]
  });
  return apiCall({
    'pathname': '/series',
    'query': {
      'dataset': state[c.selectedDataset],
      'controls': controls
    }
  });
});

module.exports = actions;
