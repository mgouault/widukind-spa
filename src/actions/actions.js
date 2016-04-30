var _ = require('lodash');
var axios = require('axios');

var appDispatcher = require('./../dispatcher/dispatcher');
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
  
  dimensionsChange: function (event, dimensions, dimensionsObjSelected) {
    var options = event.target.options;
    var dimensionsSelected = [];
    _.remove(dimensionsObjSelected, function (el) {
      return !_.find(options, {'value': el.name, 'selected': true});
    });
    _.forEach(options, function (el) {
       if (el.selected) {
        var name = el.value;
        dimensionsSelected.push(name);
        if (!_.find(dimensionsObjSelected, {'name': name})) {
          dimensionsObjSelected.push({
            'name': name,
            'value': _.get(_.find(dimensions, {'name': name}), 'value')
          });
        }
      }
    });
    dimensionsSelected.sort();
    dimensionsObjSelected.sort(function (a, b) {
      if (a.name < b.name)
        return -1;
      else if (a.name > b.name)
        return 1;
      else
        return 0;
    });
    appDispatcher.dispatch({
      'actionType': appConstants.DIMENSIONS_CHANGE,
      'value1': dimensionsSelected,
      'value2': dimensionsObjSelected
    });
  },
  
  dimensionValueChange: function (event, dimensionName, dimensionsObjSelected) {
    var options = event.target.options;
    var values = [];
    _.forEach(options, function (el) {
      if (el.selected) {
        values.push(el.value);
      }
    });
    var index = _.findIndex(dimensionsObjSelected, {'name': dimensionName});
    if (index < 0) {
      return;
    }
    dimensionsObjSelected[index].selected = values;
    appDispatcher.dispatch({
      'actionType': appConstants.DIMENSION_VALUES_CHANGE,
      'value2': dimensionsObjSelected
    });
  },

  requestJSON: function (url) {
    axios.get(url)
      .then(function (received) {
        received = received.data;
        if (_.has(received, 'error')) {
          console.error(url, received.error.toString());
        } else {
          appDispatcher.dispatch({
            'actionType': appConstants.REQUEST_JSON,
            'json': received.data
          });
        }
      })
      .catch(function (xhr, status, err) {
        console.error(url, status, err.toString());
      });
  }
  
};

module.exports = appActions;