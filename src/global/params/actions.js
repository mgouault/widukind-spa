let Reflux = require('reflux');
let RefluxPromise = require('reflux-promise');
let Q = require('q');
let bluebird = require('bluebird');

Reflux.use(RefluxPromise(window.Promise));
Reflux.use(RefluxPromise(Q.Promise));
Reflux.use(RefluxPromise(bluebird))

let apiCall = require('../../helpers/apiCall');



let paramsActions = Reflux.createActions({
  'buildQS': {},
  'selectProvider': {},
  'selectDataset': {},
  'selectFrequency': {},
  'selectDimension': {},
  'selectDimensionvalue': {},
  'fetchProvider': {
    asyncResult: true
  },
  'fetchDataset': {
    asyncResult: true,
    shouldEmit: function (selectedProvider) {
      return (selectedProvider && !_.isEmpty(selectedProvider));
    }
  },
  'fetchFrequency': {
    asyncResult: true,
    shouldEmit: function (selectedDataset) {
      return (selectedDataset && !_.isEmpty(selectedDataset));
    }
  },
  'fetchDimension': {
    asyncResult: true,
    shouldEmit: function (selectedDataset) {
      return (selectedDataset && !_.isEmpty(selectedDataset));
    }
  }
});

paramsActions.fetchProvider.listenAndPromise(function () {
  return apiCall({
    'pathname': '/provider',
    'query': {}
  });
});

paramsActions.fetchDataset.listenAndPromise(function (selectedProvider) {
  return apiCall({
    'pathname': '/dataset',
    'query': {'provider': selectedProvider}
  });
});

paramsActions.fetchFrequency.listenAndPromise(function (selectedDataset) {
  return apiCall({
    'pathname': '/frequency',
    'query': {'dataset': selectedDataset}
  });
});

paramsActions.fetchDimension.listenAndPromise(function (selectedDataset) {
  return apiCall({
    'pathname': '/dimension',
    'query': {'dataset': selectedDataset}
  });
});

module.exports = paramsActions;
