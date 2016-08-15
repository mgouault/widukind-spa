import React from 'react';
import { Row, Col, Panel, Button } from 'react-bootstrap';



let LogDisplay = React.createClass({

  getInitialState: function () {
    return { 'displayed': false };
  },

  onClick: function () {
    this.setState({ 'displayed': !this.state['displayed'] });
  },

  render: function () {
    let displayed = this.state.displayed;
    let log = this.props.log;
    return (
      <div>
        <Panel header="Logs">
          <Row>
            <Col sm={6} smOffset={3}>
              <Button onClick={this.onClick} block>
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

module.exports = LogDisplay;
