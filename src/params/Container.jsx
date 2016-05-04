var React = require('react');
import { Well } from 'react-bootstrap';

var store = require('./store');
var constants = require('../constants');
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
          dataset={this.state[constants.S_SELECTED_DATASET]}
          values={this.state[constants.S_SELECTED_DIMENSIONS_VALUES]} 
        />
        <ParamsBox
          key="ParamsBox"
          obj={this.state}
        />
      </Well>
    );
  }

});

module.exports = container;