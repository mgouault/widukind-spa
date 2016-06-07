var React = require('react');

var store = require('./store');
var c = require('../constants');
var Graph = require('./components/Graph.jsx');
var Table = require('./components/Table.jsx');
var LogBox = require('./components/LogBox.jsx');



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
        <Graph
          series={this.state[c.series]}
        />
        <Table
          series={this.state[c.series]}
        />
        <LogBox
          log={this.state[c.log]}
          displayed={this.state[c.logDisplayed]}
        />
      </div>
    );
  }

});

module.exports = container;
