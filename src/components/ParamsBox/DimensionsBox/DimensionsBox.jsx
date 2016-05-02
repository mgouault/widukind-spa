var React = require('react');
var _ = require('lodash');

var DimensionConfig = require('./DimensionConfig.jsx');

  

var DimensionsBox = React.createClass({
  
  render: function () {
    var toRender = [];
    _.forEach(this.props.data, function (el) {
      toRender.push(
        <DimensionConfig
          key={el.name}
          data={el.value}
          name={el.name}
          value={el.selected} 
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