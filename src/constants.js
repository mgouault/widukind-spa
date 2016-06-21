var keyMirror = require('keymirror');

var constants = keyMirror({
  providers: null,
  selectedProvider: null,
  datasets: null,
  selectedDataset: null,
  frequencies: null,
  selectedFrequencies: null,
  dimensions: null,
  selectedDimensions: null,
  series: null,
  log: null,
  logDisplayed: null,
  config: null,
  loading: null,

  providersMissing: null,
  datasetsMissing: null,
  frequenciesMissing: null,
  dimensionsMissing: null,
  changeProvider: null,
  changeDataset: null,
  changeFrequencies: null,
  changeDimensions: null,
  changeDimensionValues: null,
  requestSeries: null,
  requestValues: null,
  updateConfig: null,
  displayLog: null,
  selectRow: null,
  selectRowAll: null
});

module.exports = constants;
