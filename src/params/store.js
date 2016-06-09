var _ = require('lodash');
var Reflux = require('reflux');

var c = require('../constants');
var actions = require('../actions');

var pattern = {};
pattern[c.providers] = [];
pattern[c.selectedProvider] = '';
pattern[c.datasets] = [];
pattern[c.selectedDataset] = '';
pattern[c.dimensions] = [];
pattern[c.selectedDimensions] = [];
pattern[c.series] = [];



var store = Reflux.createStore({
  listenables: [actions],

  getInitialState: function () {
    this.state = _.cloneDeep(pattern);
    return this.state;
  },

  /* Getters-Setters */
  getValidData: function (key) {
    if ((typeof this.state[key] !== typeof pattern[key]) ||
      ((this.state[key] instanceof Array) !== (pattern[key] instanceof Array))) {
      this.state[key] = pattern[key];
    }
    return this.state[key];
  },
    /* Providers */
  setSelectedProvider: function (data) {
    this.state[c.selectedProvider] = data;
    this.setDatasets([]);
    this.setSelectedDataset('');
  },
    /* Datasets */
  setDatasets: function (data) {
    this.state[c.datasets] = _.map(data, function (el) {
      return {'name': el, 'value': []};
    });
  },

  setSelectedDataset: function (data) {
    this.state[c.selectedDataset] = data;
    this.setDimensions({});
    this.setSelectedDimensions([]);
  },
    /* Dimensions */
  setDimensions: function (data) {
    this.state[c.dimensions] = _.map(Object.keys(data), function (el) {
      var value = Object.keys(data[el]);
      if (el === 'frequency') {
        value = _.map(value, _.upperCase);
      }
      return {'name': el, 'value': value};
    });
  },

  setSelectedDimensions: function (data) {
    this.state[c.selectedDimensions] = _.map(data, function (el) {
      var name = el.value;
      return {
        'name': name,
        'value': _.get(_.find(this.getValidData(c.dimensions), {'name': name}), 'value'),
        'selected': _.get(_.find(this.getValidData(c.selectedDimensions), {'name': name}), 'selected')
      };
    }.bind(this));
  },
  /**/

  /* onActions */
  onProvidersMissingFailed: console.error,
  onProvidersMissingCompleted: function (data) {
    this.state[c.providers] = _.map(data, function (el) {
      return {'name': el, 'value': []};
    });
    var providers = this.getValidData(c.providers);
    if (!_.isEmpty(providers)) {
      var selectedProvider = this.getValidData(c.selectedProvider);
      if (_.isEmpty(selectedProvider)) {
        this.setSelectedProvider(_.head(providers).name);
      }
    }
    this.trigger(this.state);
  },

  onDatasetsMissingFailed: console.error,
  onDatasetsMissingCompleted: function (data) {
    this.setDatasets(data);
    var datasets = this.getValidData(c.datasets);
    if (!_.isEmpty(datasets)) {
      var selectedDataset = this.getValidData(c.selectedDataset);
      if (_.isEmpty(selectedDataset)) {
        this.setSelectedDataset(_.head(datasets).name);
      }
    }
    this.trigger(this.state);
  },

  onDimensionsMissingFailed: console.error,
  onDimensionsMissingCompleted: function (data) {
    this.setDimensions(data);
    this.trigger(this.state);
  },

  onChangeProvider: function (data) {
    this.setSelectedProvider(data.value);
    this.trigger(this.state);
  },

  onChangeDataset: function (data) {
    this.setSelectedDataset(data.value);
    this.trigger(this.state);
  },

  onChangeDimensions: function (data) {
    this.setSelectedDimensions(data);
    this.trigger(this.state);
  },

  onChangeDimensionValues: function (data, dimensionName) {
    _.set(
      _.find(this.state[c.selectedDimensions], {'name': dimensionName}),
      'selected',
      _.map(data, function (el) { return el.value; })
    );
    this.trigger(this.state);
  }
  /**/

});

module.exports = store;
