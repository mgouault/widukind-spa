var React = require('react');
import { Grid, Row, Col, Well, Fade } from 'react-bootstrap';
var Loader = require('react-loader');
var _ = require('lodash');

var appStore = require('../stores/store');
var QueryBox = require('../components/QueryBox.jsx');
var ParamsBox = require('../components/ParamsBox.jsx');

var WidukindSPA = React.createClass({

  getInitialState: function () {
    var data = this.getState();
    data.loading.push('providers');
    return data;
  },

  getState: function (checkData) {
    return appStore.getDataObj(checkData);
  },

  _onChange: function() {
    this.setState(this.getState());
  },

  componentDidMount: function () {
    this.getState('checkData').then(function (data) {
      data.loading = _.remove(data.loading, 'providers');
      this.setState(data);
    }.bind(this));
    appStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    appStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var data = JSON.stringify(this.state.json, undefined, 2);
    var loadingJSON = _.indexOf(this.state.loading, 'requestJSON') > -1;
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
                loading={loadingJSON}
              />
            </Well>
            <Fade in={true} transitionAppear={true}>
              <Well>
              <ParamsBox
                key="ParamsBox"
                data={this.state.data}
                providerSelected={this.state.providerSelected}
                datasetSelected={this.state.datasetSelected}
                dimensionsSelected={this.state.dimensionsSelected}
                dimensionsObjSelected={this.state.dimensionsObjSelected}
                loading={this.state.loading}
              />
              </Well>
            </Fade>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <Well>
            <Loader loaded={!loadingJSON}>
              <pre>
                {data}
              </pre>
            </Loader>
            </Well>
          </Col>
        </Row>
      </Grid>
    );
  }

});

module.exports = WidukindSPA;