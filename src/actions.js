var Reflux = require('reflux');
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
  c.selectRow
]);

actions[c.providersMissing] = Reflux.createAction({
  asyncResult: true,
  preEmit: function (state) {
    return apiCall({
      'pathname': '/providers',
      'query': {}
    });
  }
});

actions[c.datasetsMissing] = Reflux.createAction({
  asyncResult: true,
  preEmit: function (state) {
    var selectedProvider = state[c.selectedProvider]
    if (!selectedProvider || _.isEmpty(selectedProvider)) {
      return Promise.reject();
    }
    return apiCall({
      'pathname': '/datasets',
      'query': {'provider': selectedProvider}
    });
  }
});

actions[c.dimensionsMissing] = Reflux.createAction({
  asyncResult: true,
  preEmit: function (state) {
    var selectedDataset = state[c.selectedDataset]
    if (!selectedDataset || _.isEmpty(selectedDataset)) {
      return Promise.reject();
    }
    return apiCall({
      'pathname': '/dimensions',
      'query': {'dataset': selectedDataset}
    });
  }
});

module.exports = actions;
