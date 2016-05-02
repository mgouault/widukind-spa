var React = require('react');
import { Button } from 'react-bootstrap';

var actions = require('../../actions/actions');



var QueryButton = React.createClass({

  render: function () {
    var requestJSON = function () {
      actions.requestJSON(this.props.url);
    }.bind(this);
    return (
      <div>
        <Button onClick={requestJSON}>
          Request JSON
        </Button>
      </div>
    );
  }
});

module.exports = QueryButton;