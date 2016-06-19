var React = require('react');
import { Row, Col, Panel, Button } from 'react-bootstrap';
var Loader = require('react-loader');

var c = require('../../constants');
var actions = require('../../actions');



var LogBox = React.createClass({

  render: function () {
    var log = this.props.log;
    var loading = (typeof log === 'undefined');

    return (
      <Panel header="Logs">
        <Row>
          <Col sm={6} smOffset={3}>
            <Button onClick={actions[c.displayLog]} block>
              {(!this.props.displayed) ? "Show" : "Hide"}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div hidden={!this.props.displayed}>
              <br/>
              <Loader loaded={!loading}>
                <pre>
                  {log}
                </pre>
              </Loader>
            </div>
          </Col>
        </Row>
      </Panel>
    );
  }
});

module.exports = LogBox;
