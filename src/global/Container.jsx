var React = require('react');
import { Grid, Row, Col, Nav, Navbar, NavItem } from 'react-bootstrap';

// var GraphContainer = require('./graph/Container.jsx');
// var LogContainer = require('./log/Container.jsx');
var ParamsContainer = require('./params/Container.jsx');
// var TableContainer = require('./table/Container.jsx');
// var UrlContainer = require('./url/Container.jsx');



var Container = React.createClass({

  render: function () {
    return (
      <Grid fluid>

        <Row>
          <Col sm={3}></Col>
          <Col sm={6}>
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
          <Col sm={3}></Col>
        </Row>

        <div className="row marketing">
          <Row>
            <Col sm={4}>
              <ParamsContainer/>
            </Col>
            <Col sm={8}>
              {// <GraphContainer/>
              // <br/>
              // <UrlContainer/>
              // <br/>
              // <TableContainer/>
              // <br/>
              // <LogContainer/>}
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

module.exports = Container;
