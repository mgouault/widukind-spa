import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Dygraph } from 'react-dygraphs';



let SeriesGraph = React.createClass({

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
        let tmp = _.fill(Array(labels.length), null);
        tmp[0] = moment(key).toDate();
        return tmp;
      } else {
        return result;
      }
    });
  },

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
    _.forEach(serie['values'], function (value) {
      let key = this.makeKey(value['period'], value['frequency']);
      if (!acc['data'][key]) {
        acc['data'][key] = [];
      }
      acc['data'][key].push(value.value);
    }.bind(this));
    acc['labels'].push(serie['key']);
    return acc;
  },

  render: function () {
    let tmp = _.reduce(this.props.series, this.foo, {'data':{}, 'labels':['time']});
    let labels = tmp['labels'];
    let data = this.bar(tmp['data'], labels);

    return (
      <div className="seriesGraphDiv">
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

module.exports = SeriesGraph;
