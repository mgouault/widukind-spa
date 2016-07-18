let React = require('react');
let Reflux = require('reflux');
let _ = require('lodash');
import { Grid, Row, Col, Nav, Navbar, NavItem } from 'react-bootstrap';
let Loader = require('react-loader');
let ReactDimensions = require('react-dimensions');

let store = require('./store');
let actions = require('./actions');
actions.connectAPIService();

let ParamsContainer = require('./params/Container.jsx');
let SeriesGraph = require('../components/SeriesGraph.jsx');
let SeriesGraphContainer = ReactDimensions()(SeriesGraph);
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
                <div className="seriesGraphDiv">
                  <Loader loaded={!state['selection'].loading}>
                    {_.isEmpty(state['selection'].data) ? <div></div> :
                      <SeriesGraphContainer
                        series={state['selection'].data}
                      />
                    }
                  </Loader>
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <div className="urlDisplayDiv">
                  {_.isEmpty(state['requestObj']) ? <div></div> :
                    <UrlDisplay
                      config={state['configObj']}
                      request={state['requestObj']}
                    />
                  }
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <div className="dataTableDiv">
                  <Loader loaded={!state['series'].loading}>
                    {_.isEmpty(state['series'].data) ? <div></div> :
                      <DataTable
                        series={state['series'].data}
                        selection={state['series'].value}
                        updateSelection={actions.updateSelection}
                      />
                    }
                  </Loader>
                </div>
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
