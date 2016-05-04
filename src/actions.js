var dispatcher = require('./dispatcher');
var constants = require('./constants');
var apiCall = require('./apiCall');



var actions = {

	providerChange: function (event) {
    _dispatch(constants.PROVIDER_CHANGE)(event.target.value);
  },
  
  datasetChange: function (event) {
    _dispatch(constants.DATASET_CHANGE)(event.target.value);
  },
  
  dimensionChange: function (event) {
    _dispatch(constants.DIMENSION_CHANGE)(event.target.options);
  },
  
  dimensionValueChange: function (event, dimensionName) {
    _dispatch(constants.DIMENSION_VALUES_CHANGE)(event.target.options, dimensionName);
  },

  requestJSON: function (url) {
    apiCall(url)
      .then(_dispatch(constants.REQUEST_JSON));
  }
  
};



function _dispatch (constant) {
  return function (data, data_) {
    dispatcher.dispatch({
      'actionType': constant,
      'data': data,
      'data_': data_
    });
  }
}

module.exports = actions;