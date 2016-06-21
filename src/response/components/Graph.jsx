var React = require('react');
var _ = require('lodash');
var Loader = require('react-loader');
var Dygraph = require('react-dygraphs').Dygraph;
var moment = require('moment');
var Dimensions = require('react-dimensions');

var c = require('../../constants');
var actions = require('../../actions');



var container = React.createClass({

  render: function () {
    if (this.props.loading) {
      return(<div className="graphDiv"><Loader loaded={false}><div></div></Loader></div>);
    }

    var series = this.props.series;
    var graphData = [];
    var graphLabels = ['period'];

    if (series && !_.isEmpty(series)) {
      var data = {};
      _.forEach(series, function (serie) {
        if (serie['checked']) {
          if (!serie['values']) {
            actions[c.requestValues].triggerAsync(serie['slug']);
            return;
          }
          _.forEach(serie['values'], function (value) {
            var period = value.period;
            if (period.indexOf('Q') > -1) {
              var mult = parseInt(_.last(period)) - 1;
              var str = _.slice(period, 0, 4);
              var key = moment(_.join(str, '')).add(3 * mult, 'months').toISOString();
            } else {
              var key = moment(period).toISOString();
            }
            if (!key) {
              return;
            }
            if (!data[key]) {
              data[key] = [];
            }
            data[key].push(value.value);
          });
          graphLabels.push(serie['key']);
        }
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

    if (_.isEmpty(graphData)) {
      return (<div className="graphDiv"></div>);
    }

    return (
      <div className="graphDiv">
        <Loader loaded={graphData !== null}>
          <Dygraph
            key="dygraph"
            data={graphData}
            labels={graphLabels}
            width={this.props.containerWidth - 30}
          />
        </Loader>
      </div>
    );
  }

});

module.exports = Dimensions()(container);
