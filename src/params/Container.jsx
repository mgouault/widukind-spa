var React = require('react');

var store = require('./store');
var ParamsBox = require('./components/ParamsBox.jsx');



var container = React.createClass({
  mixins: [Reflux.connect(store, 'selected')],

  render: function () {
    store.checkData();
    return (
      <div>
        <ParamsBox
          key="ParamsBox"
          selected={this.state.selected}
        />
      </div>
    );
  }

});

module.exports = container;
