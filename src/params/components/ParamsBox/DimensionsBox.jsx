var React = require('react');
var _ = require('lodash');
import { FormGroup, ControlLabel, FormControl, Alert, Well } from 'react-bootstrap';

var actions = require('../../../actions');



var DimensionConfig = React.createClass({

  getOptions: function () {
    var options = [];
    _.forEach(this.props.data, function (name) {
      options.push(<option key={name} value={name}>{name}</option>);
    });
    return options;
  },

  onUserInput: function (event) {
    actions.dimensionValueChange(event, this.props.name);
  },

  render: function () {
    var name = this.props.name;
    
    // if (invalidData && forever) {
    //   return (<Alert key="dataNotFound" bsStyle="danger">Error: data not found</Alert>);
    // }

    var label = _.capitalize(name);
    var options = this.getOptions();
    return (
      <FormGroup controlId={"formControlsSelectMultiple" + name}>
        <ControlLabel>Select {label}:</ControlLabel>
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

    var toRender = [];
    _.forEach(this.props.data, function (el) {
      toRender.push(
        <DimensionConfig
          key={el.name}
          data={el.value}
          name={el.name}
          value={el.selected} 
        />
      );
    });
    
    return (
      <div>
        {toRender}
      </div>
    );
  }
});

module.exports = DimensionsBox;