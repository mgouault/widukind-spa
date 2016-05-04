var React = require('react');
var _ = require('lodash');

var constants = require('../../../constants');
var CustomSelect = require('./CustomSelect.jsx');
var DimensionsBox = require('./DimensionsBox.jsx');



var ParamsBox = React.createClass({
  
  render: function () {
    var toRender = [];
    
    var callbacksAreFun = function (name, toReturn, multiple, data) {
      if (_.isEmpty(data) && typeof data !== 'undefined') {
        return;
      }
      var value;
      switch (name) {
        case constants.PROVIDER:
          value = this.props.obj[constants.S_SELECTED_PROVIDER]; break;
        case constants.DATASET:
          value = this.props.obj[constants.S_SELECTED_DATASET]; break;
        case constants.DIMENSION:
          value = this.props.obj[constants.S_SELECTED_DIMENSIONS]; break;
      }
      toRender.push(
        <CustomSelect
          key={name + 'Select'}
          name={name}
          data={data}
          value={value}
          multiple={multiple}
        />
      );
      return toReturn;
    }.bind(this);
    
    var data =
      callbacksAreFun(constants.DIMENSION, this.props.obj[constants.S_SELECTED_DIMENSIONS_VALUES], true,
        callbacksAreFun(constants.DATASET, this.props.obj[constants.S_DATASET_OBJ].value, false,
          callbacksAreFun(constants.PROVIDER, this.props.obj[constants.S_PROVIDER_OBJ].value, false,
            this.props.obj[constants.S_PROVIDERS]
          )
        )
      );
    
    if (!_.isEmpty(data)) {
      toRender.push(
        <DimensionsBox
          key="DimensionsBox"
          data={data}
        />
      );
    }

    return (
      <div>
        {toRender}
      </div>
    );
  }
});

module.exports = ParamsBox;