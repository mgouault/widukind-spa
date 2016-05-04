var keyMirror = require('keymirror');

module.exports = keyMirror({
  PROVIDER: null,
  DATASET: null,
  DIMENSION: null,
  
  S_PROVIDERS: null,
  S_SELECTED_PROVIDER: null,
  S_PROVIDER_OBJ: null,
  S_SELECTED_DATASET: null,
  S_DATASET_OBJ: null,
  S_SELECTED_DIMENSIONS: null,
  S_SELECTED_DIMENSIONS_VALUES: null,
  
  PROVIDER_CHANGE: null,
  DATASET_CHANGE: null,
  DIMENSION_CHANGE: null,
  DIMENSION_VALUES_CHANGE: null,
  REQUEST_JSON: null
});
 