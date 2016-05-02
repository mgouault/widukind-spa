var React = require('react');
import { Button } from 'react-bootstrap';

var appActions = require('../../actions/actions');



var QueryButton = React.createClass({
  
  render: function () {
    var requestJSON = function () {
      appActions.requestJSON(this.props.url);
    }.bind(this);
    return (
      <div>
        <Button onClick={requestJSON} disabled={this.props.loading}>
          Request JSON
        </Button>
      </div>
    );
  }
});

module.exports = QueryButton;