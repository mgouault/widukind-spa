var React = require('react');
var ReactDOM = require('react-dom');
import { Grid, Row, Col, Well } from 'react-bootstrap';

var appStore = require('./stores/store');
var QueryBox = require('./components/QueryBox.jsx');
var ParamsBox = require('./components/ParamsBox.jsx');

var WidukindSPA = React.createClass({

  getInitialState: function () {
    return {};
  },

  getState: function (checkData) {
    return appStore.getDataObj(checkData);
  },

  _onChange: function() {
    this.setState(this.getState());
  },

  componentDidMount: function () {
    this.getState('checkData').then(function (data) {
      this.setState(data);
    }.bind(this));
    appStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    appStore.removeChangeListener(this._onChange);
  },


  render: function () {
    var data = JSON.stringify(this.state.json, undefined, 2);
    return (
      <Grid>
        <Row>
          <Col lg={4} md={4} sm={4} xs={4}>
            <Well>
              <QueryBox
                key="QueryBox"
                dataset={this.state.datasetSelected}
                values={this.state.dimensionsObjSelected}
                json={this.state.json}
              />
            </Well>
            <Well>
              <ParamsBox
                key="ParamsBox"
                data={this.state.data}
                providerSelected={this.state.providerSelected}
                datasetSelected={this.state.datasetSelected}
                dimensionsSelected={this.state.dimensionsSelected}
                dimensionsObjSelected={this.state.dimensionsObjSelected}
              />
            </Well>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <Well>
            <pre>
              {data}
            </pre>
            </Well>
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
