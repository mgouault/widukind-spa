var React = require('react');



var ResponseBox = React.createClass({
  
  render: function () {
    return (
      <pre>
        {this.props.data}
      </pre>
    );
  }
});

module.exports = ResponseBox;