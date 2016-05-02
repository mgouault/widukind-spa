var React = require('react');



var QueryURL = React.createClass({
  
  render: function () {
    return (
      <div>
        <pre>{this.props.url}</pre>
      </div>
    );
  }
});

module.exports = QueryURL;