var React = require('react');

var store = require('./store');
var ParamsBox = require('./components/ParamsBox/ParamsBox.jsx');



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
    store.checkData();
  },

  componentWillUnmount: function () {
    store.removeChangeListener(this._onChange);
  },

  render: function () {
    return (
      <div>
        <ParamsBox
          key="ParamsBox"
          obj={this.state}
        />
      </div>
    );
  }

});

module.exports = container;