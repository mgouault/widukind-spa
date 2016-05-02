var React = require('react');
var _ = require('lodash');
import { FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
var Loader = require('react-loader');



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
    if (!this.props.data) {
      return (<div></div>);
    }
    var options = this.getOptions();
    if (_.isEmpty(options) && !this.props.loading) {
      return (<Alert key="dataNotFound" bsStyle="danger">Error: data not found</Alert>);
    } else {
      var label = _.capitalize(this.props.name);
      return (
        <Loader loaded={!this.props.loading}>
          <FormGroup controlId={"formControlsSelect" + this.props.name}>
            <ControlLabel>{label}:</ControlLabel>
            <FormControl componentClass="select" onChange={this.props.onChange} value={this.props.value} multiple={this.props.multiple}>
              {options}
            </FormControl>
          </FormGroup>
        </Loader>
      );
    }
  }
});

module.exports = CustomSelect;