let React = require('react');
let Reflux = require('reflux');
let _ = require('lodash');
import { Grid, Row, Col, Nav, Navbar, NavItem } from 'react-bootstrap';

let actions = require('./actions');
let store = require('./store');

// let GraphContainer = require('./graph/Container.jsx');
// let LogContainer = require('./log/Container.jsx');
let ParamsContainer = require('./params/Container.jsx');
// let TableContainer = require('./table/Container.jsx');
let UrlDisplay = require('../components/UrlDisplay.jsx');



let GlobalContainer = React.createClass({
  mixins: [Reflux.connect(store, 'storeState')],

  render: function () {
    let state = this.state.storeState;
    return (
      <Grid fluid>

        <Row>
          <Col sm={6} smOffset={3}>
            <Navbar>
              <Navbar.Header>
                <Navbar.Brand>
                  Widukind SPA
                </Navbar.Brand>
              </Navbar.Header>
              <Nav>
                <NavItem eventKey={1} href="//github.com/mgouault/widukind-spa" target="_blank">
                  <img src="assets/github.png" alt="repo github" />
                </NavItem>
                <NavItem eventKey={2} href="//widukind.cepremap.org" target="_blank">
                  Widukind
                </NavItem>
                <NavItem eventKey={3} href="//widukind-api.cepremap.org" target="_blank">
                  API
                </NavItem>
              </Nav>
            </Navbar>
          </Col>
        </Row>

        <div className="row marketing">
          <Row>
            <Col sm={4}>
              <ParamsContainer/>
            </Col>
            <Col sm={8}>
              {_.isEmpty(state['requestObj']['values']) ? <div></div> :
                <UrlDisplay
                  config={state['configObj']}
                  request={state['requestObj']['values']}
                />
              }
            </Col>
          </Row>
        </div>

        <footer className="footer">
          &copy; 2016 Widukind-SPA
        </footer>

      </Grid>
    );
  }
});

module.exports = GlobalContainer;
