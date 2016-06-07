var React = require('react');
import { Well, Button } from 'react-bootstrap';
var Loader = require('react-loader');

var c = require('../../constants');
var actions = require('../../actions');



var LogBox = React.createClass({
  
  render: function () {
    var log = this.props.log;
    var loading = (typeof log === 'undefined');
    
    return (
      <Well>
        <Button onClick={actions[c.displayLog]}>
          Show/Hide log
        </Button>
        <div hidden={!this.props.displayed}>
          <Loader loaded={!loading}>
            <pre>
              {log}
            </pre>
          </Loader>
        </div>
      </Well>
    );
  }
});

module.exports = LogBox;