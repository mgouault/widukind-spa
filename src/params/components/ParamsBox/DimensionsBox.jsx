var React = require('react');
var _ = require('lodash');
import { FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';

var c = require('../../../constants');
var actions = require('../../../actions');



var DimensionConfig = React.createClass({

  getOptions: function () {
    return _.map(this.props.data, function (el) {
      return (<option key={el} value={el}>{el}</option>);
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
      <FormGroup controlId={"formControlsSelectMultiple" + name}>
        <ControlLabel>Select {this.props.name}:</ControlLabel>
        <FormControl
          componentClass="select"
          onChange={this.onUserInput}
          value={this.props.value}
          multiple
        >
          {options}
        </FormControl>
      </FormGroup>
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