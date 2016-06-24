var React = require('react');
var Reflux = require('reflux');

var store = require('./store');
var c = require('./constants');
var actions = require('./actions');
var DataTable = require('../../components/DataTable.jsx');



var Container = React.createClass({
  mixins: [Reflux.connect(store, 'storeState')],

  render: function () {
    var state = this.state.storeState;

    var tableLoading = (state[c.loading].indexOf('series') > -1);

    return (
      <div>
        <DataTable
          series={state[c.series]}
          loading={tableLoading}
          selectRow={actions[c.selectRow]}
          selectRowAll={actions[c.selectRowAll]}
        />
      </div>
    );
  }

});

module.exports = Container;
