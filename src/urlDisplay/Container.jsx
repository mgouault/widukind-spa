var React = require('react');
var Reflux = require('reflux');

var store = require('./store');
var c = require('../constants');
var UrlDisplay = require('./components/UrlDisplay.jsx');



var container = React.createClass({
  mixins: [Reflux.connect(store, 'storeState')],

  render: function () {
    return (
      <div>
        <UrlDisplay
          key="UrlDisplay"
          dataset={this.state.storeState[c.selectedDataset]}
          dimensions={this.state.storeState[c.selectedDimensions]}
          config={this.state.storeState[c.config]}
        />
      </div>
    );
  }

});

module.exports = container;
