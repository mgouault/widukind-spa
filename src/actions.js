var Reflux = require('reflux');
var c = require('./constants');

module.exports = Reflux.createActions([
  c.providersMissing,
  c.datasetsMissing,
  c.dimensionsMissing,
  c.changeProvider,
  c.changeDataset,
  c.changeDimensions,
  c.changeDimensionValues,
  c.requestSeries,
  c.updateConfig,
  c.displayLog,
  c.selectRow
]);
