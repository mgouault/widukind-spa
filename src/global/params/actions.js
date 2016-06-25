let Reflux = require('reflux');
let RefluxPromise = require('reflux-promise');
let Q = require('q');
let bluebird = require('bluebird');

Reflux.use(RefluxPromise(window.Promise));
Reflux.use(RefluxPromise(Q.Promise));
Reflux.use(RefluxPromise(bluebird))

let apiCall = require('../../helpers/apiCall');

let paramsActions = Reflux.createActions([
  'selectProvider',
  'selectDataset',
  'selectFrequency',
  'selectDimension',
  'selectDimensionvalue'
]);
//todo: create in [] with {asyncResult: true}
paramsActions.fetchProvider = Reflux.createAction({ asyncResult: true });
paramsActions.fetchProvider.listenAndPromise(function () {
  return apiCall({
    'pathname': '/provider',
    'query': {}
  });
});

paramsActions.fetchDataset = Reflux.createAction({
  asyncResult: true,
  shouldEmit: function (selectedProvider) {
    return (selectedProvider && !_.isEmpty(selectedProvider));
  }
});
paramsActions.fetchDataset.listenAndPromise(function (selectedProvider) {
  return apiCall({
    'pathname': '/dataset',
    'query': {'provider': selectedProvider}
  });
});

paramsActions.fetchFrequency = Reflux.createAction({
  asyncResult: true,
  shouldEmit: function (selectedDataset) {
    return (selectedDataset && !_.isEmpty(selectedDataset));
  }
});
paramsActions.fetchFrequency.listenAndPromise(function (selectedDataset) {
  return apiCall({
    'pathname': '/frequency',
    'query': {'dataset': selectedDataset}
  });
});

paramsActions.fetchDimension = Reflux.createAction({
  asyncResult: true,
  shouldEmit: function (selectedDataset) {
    return (selectedDataset && !_.isEmpty(selectedDataset));
  }
}); // todo: }).listenAndPromise(function
paramsActions.fetchDimension.listenAndPromise(function (selectedDataset) {
  return apiCall({
    'pathname': '/dimension',
    'query': {'dataset': selectedDataset}
  });
});

module.exports = paramsActions;
