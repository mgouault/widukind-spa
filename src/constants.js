var keyMirror = require('keymirror');

module.exports = keyMirror({
  providers: null,
  selectedProvider: null,
  datasets: null,
  selectedDataset: null,
  dimensions: null,
  selectedDimensions: null,
  series: null,
  log: null,
  logDisplayed: null,
  config: null,

  providersMissing: null,
  datasetsMissing: null,
  dimensionsMissing: null,
  changeProvider: null,
  changeDataset: null,
  changeDimensions: null,
  changeDimensionValues: null,
  requestSeries: null,
  updateConfig: null,
  displayLog: null,
  selectRow: null
});
