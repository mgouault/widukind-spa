var React = require('react');
var Reflux = require('reflux');
import { Row, Col, Panel, Button } from 'react-bootstrap';

let actions = require('./actions');
let store = require('./store');



var LogContainer = React.createClass({
  mixins: [Reflux.connect(store, 'storeState')],

  render: function () {
    var state = this.state.storeState;
    let log = this.props.log;
    let displayed = state['logDisplayed'];

    return (
      <div>
        <Panel header="Logs">
          <Row>
            <Col sm={6} smOffset={3}>
              <Button onClick={actions[c.displayLog]} block>
                {(!displayed) ? "Show" : "Hide"}
              </Button>
            </Col>
          </Row>
          <Row>
            <div hidden={!displayed}>
              <br/>
              <pre>
                {log}
              </pre>
            </div>
          </Row>
        </Panel>
      </div>
    );
  }

});

module.exports = LogContainer;
