var React = require('react');
var _ = require('lodash');
import { FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
var Loader = require('react-loader');
var Select = require('react-select');

var c = require('../../../constants');
var actions = require('../../../actions');

/*
 <FormGroup controlId={"formControlsSelect" + name}>
 <ControlLabel>{name}:</ControlLabel>
 <FormControl
 componentClass="select"
 onChange={onChange}
 value={this.props.value}
 multiple={this.props.multiple}
 >
 {options}
 </FormControl>
 </FormGroup>

 <Select
 onChange={onChange}
 value={this.props.value}
 multi={this.props.multiple}
 options={options}
 />
 */

var CustomSelect = React.createClass({
  
  getOptions: function () {
    return _.map(this.props.data, function (el) {
      return ({ 'value':el.name, 'label':el.name });
    });
  },

  render: function () {
    if (this.props.data === null) {
      return (<Alert key="dataNotFound" bsStyle="danger">Error: data not found</Alert>);
    }
    var options = this.getOptions();
    var onChange, name;
    switch (this.props.name) {
      case c.S_PROVIDERS:
        onChange = actions[c.PROVIDER_CHANGE];
        name = 'Provider';
        break;
      case c.S_DATASETS:
        onChange = actions[c.DATASET_CHANGE];
        name = 'Dataset';
        break;
      case c.S_DIMENSIONS:
        onChange = actions[c.DIMENSIONS_CHANGE];
        name = 'Dimension';
        break;
    }
    return (
      <Loader loaded={!(typeof this.props.data === 'undefined')}>
        <Select
          onChange={onChange}
          value={this.props.value}
          multi={this.props.multiple}
          options={options}
        />
      </Loader>
    );
  }
});

module.exports = CustomSelect;