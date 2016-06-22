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

    function makePeriod (period, type) {

    }

    if (series && !_.isEmpty(series)) {
      let data = {};
      _.forEach(series, function (serie) {
        if (serie['checked']) {
          if (!serie['values']) {
            actions[c.requestValues].triggerAsync(serie['slug']);
            return;
          }

          _.forEach(serie['values'], function (value) {
            let period = value.period;
            let key;
            let customHandling = _.some(['Q', 'M', 'W', 'D'], function (el) {
              return period.indexOf(el) > 1;
            });
            if (customHandling) {
              let type;
              switch (serie['frequency']) {
                case 'Q':
                  type = 'quarters';
                  break;
                case 'M':
                  type = 'months';
                  break;
                case 'W':
                  type = 'weeks';
                  break;
                case 'D':
                  type = 'days';
                  break;
              }
              let year = _.join(_.slice(period, 0, 4), '');
              let mult = parseInt( _.trim( _.join( _.slice(period, 4), ''), '-QMWD') ) - 1;
              key = moment(year).add(mult, type).toISOString();
            } else {
              key = moment(period).toISOString();
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
        let keys = Object.keys(data);
        keys.sort(function (a, b) {
        	return (moment(a).isBefore(moment(b))) ? -1 : 1;
        });
        graphData = _.map(keys, function (key) {
          let tmp = [];
          tmp.push(moment(key).toDate());
          _.forEach(data[key], function (el) {
            tmp.push(parseFloat(el));
          });
          if (graphLabels.length !== tmp.length) {
            let tmp = _.fill(Array(graphLabels.length), 0, 1);
            tmp[0] = moment(key).toDate();
            return tmp;
          }
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
