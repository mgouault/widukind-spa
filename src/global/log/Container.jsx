var React = require('react');
var Reflux = require('reflux');

var store = require('./store');
var c = require('./constants');
var actions = require('./actions');
var LogBox = require('../../components/LogBox.jsx');



var Container = React.createClass({
  mixins: [Reflux.connect(store, 'storeState')],

  render: function () {
    var state = this.state.storeState;

    return (
      <div>
        <LogBox
          log={state[c.log]}
          displayed={state[c.logDisplayed]}
          displayLog={actions[c.displayLog]}
        />
      </div>
    );
  }

});

module.exports = Container;
