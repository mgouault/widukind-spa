var React = require('react');
var _ = require('lodash');
var moment = require('moment');
var Loader = require('react-loader');
var Dygraph = require('react-dygraphs').Dygraph;
var ReactDimensions = require('react-dimensions');



var SeriesGraph = React.createClass({

  bar: function (data, labels) {
    let keys = Object.keys(data);
    keys.sort(function (a, b) {
      return (moment(a).isBefore(moment(b))) ? -1 : 1;
    });
    return _.map(keys, function (key) {
      let result = _.concat(
        [moment(key).toDate()],
        _.map(data[key], function (el) {
           return parseFloat(el);
        })
      );
      if (result.length !== labels.length) {
        let tmp = _.fill(Array(labels.length), 0, 1);
        tmp[0] = moment(key).toDate();
        return tmp;
      } else {
        return result;
      }
    });
  }

  makeKey: function (period, frequency) {
    let customHandling = _.some(['Q', 'M', 'W', 'D'], function (el) {
      return period.indexOf(el) > 1;
    });
    if (customHandling) {
      let type;
      switch (frequency) {
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
      return moment(year).add(mult, type).toISOString();
    } else {
      return moment(period).toISOString();
    }
  },

  foo: function (acc, serie) {
    let tmp = _.reduce(serie['values'], function (acc, value) {
      let key = makeKey(value['period'], value['frequency']);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(value.value);
      return acc;
    }, {});
    _.assign(acc['data'], tmp); //todo: not sure
    acc['labels'].push(serie['key']);
    return acc;
  },

  render: function () {
    if (this.props.loading) {
      return(<div className="graphDiv"><Loader loaded={false}><div></div></Loader></div>);
    }

    let series = this.props.series;
    if (!series || _.isEmpty(series)) {
      return (<div className="graphDiv"></div>);
    }

    let filteredSeries = _.filter(series, {'checked': true});
    let tmp = _.reduce(filteredSeries, this.foo, {'data':{}, 'labels':[]});

    let labels = tmp['labels'];
    let data = bar(tmp['data'], labels);

    return (
      <div className="graphDiv">
        <Dygraph
          key="dygraph"
          data={data}
          labels={labels}
          width={this.props.containerWidth - 30}
        />
      </div>
    );
  }

});

module.exports = ReactDimensions()(SeriesGraph);
