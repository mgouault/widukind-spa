var React = require('react');

var store = require('./store');
var ResponseBox = require('./components/ResponseBox.jsx');



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
  },

  componentWillUnmount: function () {
    store.removeChangeListener(this._onChange);
  },

  render: function () {
    return (
      <ResponseBox 
        json={this.state.json} 
      />
    );
  }

});

module.exports = container;