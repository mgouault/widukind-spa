let Reflux = require('reflux');
let RefluxPromise = require('reflux-promise');
let Q = require('q');
let bluebird = require('bluebird');

Reflux.use(RefluxPromise(window.Promise));
Reflux.use(RefluxPromise(Q.Promise));
Reflux.use(RefluxPromise(bluebird))

let apiCall = require('../../helpers/apiCall');

let actions = Reflux.createActions([
  'selectProvider',
  'selectDataset',
  'selectFrequency',
  'selectDimension',
  'selectDimensionValue'
]);
//todo: create in [] with {asyncResult: true}
actions.fetchProvider = Reflux.createAction({ asyncResult: true });
actions.fetchProvider.listenAndPromise(function () {
  return apiCall({
    'pathname': '/provider',
    'query': {}
  });
});

actions.fetchDataset = Reflux.createAction({
  asyncResult: true,
  shouldEmit: function (selectedProvider) {
    return (selectedProvider && !_.isEmpty(selectedProvider));
  }
});
actions.fetchDataset.listenAndPromise(function (selectedProvider) {
  return apiCall({
    'pathname': '/dataset',
    'query': {'provider': selectedProvider}
  });
});

actions.fetchFrequency = Reflux.createAction({
  asyncResult: true,
  shouldEmit: function (selectedDataset) {
    return (selectedDataset && !_.isEmpty(selectedDataset));
  }
});
actions.fetchFrequency.listenAndPromise(function (selectedDataset) {
  return apiCall({
    'pathname': '/frequency',
    'query': {'dataset': selectedDataset}
  });
});

actions.fetchDimension = Reflux.createAction({
  asyncResult: true,
  shouldEmit: function (selectedDataset) {
    return (selectedDataset && !_.isEmpty(selectedDataset));
  }
}); // todo: }).listenAndPromise(function
actions.fetchDimension.listenAndPromise(function (selectedDataset) {
  return apiCall({
    'pathname': '/dimension',
    'query': {'dataset': selectedDataset}
  });
});

module.exports = actions;
