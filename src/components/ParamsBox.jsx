var React = require('react');
var _ = require('lodash');
import { FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
var Loader = require('react-loader');

var appActions = require('../actions/actions');

var DimensionConfig = React.createClass({
  getOptions: function () {
    var options = [];
    _.forEach(this.props.providers, function (name) {
      options.push(<option key={name} value={name}>{name}</option>);
    });
    return options;
  },
  onUserInput: function (event) {
    appActions.dimensionValueChange(event, this.props.name);
  },
  render: function () {
    if (!this.props.providers) {
      return (<div></div>);
    }
    var options = this.getOptions();
    if (_.isEmpty(options)) {
      return (<Alert key="dataNotFound" bsStyle="danger">Error: data not found</Alert>);
    } else {
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
  }
});

var DimensionsBox = React.createClass({
  render: function () {
    var toRender = [];
    _.forEach(this.props.providers, function (el) {
      toRender.push(
        <DimensionConfig
          key={el.name}
          data={el.value}
          name={el.name}
          value={el.selected} 
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

var CustomSelect = React.createClass({
  getOptions: function () {
    var options = [];
    _.forEach(this.props.providers, function (el) {
      var name = el.name;
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
          <FormGroup controlId={"formControlsSelect"+this.props.name}>
            <ControlLabel>{this.props.name}:</ControlLabel>
            <FormControl componentClass="select" onChange={this.props.onChange} value={this.props.value} multiple={this.props.multiple}>
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
    var providers = this.props.providers;
    if (providers) {
      var loadingProviders = _.indexOf(this.props.loading, 'providers') > -1;
      toRender.push(
        <CustomSelect
          key="ProviderSelect"
          name="Provider"
          data={providers}
          value={this.props.providerSelected}
          onChange={appActions.providerChange}
          loading={loadingProviders} 
        />
      );
      var providerObjValue = _.get(this.props.providerObj, 'value');
      if (providerObjValue) {
        var loadingDatasets = _.indexOf(this.props.loading, 'datasets') > -1;
        toRender.push(
          <CustomSelect
            key="DatasetSelect"
            name="Dataset"
            data={providerObjValue}
            value={this.props.datasetSelected}
            onChange={appActions.datasetChange}
            loading={loadingDatasets} 
          />
        );
        var datasetObjValue = _.get(this.props.datasetObj, 'value');
        if (datasetObjValue) {
          var loadingDimensions = _.indexOf(this.props.loading, 'dimensions') > -1;
          toRender.push(
            <CustomSelect 
              key="DimensionsSelect"
              name="Dimensions"
              data={datasetObjValue}
              value={this.props.dimensionsSelected}
              onChange={appActions.dimensionsChange}
              loading={loadingDimensions} 
              multiple={true} 
            />
          );
          var dimensionsObjSelected = this.props.dimensionsObjSelected;
          if (dimensionsObjSelected) {
            toRender.push(
              <DimensionsBox
                key="DimensionsBox"
                data={dimensionsObjSelected}
              />
            );
          }
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