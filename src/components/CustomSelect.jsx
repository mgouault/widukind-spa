let React = require('react');
let _ = require('lodash');
let Select = require('react-select');



let CustomSelect = React.createClass({

  getOptions: function () {
    return _.map(this.props.data, function (el) {
      return ({'value':el, 'label':el});
    });
  },

  render: function () {
    let options = this.getOptions();
    return (
      <div>
        <strong>{this.props.title}:</strong>
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
