var React = require('react');
var _ = require('lodash');

var appActions = require('./appActions');

var DimensionConfig = React.createClass({
  getOptions: function () {
    var options = [];
    var values = this.props.dimensionsValues
    _.forEach(values, function (el) {
      options.push(
        <option 
          key={el} 
          value={el}>
            {el}
        </option>);
    });
    return options;
  },
  onUserInput: function (event) {
    appActions.dimensionValueChange(event, this.props.name, this.props.dimensionsObjSelected);
  },
  render: function () {
    if (!this.props.dimensionsValues) {
      return (<div></div>);
    }
    var options = this.getOptions();
    if (_.isEmpty(options)) {
      return (<div></div>);
    }
    return (
      <div>
        Select {this.props.name}:
        <select onChange={this.onUserInput} value={this.props.value} multiple={true}>
          {options}
        </select>
      </div>
    );
  }
});

var DimensionsBox = React.createClass({
  render: function () {
    var toRender = [];
    var dimensions = this.props.dimensionsObjSelected;
    _.forEach(dimensions, function (el) {
      toRender.push(
        <DimensionConfig 
          key={el.name} 
          dimensionsValues={el.value} 
          name={el.name} 
          value={el.selected} 
          dimensionsObjSelected={dimensions} 
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