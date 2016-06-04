var dispatcher = require('./dispatcher');
var c = require('./constants');

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

actions[c.CONFIG_UPDATE] = function (config) {
  dispatcher.dispatch({
    'actionType': c.CONFIG_UPDATE,
    'data': config
  });
};

actions[c.DISPLAY_LOG] = function () {
  dispatcher.dispatch({
    'actionType': c.DISPLAY_LOG
  });
};

module.exports = actions;