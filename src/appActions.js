var _ = require('lodash');

var appDispatcher = require('./appDispatcher');
var appConstants = require('./appConstants');

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
  
  dimensionsChange: function (event, dimensions) {
    var options = event.target.options;
    var dimensionsSelected = [];
    var dimensionsObjSelected = [];
    _.forEach(options, function (el) {
       if (el.selected) {
        var name = el.value;
        dimensionsSelected.push(name);
        dimensionsObjSelected.push({
          'name': name,
          'value': _.get(_.find(dimensions, {'name': name}), 'value')
        });
      }
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
    if (index === -1) {
      return;
    }
    dimensionsObjSelected[index].selected = values;
    appDispatcher.dispatch({
      'actionType': appConstants.DIMENSION_VALUES_CHANGE,
      'value2': dimensionsObjSelected
    });
  }
  
};

module.exports = appActions;