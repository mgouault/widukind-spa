var React = require('react');
var _ = require('lodash');

var c = require('../../../constants');
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
        case c.PROVIDER:
          value = this.props.obj[c.S_SELECTED_PROVIDER]; break;
        case c.DATASET:
          value = this.props.obj[c.S_SELECTED_DATASET]; break;
        case c.DIMENSION:
          value = this.props.obj[c.S_SELECTED_DIMENSIONS]; break;
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
      callbacksAreFun(c.DIMENSION, this.props.obj[c.S_SELECTED_DIMENSIONS_VALUES], true,
        callbacksAreFun(c.DATASET, this.props.obj[c.S_DATASET_OBJ].value, false,
          callbacksAreFun(c.PROVIDER, this.props.obj[c.S_PROVIDER_OBJ].value, false,
            this.props.obj[c.S_PROVIDERS]
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