var _ = require('lodash');
var axios = require('axios');

var appDispatcher = require('../dispatcher/dispatcher');
var appConstants = require('./../constants/constants');

var appActions = {

	providerChange: function (event) {
    appDispatcher.dispatch({
      'actionType': appConstants.PROVIDER_CHANGE,
      'value': event.target.value
    });
  },
  
  datasetChange: function (event) {
    appDispatcher.dispatch({
      'actionType': appConstants.DATASET_CHANGE,
      'value': event.target.value
    });
  },
  
  dimensionsChange: function (event) {
    appDispatcher.dispatch({
      'actionType': appConstants.DIMENSIONS_CHANGE,
      'options': event.target.options
    });
  },
  
  dimensionValueChange: function (event, dimensionName) {
    appDispatcher.dispatch({
      'actionType': appConstants.DIMENSION_VALUES_CHANGE,
      'options': event.target.options,
      'dimensionName': dimensionName
    });
  },

  requestJSON: function (url) {
    axios.get(url)
      .then(function (received) {
        received = received.data;
        var error = _.get(received, 'error');
        if (error) {
          throw new Error(error.toString());
        }
        appDispatcher.dispatch({
          'actionType': appConstants.REQUEST_JSON,
          'json': received.data
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  
};

module.exports = appActions;