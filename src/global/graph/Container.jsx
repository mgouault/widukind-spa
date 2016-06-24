var React = require('react');
var Reflux = require('reflux');

var store = require('./store');
var c = require('./constants');
var actions = require('./actions');
var SeriesGraph = require('../../components/SeriesGraph.jsx');



var Container = React.createClass({
  mixins: [Reflux.connect(store, 'storeState')],

  render: function () {
    var state = this.state.storeState;

    var graphLoading = (state[c.loading].indexOf('values') > -1);

    return (
      <div>
        <SeriesGraph
          series={state[c.series]}
          loading={graphLoading}
          requestValues={actions[c.requestValues].triggerAsync}
        />
      </div>
    );
  }

});

module.exports = Container;
