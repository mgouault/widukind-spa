var React = require('react');
import { Well } from 'react-bootstrap';

var store = require('../stores/paramsStore');
var ParamsBox = require('../components/ParamsBox/ParamsBox.jsx');



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
    return (
      <Well>
        <ParamsBox
          key="ParamsBox"
          providers={this.state.providers}
          providerSelected={this.state.providerSelected}
          datasetSelected={this.state.datasetSelected}
          dimensionsSelected={this.state.dimensionsSelected}
          providerObj={this.state.providerObj}
          datasetObj={this.state.datasetObj}
          dimensionsObjSelected={this.state.dimensionsObjSelected}
          loading={this.state.loading}
        />
      </Well>
    );
  }

});

module.exports = WidukindSPA;