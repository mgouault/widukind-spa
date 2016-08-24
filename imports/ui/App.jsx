import React from 'react';
import Reflux from 'reflux';

import { Grid, Row, Col, Nav, Navbar, NavItem } from 'react-bootstrap';
import { Router, Route, browserHistory, Link, IndexRedirect } from 'react-router'

import MainPage from './MainPage.jsx';
import ConfigPage from './ConfigPage.jsx';

import AccountsUIWrapper from './components/AccountsUIWrapper.jsx';



let PageLayout = React.createClass({
  render: function () {
    return (
      <Grid fluid>

        <AccountsUIWrapper />

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
                  <img src="/icons/github.png" alt="repo github" />
                </NavItem>
                <NavItem eventKey={2} href="//widukind.cepremap.org" target="_blank">
                  Widukind
                </NavItem>
                <NavItem eventKey={3} href="//widukind-api.cepremap.org" target="_blank">
                  API
                </NavItem>
                <NavItem>
                  <Link to="/main">Main</Link>
                </NavItem>
                <NavItem>
                  <Link to="/config">Config</Link>
                </NavItem>
              </Nav>
            </Navbar>
          </Col>
        </Row>

        {this.props.children}

        <footer className="footer">
          &copy; 2016 Widukind-SPA
        </footer>

      </Grid>
    );
  }
});

let App = React.createClass({
  render: function () {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={PageLayout}>
          <IndexRedirect to="/main" />
          <Route path="main" component={MainPage} />
          <Route path="config" component={ConfigPage} />
        </Route>
      </Router>
    );
  }
});

module.exports = App;
