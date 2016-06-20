var React = require('react');
var _ = require('lodash');
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
var Select = require('react-select');

var c = require('../../constants');
var actions = require('../../actions');



var DimensionConfig = React.createClass({

  getOptions: function () {
    return _.map(this.props.data, function (el) {
      return ({ 'value':el, 'label':el });
    });
  },

  onUserInput: function (event) {
    actions[c.changeDimensionValues](event, this.props.name);
  },

  render: function () {
    var options = this.getOptions();

    var name = _.capitalize(this.props.name);
    return (
      <div>
        <strong>{name}:</strong>
        <Select
          onChange={this.onUserInput}
          value={this.props.value}
          multi
          options={options}
        />
      <br/>
      </div>
    );
  }
});

var DimensionsBox = React.createClass({

  render: function () {
    var data = this.props.data;

    if (!data || _.isEmpty(data)) {
      return (<div></div>);
    }

    var toRender = _.map(data, function (el) {
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
