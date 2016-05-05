var React = require('react');
var _ = require('lodash');
import { Well } from 'react-bootstrap';

var c = require('../../../constants');
var CustomSelect = require('./CustomSelect.jsx');
var DimensionsBox = require('./DimensionsBox.jsx');



var ParamsBox = React.createClass({
  
  render: function () {
    var toRender = [];
    var state = this.props.obj;
    
    var callbacksAreFun = function (key, multiple, callback) {
      var data = state[key];
      if (_.isEmpty(data) && typeof data !== 'undefined') {
        return;
      }
      var value;
      switch (key) {
        case c.S_PROVIDERS:
          value = state[c.S_SELECTED_PROVIDER];
          break;
        case c.S_DATASETS:
          value = state[c.S_SELECTED_DATASET];
          break;
        case c.S_DIMENSIONS:
          value = _.map(state[c.S_SELECTED_DIMENSIONS], function (obj) {
            return obj.name
          });
          break;
      }
      toRender.push(
        <CustomSelect
          key={key + 'Select'}
          name={key}
          data={data}
          value={value}
          multiple={multiple}
        />
      );
      callback();
    };
    
    callbacksAreFun(c.S_PROVIDERS, false, function () {
      callbacksAreFun(c.S_DATASETS, false, function () {
        callbacksAreFun(c.S_DIMENSIONS, true, function () {
          var data = state[c.S_SELECTED_DIMENSIONS];
          if (_.isEmpty(data) && typeof data !== 'undefined') {
            return;
          }
          toRender.push(
            <DimensionsBox
              key="DimensionsBox"
              data={data}
            />
          );
        });
      });
    });

    return (
      <Well>
        {toRender}
      </Well>
    );
  }
});

module.exports = ParamsBox;