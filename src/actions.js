var dispatcher = require('./dispatcher');
var constants = require('./constants');
var apiCall = require('./apiCall');

var actions = {};

actions[constants.PROVIDER_CHANGE] = function (event) {
  dispatcher.dispatch({
    'actionType': constants.PROVIDER_CHANGE,
    'data': event.target.value
  });
};

actions[constants.DATASET_CHANGE] = function (event) {
  dispatcher.dispatch({
    'actionType': constants.DATASET_CHANGE,
    'data': event.target.value
  });
};

actions[constants.DIMENSION_CHANGE] = function (event) {
  dispatcher.dispatch({
    'actionType': constants.DIMENSION_CHANGE,
    'data': event.target.options
  });
};

actions[constants.DIMENSION_VALUES_CHANGE] = function (event, dimensionName) {
  dispatcher.dispatch({
    'actionType': constants.DIMENSION_VALUES_CHANGE,
    'data': event.target.options,
    'data_': dimensionName
  });
};

actions[constants.REQUEST_JSON] = function (url) {
  apiCall(url).then(function (data) {
    dispatcher.dispatch({
      'actionType': constants.REQUEST_JSON,
      'data': data
    });
  });
};

module.exports = actions;