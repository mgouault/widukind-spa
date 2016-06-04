var React = require('react');
var _ = require('lodash');
var Loader = require('react-loader');
var {Dygraph} = require('react-dygraphs');
var moment = require('moment');



var container = React.createClass({

  render: function () {
    var series = this.props.series;
    var graphData = [[0, 0], [1, 1]];

    if (series && !_.isEmpty(series)) {
      var data = {};
      _.forEach(series, function (serie) {
        _.forEach(serie['values'], function (value) {
          var key = moment(value.period).toISOString();
          if (!key) {
            return;
          }
          if (!data[key]) {
            data[key] = [];
          }
          data[key].push(value.value);
        });
      });
      if (!_.isEmpty(data)) {
        graphData = _.map(Object.keys(data), function (key_) {
          var tmp = [];
          tmp.push(moment(key_).toDate());
          _.forEach(data[key_], function (el) {
            tmp.push(parseFloat(el));
          });
          return tmp;
        });
      }
    }
    
    return (
      <Dygraph
        key="dygraph"
        data={graphData}
      />
    );
  }

});

module.exports = container;
