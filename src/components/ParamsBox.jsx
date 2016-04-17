var React = require('react');
var _ = require('lodash');

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
    this.props.onUserInput(event, this.props.dimensions);
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
      <div>
        Dimensions:
        <select onChange={this.onUserInput} value={this.props.value} multiple={true}>
          {options}
        </select>
      </div>
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
      <div>
        Dataset:
        <select onChange={this.props.onUserInput} value={this.props.value}>
          <option>Select</option>
          {options}
        </select>
      </div>
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
      <div>
        Provider:
        <select onChange={this.props.onUserInput} value={this.props.value}>
          <option>Select</option>
          {options}
        </select>
      </div>
    );
  }
});

var ParamsBox = module.exports = React.createClass({
  render: function () {
    var toRender = [];
    var providers = this.props.data;
    if (providers) {
      toRender.push(<ProviderSelect key="ProviderSelect" providers={providers} value={this.props.providerSelected} onUserInput={this.props.providerChange} />);
      var providerObj = _.find(providers, {'name': this.props.providerSelected});
      if (providerObj && providerObj.value) {
        toRender.push(<DatasetSelect key="DatasetSelect" datasets={providerObj.value} value={this.props.datasetSelected} onUserInput={this.props.datasetChange} />);
        var datasetObj = _.find(providerObj.value, {'name': this.props.datasetSelected});
        if (datasetObj && datasetObj.value) {
          toRender.push(<DimensionsSelect key="DimensionsSelect" dimensions={datasetObj.value} value={this.props.dimensionsSelected} onUserInput={this.props.dimensionsChange} />);
          toRender.push(<DimensionsBox key="DimensionsBox" dimensionsObjSelected={this.props.dimensionsObjSelected} onUserInput={this.props.dimensionsValueChange} />);
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