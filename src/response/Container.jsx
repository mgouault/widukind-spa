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
    var state = this.state.storeState;

    var graphLoading = (state[c.loading].indexOf('values') > -1);
    var tableLoading = (state[c.loading].indexOf('series') > -1);

    return (
      <div>
        <Graph
          series={state[c.series]}
          loading={graphLoading}
        />
        <br/>
        <Table
          series={state[c.series]}
          loading={tableLoading}
        />
        <br/>
        <LogBox
          log={state[c.log]}
          displayed={state[c.logDisplayed]}
        />
      </div>
    );
  }

});

module.exports = container;
