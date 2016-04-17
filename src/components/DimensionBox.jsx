var React = require('react');
var _ = require('lodash');

var DimensionConfig = React.createClass({
  getOptions: function () {
    var options = [];
    var values = this.props.dimensionsValues
    for (var i = 0; i < values.length ; i++) {
      options.push(<option key={values[i]} value={values[i]}>{values[i]}</option>);
    }
    return options;
  },
  onUserInput: function (event) {
    this.props.onUserInput(event, this.props.name);
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

var DimensionsBox = module.exports = React.createClass({
  render: function () {
    var toRender = [];
    var dimensions = this.props.dimensionsObjSelected;
    for (var i = 0; i < dimensions.length ; i++) {
      toRender.push(<DimensionConfig key={dimensions[i].name} dimensionsValues={dimensions[i].value} name={dimensions[i].name} value={dimensions[i].selected} onUserInput={this.props.onUserInput}/>);
    }
    return (
      <div>
        {toRender}
      </div>
    );
  }
});
