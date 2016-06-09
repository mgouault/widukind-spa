var React = require('react');
var ReactDOM = require('react-dom');
import { Col } from 'react-bootstrap';

var ParamsContainer = require('./params/Container.jsx');
var ResponseContainer = require('./response/Container.jsx');
var UrlDisplayContainer = require('./urlDisplay/Container.jsx');



var WidukindSPA = React.createClass({

  render: function () {
    return (
      <div className="container-fluid">

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
          <Col xs={12} sm={12} md={12} lg={12}>
            <UrlDisplayContainer />
          </Col>
          <Col xs={4} sm={4} md={4} lg={4}>
            <ParamsContainer />
          </Col>
          <Col xs={8} sm={8} md={8} lg={8}>
            <ResponseContainer />
          </Col>
        </div>

        <footer className="footer">
        </footer>

      </div>
    );
  }
});



ReactDOM.render(
  <WidukindSPA />,
  document.getElementById('content')
);
