var React = require('react');
var Reflux = require('reflux');

var store = require('./store');
var c = require('../constants');
var Graph = require('./components/Graph.jsx');
var Table = require('./components/Table.jsx');
var LogBox = require('./components/LogBox.jsx');



var container = React.createClass({
  mixins: [Reflux.connect(store, 'storeState')],

  render: function () {
    return (
      <div>
        <Graph
          series={this.state.storeState[c.series]}
        />
        <Table
          series={this.state.storeState[c.series]}
        />
        <LogBox
          log={this.state.storeState[c.log]}
          displayed={this.state.storeState[c.logDisplayed]}
        />
      </div>
    );
  }

});

module.exports = container;
