var React = require('react');

var store = require('./store');
var c = require('../constants');
var UrlDisplay = require('./components/UrlDisplay.jsx');



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
    store.connect();
  },

  componentWillUnmount: function () {
    store.removeChangeListener(this._onChange);
  },

  render: function () {
    return (
      <div>
        <UrlDisplay
          key="UrlDisplay"
          dataset={this.state[c.S_SELECTED_DATASET]}
          dimensions={this.state[c.S_SELECTED_DIMENSIONS]}
          config={this.state['config']}
        />
      </div>
    );
  }

});

module.exports = container;