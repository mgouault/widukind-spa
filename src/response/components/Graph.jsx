var React = require('react');
var _ = require('lodash');
var {Dygraph} = require('react-dygraphs');
var moment = require('moment');



var container = React.createClass({

  render: function () {
    var toRender = [];
    var series = this.props.series;
    if (series) {
      var data = {};
      //_.forEach(series, function (serie) {
      var serie = _.head(series);
      if (serie) {
        _.forEach(serie.values, function (value) {
          var key = moment(value.period).toISOString();
          if (!key) {
            return;
          }
          if (!data[key]) {
            data[key] = [];
          }
          data[key].push(value.value);
        });
      }
      //});

      var graphData = _.map(Object.keys(data), function (key_) {
        var tmp = [];
        tmp.push(moment(key_).toDate());
        _.forEach(data[key_], function (el) {
          tmp.push(parseFloat(el));
        });
        return tmp;
      });

      if (!_.isEmpty(graphData) && !_.isEmpty(_.head(graphData))) {
        toRender.push(
          <Dygraph
            key="dygraph"
            data={graphData}
          />
        );
      }
    }
    
    return (
      <div>
        {toRender}
      </div>
    );
  }

});

module.exports = container;