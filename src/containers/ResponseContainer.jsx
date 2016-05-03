var React = require('react');
import { Well } from 'react-bootstrap';

var store = require('../stores/responseStore');
var ResponseBox = require('../components/ResponseBox.jsx');



var WidukindSPA = React.createClass({

  getInitialState: function () {
    return this.getState('checkData');
  },

  getState: function (checkData) {
    return store.getDataObj(checkData);
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
    var data = JSON.stringify(this.state.json, undefined, 2);
    return (
      <Well>
        <ResponseBox data={data} />
      </Well>
    );
  }

});

module.exports = WidukindSPA;