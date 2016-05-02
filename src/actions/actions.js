var _ = require('lodash');
var axios = require('axios');

var dispatcher = require('../dispatcher/dispatcher');
var constants = require('./../constants/constants');



var actions = {

	providerChange: function (event) {
    _dispatch(constants.PROVIDER_CHANGE)(event.target.value);
  },
  
  datasetChange: function (event) {
    _dispatch(constants.DATASET_CHANGE)(event.target.value);
  },
  
  dimensionsChange: function (event) {
    _dispatch(constants.DIMENSIONS_CHANGE)(event.target.options);
  },
  
  dimensionValueChange: function (event, dimensionName) {
    _dispatch(constants.DIMENSION_VALUES_CHANGE)(event.target.options, dimensionName);
  },

  requestJSON: function (url) {
    _apiCall(url)
      .then(_dispatch(constants.REQUEST_JSON));
  },

  providersMissing: function () {
    _apiCall('http://widukind-api-dev.cepremap.org/api/v1/json/providers/keys')
      .then(_dispatch(constants.PROVIDERS_MISSING));
  },

  datasetsMissing: function (providerSelected) {
    if (_.isEmpty(providerSelected)) {
      return;
    }
    _apiCall('http://widukind-api-dev.cepremap.org/api/v1/json/providers/' + providerSelected + '/datasets/keys')
      .then(_dispatch(constants.DATASETS_MISSING));
  },
  
  dimensionsMissing: function (datasetSelected) {
    if (_.isEmpty(datasetSelected)) {
      return;
    }
    _apiCall('http://widukind-api-dev.cepremap.org/api/v1/json/datasets/' + datasetSelected + '/dimensions')
      .then(_dispatch(constants.DIMENSIONS_MISSING));
  }
  
};



function _dispatch (constant) {
  return function (data, data2) {
    dispatcher.dispatch({
      'actionType': constant,
      'data': data,
      'data2': data2
    });
  }
}

function _apiCall (url) {
  return axios.get(url)
    .then(function (received) {
      received = received.data;
      var error = _.get(received, 'error');
      if (error) {
        throw new Error(error.toString());
      }
      return received.data;
    })
    .catch(function (error) {
      console.error(error);
    });
}

module.exports = actions;