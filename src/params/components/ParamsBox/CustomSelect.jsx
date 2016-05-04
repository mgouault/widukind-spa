var React = require('react');
var _ = require('lodash');
import { FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
var Loader = require('react-loader');

var c = require('../../../constants');
var actions = require('../../../actions');



var CustomSelect = React.createClass({
  
  getOptions: function () {
    var options = [];
    _.forEach(this.props.data, function (el) {
      var name = el.name;
      options.push(<option key={name} value={name}>{name}</option>);
    });
    return options;
  },

  render: function () {
    var name = this.props.name;
    
    // if (invalidData && forever) {
    //   return (<Alert key="dataNotFound" bsStyle="danger">Error: data not found</Alert>);
    // }

    var label = _.capitalize(name);
    var options = this.getOptions();
    var onChange =  'lama';

    switch (name) {
      case c.PROVIDER:
        onChange = actions[c.PROVIDER_CHANGE]; break;
      case c.DATASET:
        onChange = actions[c.DATASET_CHANGE]; break;
      case c.DIMENSION:
        onChange = actions[c.DIMENSION_CHANGE]; break;
    }

    return (
      <Loader loaded={!(typeof this.props.data === 'undefined')}>
        <FormGroup controlId={"formControlsSelect" + name}>
          <ControlLabel>{label}:</ControlLabel>
          <FormControl
            componentClass="select"
            onChange={onChange}
            value={this.props.value}
            multiple={this.props.multiple}
          >
            {options}
          </FormControl>
        </FormGroup>
      </Loader>
    );
  }
});

module.exports = CustomSelect;