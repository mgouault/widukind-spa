var React = require('react');
var _ = require('lodash');
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
var Loader = require('react-loader');
var Select = require('react-select');

var c = require('../../constants');



var CustomSelect = React.createClass({

  getOptions: function () {
    return _.map(this.props.data, function (el) {
      return ({ 'value':el.name, 'label':el.name });
    });
  },

  render: function () {
    if (this.props.loading) {
      return(<div>{this.props.name}:<Loader loaded={false}><div></div></Loader></div>);
    }

    var data = this.props.data;

    if (!data || _.isEmpty(data)) {
      this.props.onMissing();
      return (<div></div>);
    }

    var options = this.getOptions();
    return (
      <div>
        {this.props.name}:
        <Select
          onChange={this.props.onChange}
          value={this.props.value}
          multi={this.props.multiple}
          options={options}
        />
      </div>
    );
  }
});

module.exports = CustomSelect;