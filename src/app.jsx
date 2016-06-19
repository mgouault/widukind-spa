var React = require('react');
var ReactDOM = require('react-dom');
import { Grid, Row, Col, Nav, Navbar, NavItem } from 'react-bootstrap';

var ParamsContainer = require('./params/Container.jsx');
var ResponseContainer = require('./response/Container.jsx');
var UrlDisplayContainer = require('./urlDisplay/Container.jsx');



var WidukindSPA = React.createClass({

  render: function () {
    return (
      <Grid fluid>

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

        <div className="row marketing">
          <Row>
            <UrlDisplayContainer />
          </Row>
          <br/>
          <Row>
            <Col sm={4}>
              <ParamsContainer />
            </Col>
            <Col sm={8}>
              <ResponseContainer />
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



ReactDOM.render(
  <WidukindSPA />,
  document.getElementById('content')
);
