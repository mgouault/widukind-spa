var React = require('react');
var _ = require('lodash');
import { FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
var Loader = require('react-loader');

var actions = require('../../../actions/actions');



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
    if (!this.props.data) {
      return (<div></div>);
    }
    var options = this.getOptions();
    if (_.isEmpty(options)) {
      return (<Alert key="dataNotFound" bsStyle="danger">Error: data not found</Alert>);
    } else {
      var label = _.capitalize(this.props.name);
      return (
        <Loader loaded={!this.props.loading}>
          <FormGroup controlId="formControlsSelectMultipleDimensionsValues">
            <ControlLabel>Select {label}:</ControlLabel>
            <FormControl componentClass="select" onChange={this.onUserInput} value={this.props.value} multiple>
              {options}
            </FormControl>
          </FormGroup>
        </Loader>
      );
    }
  }
});

module.exports = DimensionConfig;