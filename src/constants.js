var keyMirror = require('keymirror');

module.exports = keyMirror({
  S_PROVIDERS: null,
  S_SELECTED_PROVIDER: null,
  S_DATASETS: null,
  S_SELECTED_DATASET: null,
  S_DIMENSIONS: null,
  S_SELECTED_DIMENSIONS: null,
  S_SERIES: null,
  S_LOG: null,
  S_LOG_DISPLAYED: null,

  PROVIDER_CHANGE: null,
  DATASET_CHANGE: null,
  DIMENSIONS_CHANGE: null,
  DIMENSION_VALUES_CHANGE: null,
  REQUEST_SERIES: null,
  CONFIG_UPDATE: null,
  DISPLAY_LOG: null,
  SELECT_ROW: null
});
