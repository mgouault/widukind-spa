let React = require('react');
let Reflux = require('reflux');
let _ = require('lodash');
import { Grid, Row, Col, Nav, Navbar, NavItem } from 'react-bootstrap';
let Loader = require('react-loader');

let store = require('./store');
let actions = require('./actions');
actions.connectAPIService();

let ParamsContainer = require('./params/Container.jsx');
// let GraphContainer = require('./graph/Container.jsx');
let UrlDisplay = require('../components/UrlDisplay.jsx');
let DataTable = require('../components/DataTable.jsx');
let LogDisplay = require('../components/LogDisplay.jsx');



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

        <Row>
          <Col sm={4}>
            <ParamsContainer/>
          </Col>
          <Col sm={8}>
            <Row>
              <Col sm={12}>
                {_.isEmpty(state['requestObj']) ? <div></div> :
                  <UrlDisplay
                    config={state['configObj']}
                    request={state['requestObj']}
                  />
                }
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Loader loaded={!state['series'].loading}>
                  {_.isEmpty(state['series'].data) ? <div></div> :
                    <DataTable
                      series={state['series'].data}
                      selection={state['series'].value}
                      updateSelection={actions.updateSelection}
                    />
                  }
                </Loader>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <LogDisplay
                  log={state['log']}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <footer className="footer">
          &copy; 2016 Widukind-SPA
        </footer>

      </Grid>
    );
  }
});

module.exports = GlobalContainer;
