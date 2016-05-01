var React = require('react');
var _ = require('lodash');
import { FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
var Loader = require('react-loader');

var appActions = require('../actions/actions');

var DimensionConfig = React.createClass({
  getOptions: function () {
    var options = [];
    var values = this.props.dimensionsValues;
    _.forEach(values, function (el) {
      options.push(
        <option
          key={el}
          value={el}>
          {el}
        </option>);
    });
    return options;
  },
  onUserInput: function (event) {
    appActions.dimensionValueChange(event, this.props.name, this.props.dimensionsObjSelected);
  },
  render: function () {
    if (!this.props.dimensionsValues) {
      return (<div></div>);
    }
    var options = this.getOptions();
    if (_.isEmpty(options)) {
      return (<Alert key="dataNotFound" bsStyle="danger">Error: data not found</Alert>);
    }
    return (
      <Loader loaded={!this.props.loading}>
      <FormGroup controlId="formControlsSelectMultipleDimensionsValues">
        <ControlLabel>Select {this.props.name}:</ControlLabel>
        <FormControl componentClass="select" onChange={this.onUserInput} value={this.props.value} multiple>
          {options}
        </FormControl>
      </FormGroup>
      </Loader>
    );
  }
});

var DimensionsBox = React.createClass({
  render: function () {
    var toRender = [];
    var dimensions = this.props.dimensionsObjSelected;
    _.forEach(dimensions, function (el) {
      toRender.push(
        <DimensionConfig
          key={el.name}
          dimensionsValues={el.value}
          name={el.name}
          value={el.selected}
          dimensionsObjSelected={dimensions}
        />
      );
    });
    return (
      <div>
        {toRender}
      </div>
    );
  }
});

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
    if (_.isEmpty(options) && !this.props.loading) {
      return (<Alert key="dataNotFound" bsStyle="danger">Error: data not found</Alert>);
    } else {
      return (
        <Loader loaded={!this.props.loading}>
          <FormGroup controlId="formControlsSelectMultipleDimensions">
            <ControlLabel>Dimensions:</ControlLabel>
            <FormControl componentClass="select" onChange={this.onUserInput} value={this.props.value} multiple>
              {options}
            </FormControl>
          </FormGroup>
        </Loader>
      );
    }
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
    if (_.isEmpty(options) && !this.props.loading) {
      return (<Alert key="dataNotFound" bsStyle="danger">Error: data not found</Alert>);
    } else {
      return (
        <Loader loaded={!this.props.loading}>
          <FormGroup controlId="formControlsSelectDataset">
            <ControlLabel>Dataset:</ControlLabel>
            <FormControl componentClass="select" onChange={appActions.datasetChange} value={this.props.value}>
              <option>Select</option>
              {options}
            </FormControl>
          </FormGroup>
        </Loader>
      );
    }
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
    if (_.isEmpty(options) && !this.props.loading) {
      return (<Alert key="dataNotFound" bsStyle="danger">Error: data not found</Alert>);
    } else {
      return (
        <Loader loaded={!this.props.loading}>
          <FormGroup controlId="formControlsSelectProvider">
            <ControlLabel>Provider:</ControlLabel>
            <FormControl componentClass="select" onChange={appActions.providerChange} value={this.props.value}>
              <option>Select</option>
              {options}
            </FormControl>
          </FormGroup>
        </Loader>
      );
    }
  }
});

var ParamsBox = React.createClass({
  render: function () {
    var toRender = [];
    var providers = this.props.data;
    if (providers) {
      var loadingProviders = _.indexOf(this.props.loading, 'providers') > -1;
      toRender.push(
        <ProviderSelect 
          key="ProviderSelect" 
          providers={providers} 
          value={this.props.providerSelected} 
          loading={loadingProviders} 
        />
      );
      var providerObj = _.find(providers, {'name': this.props.providerSelected});
      if (providerObj && providerObj.value) {
        var loadingDatasets = _.indexOf(this.props.loading, 'datasets') > -1;
        toRender.push(
          <DatasetSelect 
            key="DatasetSelect" 
            datasets={providerObj.value} 
            value={this.props.datasetSelected}
            loading={loadingDatasets} 
          />
        );
        var datasetObj = _.find(providerObj.value, {'name': this.props.datasetSelected});
        if (datasetObj && datasetObj.value) {
          var loadingDimensions = _.indexOf(this.props.loading, 'dimensions') > -1;
          toRender.push(
            <DimensionsSelect 
              key="DimensionsSelect" 
              dimensions={datasetObj.value} 
              value={this.props.dimensionsSelected} 
              dimensionsObjSelected={this.props.dimensionsObjSelected}
              loading={loadingDimensions} 
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