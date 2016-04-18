var React = require('react');
var _ = require('lodash');

var appStore = require('./appStore');
var QueryBox = require('./QueryBox.jsx');
var ParamsBox = require('./ParamsBox.jsx');

var WidukindSPA = module.exports = React.createClass({
  
  getState: function() {
    return appStore.getDataObj();
  },

  getInitialState: function() {
    return this.getState();
  },
  
  _onChange: function() {
    this.setState(this.getState());
  },

  componentDidMount: function() {
    appStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    appStore.removeChangeListener(this._onChange);
  },
  
  render: function () {
    var toRender = [];
    if (this.state.datasetSelected && this.state.datasetSelected != 'Select') {
      toRender.push(<QueryBox dataset={this.state.datasetSelected} values={this.state.dimensionsObjSelected} />);
    }
    return (
      <div>
        {toRender}
        <ParamsBox 
          data={this.state.data} 
          providerSelected={this.state.providerSelected} 
          datasetSelected={this.state.datasetSelected} 
          dimensionsSelected={this.state.dimensionsSelected} 
          dimensionsObjSelected={this.state.dimensionsObjSelected} 
        />
      </div>
    );
  }
  
});