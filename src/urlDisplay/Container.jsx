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
    store.init();
  },

  componentWillUnmount: function () {
    store.removeChangeListener(this._onChange);
  },

  render: function () {
    return (
      <div>
        <UrlDisplay
          key="UrlDisplay"
          dataset={this.state[c.selectedDataset]}
          dimensions={this.state[c.selectedDimensions]}
          config={this.state[c.config]}
        />
      </div>
    );
  }

});

module.exports = container;
