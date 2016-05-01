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
    _apiCall(url)
      .then(function (data) {
        appDispatcher.dispatch({
          'actionType': appConstants.REQUEST_JSON,
          'json': data
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  },

  providersMissing: function () {
    _apiCall('http://widukind-api-dev.cepremap.org/api/v1/json/providers/keys')
      .then(function (data) {
        appDispatcher.dispatch({
          'actionType': appConstants.PROVIDERS_MISSING,
          'data': data
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  },

  datasetsMissing: function (providerSelected) {
    _apiCall('http://widukind-api-dev.cepremap.org/api/v1/json/providers/' + providerSelected + '/datasets/keys')
      .then(function (data) {
        appDispatcher.dispatch({
          'actionType': appConstants.DATASETS_MISSING,
          'data': data
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  },
  
  dimensionsMissing: function (datasetSelected) {
    _apiCall('http://widukind-api-dev.cepremap.org/api/v1/json/datasets/' + datasetSelected + '/dimensions')
      .then(function (data) {
        appDispatcher.dispatch({
          'actionType': appConstants.DIMENSIONS_MISSING,
          'data': data
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  
};

function _apiCall (url) {
  return axios.get(url)
    .then(function (received) {
      received = received.data;
      var error = _.get(received, 'error');
      if (error) {
        throw new Error(error.toString());
      }
      return received.data;
    });
}

module.exports = appActions;