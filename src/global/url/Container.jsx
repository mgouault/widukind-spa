var React = require('react');
var Reflux = require('reflux');

var store = require('./store');
var c = require('./constants');
var UrlDisplay = require('../../components/UrlDisplay.jsx');



var Container = React.createClass({
  mixins: [Reflux.connect(store, 'storeState')],

  render: function () {
    var state = this.state.storeState;

    return (
      <div>
        <UrlDisplay
          config={state[c.config]}
          selectedDataset={state[c.selectedDataset]}
          selectedDimensions={state[c.selectedDimensions]}
        />
      </div>
    );
  }

});

module.exports = Container;
