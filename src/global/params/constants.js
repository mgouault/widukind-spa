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

  providersMissing: null,
  datasetsMissing: null,
  frequenciesMissing: null,
  dimensionsMissing: null,
  changeProvider: null,
  changeDataset: null,
  changeFrequencies: null,
  changeDimensions: null,
  changeDimensionValues: null
});

module.exports = constants;
