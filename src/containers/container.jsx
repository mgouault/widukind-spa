var React = require('react');
import { Grid, Row, Col, Well } from 'react-bootstrap';

var store = require('../stores/store');
var QueryBox = require('../components/QueryBox/QueryBox.jsx');
var ParamsBox = require('../components/ParamsBox/ParamsBox.jsx');



var WidukindSPA = React.createClass({

  getInitialState: function () {
    return this.getState('checkData');
  },

  getState: function (checkData) {
    return store.getDataObj(checkData);
  },

  _onChange: function() {
    this.setState(this.getState());
  },

  componentDidMount: function () {
    store.addChangeListener(this._onChange);
    this.setState(this.getState());
  },

  componentWillUnmount: function () {
    store.removeChangeListener(this._onChange);
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
            />
            </Well>
            <Well>
            <ParamsBox
              key="ParamsBox"
              providers={this.state.providers}
              providerSelected={this.state.providerSelected}
              datasetSelected={this.state.datasetSelected}
              dimensionsSelected={this.state.dimensionsSelected}
              providerObj={this.state.providerObj}
              datasetObj={this.state.datasetObj}
              dimensionsObjSelected={this.state.dimensionsObjSelected}
              loading={this.state.loading}
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

module.exports = WidukindSPA;