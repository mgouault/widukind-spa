let Reflux = require('reflux');
let RefluxPromise = require('reflux-promise');
let Q = require('q');
let bluebird = require('bluebird');

Reflux.use(RefluxPromise(window.Promise));
Reflux.use(RefluxPromise(Q.Promise));
Reflux.use(RefluxPromise(bluebird))

let getData = require('../getData');



let paramsActions = Reflux.createActions({
  'buildQuery': {},
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

paramsActions.fetchProvider.listenAndPromise(() => {
  return getData({
    'pathname': '/providers/keys',
    'query': {}
  });
});

paramsActions.fetchDataset.listenAndPromise((selectedProvider) => {
  return getData({
    'pathname': '/providers/' + selectedProvider + '/datasets/keys',
    'query': {}
  });
});

paramsActions.fetchFrequency.listenAndPromise((selectedDataset) => {
  return getData({
    'pathname': '/datasets/' + selectedDataset + '/frequencies',
    'query': {}
  });
});

paramsActions.fetchDimension.listenAndPromise((selectedDataset) => {
  return getData({
    'pathname': '/datasets/' + selectedDataset + '/dimensions',
    'query': {}
  });
});

module.exports = paramsActions;
