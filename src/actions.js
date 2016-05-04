var dispatcher = require('./dispatcher');
var c = require('./constants');
var apiCall = require('./apiCall');

var actions = {};

actions[c.PROVIDER_CHANGE] = function (event) {
  dispatcher.dispatch({
    'actionType': c.PROVIDER_CHANGE,
    'data': event.target.value
  });
};

actions[c.DATASET_CHANGE] = function (event) {
  dispatcher.dispatch({
    'actionType': c.DATASET_CHANGE,
    'data': event.target.value
  });
};

actions[c.DIMENSION_CHANGE] = function (event) {
  dispatcher.dispatch({
    'actionType': c.DIMENSION_CHANGE,
    'data': event.target.options
  });
};

actions[c.DIMENSION_VALUES_CHANGE] = function (event, dimensionName) {
  dispatcher.dispatch({
    'actionType': c.DIMENSION_VALUES_CHANGE,
    'data': event.target.options,
    'data_': dimensionName
  });
};

actions[c.REQUEST_JSON] = function (url) {
  dispatcher.dispatch({
    'actionType': c.REQUEST_JSON
  });
  apiCall(url).then(function (data) {
    dispatcher.dispatch({
      'actionType': c.REQUEST_JSON,
      'data': data
    });
  });
};

module.exports = actions;