import React from 'react';
import _ from 'lodash';
import Select from 'react-select';



let CustomSelect = React.createClass({

  render: function () {
    let { data, value } = this.props.obj;
    let options = _.map(data, el => {
      if (typeof el === 'object') {
        return {'value':el.value, 'label':el.value+' - '+(el.name||'')}
      }
      return {'value':el, 'label':el};
    });
    return (
      <div>
        <strong>{this.props.title}:</strong>
        <Select
          onChange={this.props.onChange}
          value={value}
          multi={this.props.multiple}
          options={options}
        />
      </div>
    );
  }
});

module.exports = CustomSelect;
