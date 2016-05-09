var React = require('react');
var ReactDOM = require('react-dom');
import { Grid, Row, Col } from 'react-bootstrap';

var ParamsContainer = require('./params/Container.jsx');
var ResponseContainer = require('./response/container.jsx');



var WidukindSPA = React.createClass({
  
  render: function () {
    return (
      <Grid>
        <Row>
          <Col lg={4} md={4} sm={4} xs={4}>
            <ParamsContainer />
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <ResponseContainer />
          </Col>
        </Row>
      </Grid>
    );
  }
});



ReactDOM.render(
  <WidukindSPA />,
  document.getElementById('content')
);
