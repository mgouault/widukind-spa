var React = require('react');
var ReactDOM = require('react-dom');
import { Grid, Row, Col } from 'react-bootstrap';

var ParamsContainer = require('./params/Container.jsx');
var ResponseContainer = require('./response/Container.jsx');



var WidukindSPA = React.createClass({
  
  render: function () {
    return (
      <Grid>
        <Row>



          <div class="container">

            <div class="header clearfix">
              <nav>
                <ul class="nav nav-pills pull-right">
                  <li role="presentation" class="active"><a href="#">Home</a></li>
                  <li role="presentation"><a href="#">About</a></li>
                </ul>
              </nav>
              <h3 class="text-muted">Project name</h3>
            </div>

            <footer class="footer">
            </footer>

          </div>














          <Col lg={4}>
            <ParamsContainer />
          </Col>
          <Col lg={8}>
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
