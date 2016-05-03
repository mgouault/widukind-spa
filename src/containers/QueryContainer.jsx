var React = require('react');
import { Well } from 'react-bootstrap';

var store = require('../stores/queryStore');
var QueryBox = require('../components/QueryBox/QueryBox.jsx');



var QueryContainer = React.createClass({

  getInitialState: function () {
    return this.getState();
  },

  getState: function () {
    return store.getData();
  },

  _onChange: function() {
    this.setState(this.getState());
  },

  componentDidMount: function () {
    store.addChangeListener(this._onChange);
    this.setState(this.getState());
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
      </Well>
    );
  }
});

module.exports = QueryContainer;