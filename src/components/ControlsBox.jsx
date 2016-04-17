var React = require('react');
var _ = require('lodash');
var $ = require('jquery');

var QueryBox = require('./QueryBox.jsx');
var ParamsBox = require('./ParamsBox.jsx');

var ControlsBox = module.exports = React.createClass({
  getInitialState: function () {
    return {
      'data': [],
      'providerSelected': 'Select',
      'datasetSelected': 'Select',
      'dimensionsSelected': [],
      'dimensionsObjSelected': []
    };
  },
  componentDidMount: function () {
    this.checkData({});
  },
  providerChange: function (event) {
    this.checkData({
      'providerSelected': event.target.value,
      'datasetSelected': 'Select',
      'dimensionsSelected': [],
      'dimensionsObjSelected': []
    });
  },
  datasetChange: function (event) {
    this.checkData({
      'datasetSelected': event.target.value,
      'dimensionsSelected': [],
      'dimensionsObjSelected': []
    });
  },
  dimensionsChange: function (event, dimensions) {
    var options = event.target.options;
    var dimensionsSelected = [];
    var dimensionsObjSelected = [];
    for (var i = 0; i < options.length ; i++) {
      if (options[i].selected) {
        var name = options[i].value;
        dimensionsSelected.push(name);
        dimensionsObjSelected.push({
          'name': name,
          'value': _.get(_.find(dimensions, {'name': name}), 'value')
        });
      }
    }
    this.checkData({
      'dimensionsSelected': dimensionsSelected,
      'dimensionsObjSelected': dimensionsObjSelected
    });
  },
  dimensionsValueChange: function (event, dimension) {
    var options = event.target.options;
    var dimensionsObjSelected = this.state.dimensionsObjSelected;
    var values = [];
    for (var i = 0; i < options.length ; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    var index = _.findIndex(dimensionsObjSelected, {'name': dimension});
    dimensionsObjSelected[index].selected = values;
    this.checkData({
      'dimensionsObjSelected': dimensionsObjSelected
    });
  },
  checkData: function (obj) {
    function refreshData (url) {
      var tmpData = {};
      $.ajax({
        url: url,
        async: false,
        success: function (received) {
          if (_.has(received, 'error')) {
            console.error(url, received.error.toString());
          } else {
            tmpData = received.data;
          }
        },
        error: function (xhr, status, err) {
          console.error(url, status, err.toString());
        }
      });
      return tmpData;
    }
    var clone = _.assign(_.clone(this.state), obj);
    if (!clone.data || _.isEmpty(clone.data)) {
      var tmp = refreshData('http://widukind-api-dev.cepremap.org/api/v1/json/providers/keys');
      clone.data = [];
      tmp.forEach(function (el, index) {
        clone.data[index] = {
          'name': el,
          'value': []
        }
      });
      this.setState(clone);
      return;
    }
    var providerObj = _.find(clone.data, {'name': clone.providerSelected});
    if (!providerObj) {
      return;
    }
    if (!providerObj.value || _.isEmpty(providerObj.value)) {
      var tmp = refreshData('http://widukind-api-dev.cepremap.org/api/v1/json/providers/'+clone.providerSelected+'/datasets/keys');
      providerObj.value = [];
      tmp.forEach(function (el, index) {
        providerObj.value[index] = {
          'name': el,
          'value': []
        }
      });
      this.setState(clone);
      return;
    }
    var datasetObj = _.find(providerObj.value, {'name': clone.datasetSelected});
    if (!datasetObj) {
      return;
    }
    if (!datasetObj.value || _.isEmpty(datasetObj.value)) {
      var tmp = refreshData('http://widukind-api-dev.cepremap.org/api/v1/json/datasets/'+clone.datasetSelected+'/dimensions');
      datasetObj.value = [];
      Object.keys(tmp).forEach(function (el, index, array) {
        datasetObj.value[index] = {
          'name': el,
          'value': Object.keys(tmp[el])
        }
      });
      this.setState(clone);
      return;
    }
    this.setState(obj);
  },
  render: function () {
    var toRender = [];
    if (this.state.datasetSelected && this.state.datasetSelected != 'Select') {
      toRender.push(<QueryBox dataset={this.state.datasetSelected} values={this.state.dimensionsObjSelected} />);
    }
    return (
      <div>
        {toRender}
        <ParamsBox data={this.state.data} providerSelected={this.state.providerSelected} datasetSelected={this.state.datasetSelected} dimensionsSelected={this.state.dimensionsSelected} dimensionsObjSelected={this.state.dimensionsObjSelected} providerChange={this.providerChange} datasetChange={this.datasetChange} dimensionsChange={this.dimensionsChange} dimensionsValueChange={this.dimensionsValueChange} />
      </div>
    );
  }
});