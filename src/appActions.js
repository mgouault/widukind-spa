var _ = require('lodash');

var appDispatcher = require('./appDispatcher');
var appConstants = require('./appConstants');

var appActions = module.exports = {

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
    for (var i = 0; i < options.length ; i++) {
      if (options[i].selected) {
        var name = options[i].value;
        dimensionsSelected.push(name);
        dimensionsObjSelected.push({
          'name': name,
          'value': _.get(_.find(dimensions, {'name': name}), 'value')
        });
      }
    }
    appDispatcher.dispatch({
      'actionType': appConstants.DIMENSIONS_CHANGE,
      'value1': dimensionsSelected,
      'value2': dimensionsObjSelected
    });
  },
  
  dimensionsValueChange: function (event, dimension) {
    var options = event.target.options;
    var dimensionsObjSelected = this.state.dimensionsObjSelected;
    var values = [];
    for (var i = 0; i < options.length ; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    var index = _.findIndex(dimensionsObjSelected, {'name': dimension});
    dimensionsObjSelected[index].selected = values;
    appDispatcher.dispatch({
      'actionType': appConstants.DIMENSIONS_VALUES_CHANGE,
      'value2': dimensionsObjSelected
    });
  }
  
};