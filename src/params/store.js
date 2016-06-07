var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var Reflux = require('reflux');

var actions = require('../actions');
var apiCall = require('../apiCall');



var CHANGE_EVENT = 'change';

var statePattern = {};
statePattern[c.providers] = [];
statePattern[c.selectedProvider] = '';
statePattern[c.datasets] = [];
statePattern[c.selectedDataset] = '';
statePattern[c.dimensions] = [];
statePattern[c.selectedDimensions] = [];
statePattern[c.series] = [];

var _state = _.cloneDeep(statePattern);



function getValidData (key) {
  if ((typeof _state[key] !== typeof statePattern[key]) ||
    ((_state[key] instanceof Array) !== (statePattern[key] instanceof Array))) {
    _state[key] = statePattern[key];
  }
  return _state[key];
}





module.exports = Reflux.createStore({
  listenables: [actions],

  /* CheckData */
  checkData: function () {
    var self = this;
    var promisesAreFun = function (key) {
      return function () {
        var request, getData, setData, getSelectedData, setSelectedData;
        switch (key) {
          case c.providers:
            request = {
              'pathname': '/providers',
              'query': {}
            };
            getData = self.getProviders;
            setData = self.setProviders;
            getSelectedData = self.getSelectedProvider;
            setSelectedData = self.setSelectedProvider;
            break;
          case c.datasets:
            request = {
              'pathname': '/datasets',
              'query': {'provider': self.getSelectedProvider()}
            };
            getData = self.getDatasets;
            setData = self.setDatasets;
            getSelectedData = self.getSelectedDataset;
            setSelectedData = self.setSelectedDataset;
            break;
          case c.dimensions:
            request = {
              'pathname': '/dimensions',
              'query': {'dataset': self.getSelectedDataset()}
            };
            getData = self.getDimensions;
            setData = self.setDimensions;
            getSelectedData = self.getSelectedDimensions;
            setSelectedData = self.setSelectedDimensions;
            break;
        }
        /* Stops checkData if provider/dataset not selected */
        if ((key === c.datasets && _.isEmpty(_state[c.selectedProvider]))
          || (key === c.dimensions && _.isEmpty(_state[c.selectedDataset]))) {
          throw null;
        }
        /* Set select default value if it's undefined */
        var setDefault = function () {
          var value = getSelectedData();
          if (_.isEmpty(value) && key !== c.dimensions) {
            value = _.get(_.head(getData()), 'name', '');
            setSelectedData(value);
          }
        };
        if (!_.isEmpty(getData())) {
          setDefault();
          return Promise.resolve();
        }
        /* Fetch missing data */
        _state[key] = undefined; // Set 'loading state'
        self.emitChange();
        return apiCall(request)
          .then(setData)
          .then(setDefault);
      }
    };
    return promisesAreFun(c.providers)().then(self.emitChange)
      .then(promisesAreFun(c.datasets)).then(self.emitChange)
      .then(promisesAreFun(c.dimensions)).then(self.emitChange)
      .then(self.requestSeries).then(self.emitChange)
      .catch(function () {});
  },
  /**/

  requestSeries: function () {
    var dataset = _state[c.selectedDataset];
    if (!dataset) {
      return Promise.resolve();
    }
    return apiCall({
      'pathname': '/series',
      'query': {
        'dataset': dataset,
        'controls': _state[c.dimensions]
      }
    }).then(function (data) {
      _state[c.series] = data;
    });
  },

  getInitialState: function () {
    return _state;
  },

  /* Getters-Setters */
    /* Providers */
  getProviders: function () {
    return getValidData(c.providers);
  },
  setProviders: function (data) {
    if (data === null) {
      return _state[c.providers] = null;
    }
    _state[c.providers] = _.map(data, function (el) {
      return {'name': el, 'value': []};
    });
  },
  getSelectedProvider: function () {
    return getValidData(c.selectedProvider);
  },
  setSelectedProvider: function (data) {
    _state[c.selectedProvider] = data;
    this.setDatasets([]);
    this.setSelectedDataset('');
  },
    /* Datasets */
  getDatasets: function () {
    return getValidData(c.datasets);
  },
  setDatasets: function (data) {
    if (data === null) {
      return _state[c.datasets] = null;
    }
    _state[c.datasets] = _.map(data, function (el) {
      return {'name': el, 'value': []};
    });
  },
  getSelectedDataset: function () {
    return getValidData(c.selectedDataset);
  },
  setSelectedDataset: function (data) {
    _state[c.selectedDataset] = data;
    this.setDimensions({});
    this.setSelectedDimensions([]);
  },
    /* Dimensions */
  getDimensions: function () {
    return getValidData(c.dimensions);
  },
  setDimensions: function (data) {
    if (data === null) {
      return _state[c.dimensions] = null;
    }
    _state[c.dimensions] = _.map(Object.keys(data), function (el) {
      var value = Object.keys(data[el]);
      if (el === 'frequency') {
        value = _.map(value, _.upperCase);
      }
      return {'name': el, 'value': value};
    });
  },

  getSelectedDimensions: function () {
    return getValidData(c.selectedDimensions);
  },
  setSelectedDimensions: function (data) {
    _state[c.selectedDimensions] = _.map(data, function (el) {
      var name = el.value;
      return {
        'name': name,
        'value': _.get(_.find(this.getDimensions(), {'name': name}), 'value'),
        'selected': _.get(_.find(this.getSelectedDimensions(), {'name': name}), 'selected')
      };
    });
  },
  /**/

  onChangeProvider: function (value) {
    this.setSelectedProvider(value);
    this.checkData();
  },
  onChangeDataset: function (value) {
    this.setSelectedDataset(value);
    this.checkData();
  },
  onChangeDimensions: function (data) {
    this.setSelectedDimensions(data);
    this.checkData();
  },
  onChangeDimensionValues: function (data, dimensionName) {
    _.set(
      _.find(_state[c.selectedDimensions], {'name': dimensionName}),
      'selected',
      _.map(data, function (el) { return el.value; })
    );
    this.checkData();
  }
  // onRequestSeries: function () {},
  // onUpdateConfig: function () {},
  // onDisplayLog: function () {},
  // onSelectRow: function () {},

});
