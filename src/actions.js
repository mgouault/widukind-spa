var dispatcher = require('./dispatcher');
var c = require('./constants');
var apiCall = require('./apiCall');

var actions = {};

actions[c.PROVIDER_CHANGE] = function (event) {
  dispatcher.dispatch({
    'actionType': c.PROVIDER_CHANGE,
    'data': event
  });
};

actions[c.DATASET_CHANGE] = function (event) {
  dispatcher.dispatch({
    'actionType': c.DATASET_CHANGE,
    'data': event
  });
};

actions[c.DIMENSIONS_CHANGE] = function (event) {
  dispatcher.dispatch({
    'actionType': c.DIMENSIONS_CHANGE,
    'data': event
  });
};

actions[c.DIMENSION_VALUES_CHANGE] = function (event, dimensionName) {
  dispatcher.dispatch({
    'actionType': c.DIMENSION_VALUES_CHANGE,
    'data': event,
    'dimensionName': dimensionName
  });
};

actions[c.REQUEST_JSON] = function (dataset, controls) {
  dispatcher.dispatch({
    'actionType': c.REQUEST_JSON
  });
  apiCall({
    'pathname': '/json',
    'query': {
      'dataset': dataset,
      'controls': controls
    }
  }).then(function (data) {
    dispatcher.dispatch({
      'actionType': c.REQUEST_JSON,
      'data': data
    });
  });
};

module.exports = actions;