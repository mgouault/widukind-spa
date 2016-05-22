var React = require('react');
var _ = require('lodash');
import { FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
var Select = require('react-select');

var c = require('../../../constants');
var actions = require('../../../actions');



var DimensionConfig = React.createClass({

  getOptions: function () {
    return _.map(this.props.data, function (el) {
      return ({ 'value':el, 'label':el });
    });
  },

  onUserInput: function (event) {
    actions[c.DIMENSION_VALUES_CHANGE](event, this.props.name);
  },

  render: function () {
    if (_.isEmpty(this.props.data)) {
      return (<Alert key="dataNotFound" bsStyle="danger">Error: data not found</Alert>);
    }
    var options = this.getOptions();
    return (
      <div>
        Select {this.props.name}:
        <Select
          onChange={this.onUserInput}
          value={this.props.value}
          multi
          options={options}
        />
      </div>
    );
  }
});

var DimensionsBox = React.createClass({
  
  render: function () {
    if (_.isEmpty(this.props.data)) {
      return null;
    }
    var toRender = _.map(this.props.data, function (el) {
      return (<DimensionConfig
        key={el.name}
        data={el.value}
        name={el.name}
        value={el.selected}
      />);
    });
    return (
      <div>
        {toRender}
      </div>
    );
  }
});

module.exports = DimensionsBox;