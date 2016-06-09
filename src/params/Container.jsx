var React = require('react');
var Reflux = require('reflux');

var store = require('./store');
var ParamsBox = require('./components/ParamsBox.jsx');



var container = React.createClass({
  mixins: [Reflux.connect(store, 'storeState')],

  render: function () {
    return (
      <div>
        <ParamsBox
          key="ParamsBox"
          storeState={this.state.storeState}
        />
      </div>
    );
  }

});

module.exports = container;
