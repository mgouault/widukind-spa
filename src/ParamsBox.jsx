var React = require('react');
var _ = require('lodash');
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

var appActions = require('./appActions');
var DimensionsBox = require('./DimensionBox.jsx');

var DimensionsSelect = React.createClass({
  getOptions: function () {
    var options = [];
    this.props.dimensions.forEach(function (dimension) {
      var name = dimension.name;
      options.push(<option key={name} value={name}>{name}</option>);
    });
    return options;
  },
  onUserInput: function (event) {
    appActions.dimensionsChange(event, this.props.dimensions, this.props.dimensionsObjSelected);
  },
  render: function () {
    if (!this.props.dimensions) {
      return (<div></div>);
    }
    var options = this.getOptions();
    if (_.isEmpty(options)) {
      return (<div></div>);
    }
    return (
      <FormGroup controlId="formControlsSelectMultipleDimensions">
        <ControlLabel>Dimensions:</ControlLabel>
        <FormControl componentClass="select" onChange={this.onUserInput} value={this.props.value} multiple>
          {options}
        </FormControl>
      </FormGroup>
    );
  }
});

var DatasetSelect = React.createClass({
  getOptions: function () {
    var options = [];
    this.props.datasets.forEach(function (dataset) {
      var name = dataset.name;
      options.push(<option key={name} value={name}>{name}</option>);
    });
    return options;
  },
  render: function () {
    if (!this.props.datasets) {
      return (<div></div>);
    }
    var options = this.getOptions();
    if (_.isEmpty(options)) {
      return (<div></div>);
    }
    return (
      <FormGroup controlId="formControlsSelectDataset">
        <ControlLabel>Dataset:</ControlLabel>
        <FormControl componentClass="select" onChange={appActions.datasetChange} value={this.props.value}>
          <option>Select</option>
          {options}
        </FormControl>
      </FormGroup>
    );
  }
});

var ProviderSelect = React.createClass({
  getOptions: function () {
    var options = [];
    this.props.providers.forEach(function (provider) {
      var name = provider.name;
      options.push(<option key={name} value={name}>{name}</option>);
    });
    return options;
  },
  render: function () {
    if (!this.props.providers) {
      return (<div></div>);
    }
    var options = this.getOptions();
    if (_.isEmpty(options)) {
      return (<div></div>);
    }
    return (
      <FormGroup controlId="formControlsSelectProvider">
        <ControlLabel>Provider:</ControlLabel>
        <FormControl componentClass="select" onChange={appActions.providerChange} value={this.props.value}>
          <option>Select</option>
          {options}
        </FormControl>
      </FormGroup>
    );
  }
});

var ParamsBox = React.createClass({
  render: function () {
    var toRender = [];
    var providers = this.props.data;
    if (providers) {
      toRender.push(
        <ProviderSelect 
          key="ProviderSelect" 
          providers={providers} 
          value={this.props.providerSelected}  
        />
      );
      var providerObj = _.find(providers, {'name': this.props.providerSelected});
      if (providerObj && providerObj.value) {
        toRender.push(
          <DatasetSelect 
            key="DatasetSelect" 
            datasets={providerObj.value} 
            value={this.props.datasetSelected} 
          />
        );
        var datasetObj = _.find(providerObj.value, {'name': this.props.datasetSelected});
        if (datasetObj && datasetObj.value) {
          toRender.push(
            <DimensionsSelect 
              key="DimensionsSelect" 
              dimensions={datasetObj.value} 
              value={this.props.dimensionsSelected} 
              dimensionsObjSelected={this.props.dimensionsObjSelected} 
            />
          );
          toRender.push(
            <DimensionsBox 
              key="DimensionsBox"
              dimensionsObjSelected={this.props.dimensionsObjSelected} 
            />
          );
        }
      }
    }
    return (
      <div>
        {toRender}
      </div>
    );
  }
});

module.exports = ParamsBox;