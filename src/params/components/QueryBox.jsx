var React = require('react');
import { Button, Well } from 'react-bootstrap';

var c = require('../../constants');
var actions = require('../../actions');



var QueryBox = React.createClass({

  render: function () {
    var requestJSON = function () {
      actions[c.REQUEST_JSON](this.props.dataset, this.props.dimensions);
    }.bind(this);
    return (
      <Well>
        <Button onClick={requestJSON} disabled={!this.props.validJSON}>
          Request JSON
        </Button>
      </Well>
    );
  }
});

module.exports = QueryBox;