var React = require('react');

var store = require('./store');
var c = require('../constants');
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
      <div>
        <QueryBox
          key="QueryBox"
          dataset={this.state[c.S_SELECTED_DATASET]}
          dimensions={this.state[c.S_SELECTED_DIMENSIONS]}
          validJSON={this.state['validJSON']}
        />
        <ParamsBox
          key="ParamsBox"
          obj={this.state}
        />
      </div>
    );
  }

});

module.exports = container;