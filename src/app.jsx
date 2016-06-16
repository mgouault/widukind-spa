var React = require('react');
var ReactDOM = require('react-dom');
import { Grid, Row, Col } from 'react-bootstrap';

var ParamsContainer = require('./params/Container.jsx');
var ResponseContainer = require('./response/Container.jsx');
var UrlDisplayContainer = require('./urlDisplay/Container.jsx');



var WidukindSPA = React.createClass({

  render: function () {
    return (
      <Grid fluid>

        <div className="header clearfix">
          <nav>
            <ul className="nav nav-pills pull-right">
              <li role="presentation" className="active"><a href="#">Main</a></li>
              <li role="presentation"><a href="#">Config</a></li>
            </ul>
          </nav>
          <h3 className="text-muted">Widukind SPA</h3>
        </div>

        <div className="row marketing">
          <Row>
            <Col sm={12}>
              <UrlDisplayContainer />
            </Col>
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
        </footer>

      </Grid>
    );
  }
});



ReactDOM.render(
  <WidukindSPA />,
  document.getElementById('content')
);
