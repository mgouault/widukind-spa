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
    var name = this.props.name;
    
    // if (invalidData && forever) {
    //   return (<Alert key="dataNotFound" bsStyle="danger">Error: data not found</Alert>);
    // }

    var label = _.capitalize(name);
    var options = this.getOptions();
    return (
      <Loader loaded={!false}>
        <FormGroup controlId={"formControlsSelect" + name}>
          <ControlLabel>{label}:</ControlLabel>
          <FormControl
            componentClass="select"
            onChange={actions[name+'Change']}
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