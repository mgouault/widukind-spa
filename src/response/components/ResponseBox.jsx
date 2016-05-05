var React = require('react');
import { Well } from 'react-bootstrap';
var Loader = require('react-loader');



var ResponseBox = React.createClass({
  
  render: function () {
    var loading = (typeof this.props.json === 'undefined');
    var json = JSON.stringify(this.props.json, null, 2);

    return (
      <Well>
        <Loader loaded={!loading}>
          <pre>
            {json}
          </pre>
        </Loader>
      </Well>
    );
  }
});

module.exports = ResponseBox;