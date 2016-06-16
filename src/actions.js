var Reflux = require('reflux');
var RefluxPromise = require('reflux-promise');
var Q = require('q');
var bluebird = require('bluebird');

Reflux.use(RefluxPromise(window.Promise));
Reflux.use(RefluxPromise(Q.Promise));
Reflux.use(RefluxPromise(bluebird))

var c = require('./constants');
var apiCall = require('./apiCall');

var actions = Reflux.createActions([
  c.changeProvider,
  c.changeDataset,
  c.changeDimensions,
  c.changeDimensionValues,
  c.requestSeries,
  c.updateConfig,
  c.displayLog,
  c.selectRow,
  c.selectRowAll
]);

actions[c.providersMissing] = Reflux.createAction({ asyncResult: true });
actions[c.providersMissing].listenAndPromise(function (state) {
  return apiCall({
    'pathname': '/providers',
    'query': {}
  });
});

actions[c.datasetsMissing] = Reflux.createAction({
  asyncResult: true,
  shouldEmit: function (state) {
    return (state[c.selectedProvider] && !_.isEmpty(state[c.selectedProvider]));
  }
 });
actions[c.datasetsMissing].listenAndPromise(function (state) {
  return apiCall({
    'pathname': '/datasets',
    'query': {'provider': state[c.selectedProvider]}
  });
});

actions[c.dimensionsMissing] = Reflux.createAction({
  asyncResult: true,
  shouldEmit: function (state) {
    return (state[c.selectedDataset] && !_.isEmpty(state[c.selectedDataset]));
  }
});
actions[c.dimensionsMissing].listenAndPromise(function (state) {
  return apiCall({
    'pathname': '/dimensions',
    'query': {'dataset': state[c.selectedDataset]}
  });
});

actions[c.requestSeries] = Reflux.createAction({
  asyncResult: true,
  shouldEmit: function (state) {
    return (state[c.selectedDataset] && !_.isEmpty(state[c.selectedDataset]));
  }
});
actions[c.requestSeries].listenAndPromise(function (state) {
  return apiCall({
    'pathname': '/series',
    'query': {
      'dataset': state[c.selectedDataset],
      'controls': state[c.selectedDimensions]
    }
  });
});

actions[c.requestValues] = Reflux.createAction({ asyncResult: true });
actions[c.requestValues].listenAndPromise(function (slug) {
  return apiCall({
    'pathname': '/values',
    'query': {'slug': slug}
  });
});

module.exports = actions;
