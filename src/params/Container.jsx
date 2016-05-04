var React = require('react');
import { Well } from 'react-bootstrap';

var store = require('./store');
var QueryBox = require('./components/QueryBox.jsx');
var ParamsBox = require('./components/ParamsBox/ParamsBox.jsx');



var container = React.createClass({

  getInitialState: function () {
    return this.getState();
  },

  getState: function () {
    return store.getState();
  },

  _onChange: function() {
    this.setState(this.getState());
  },

  componentDidMount: function () {
    store.addChangeListener(this._onChange);
    store.checkData();
  },

  componentWillUnmount: function () {
    store.removeChangeListener(this._onChange);
  },

  render: function () {
    return (
      <Well>
        <QueryBox
          key="QueryBox"
          dataset={this.state.datasetSelected}
          values={this.state.dimensionsObjSelected} 
        />
        <ParamsBox
          key="ParamsBox"
          providers={this.state.providers}
          providerSelected={this.state.providerSelected}
          datasetSelected={this.state.datasetSelected}
          dimensionsSelected={this.state.dimensionsSelected}
          providerObj={this.state.providerObj}
          datasetObj={this.state.datasetObj}
          dimensionsObjSelected={this.state.dimensionsObjSelected}
        />
      </Well>
    );
  }

});

module.exports = container;