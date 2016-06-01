var React = require('react');
var _ = require('lodash');
var {Dygraph} = require('react-dygraphs');
var moment = require('moment');

var store = require('./store');
var ResponseBox = require('./components/ResponseBox.jsx');



var container = React.createClass({

  getInitialState: function () {
    return this.getState();
  },

  getState: function () {
    return store.getState();
  },

  _onChange: function() {
    this.setState(this.getState());
  },

  componentDidMount: function () {
    store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    store.removeChangeListener(this._onChange);
  },

  render: function () {
    var toRender = [];
    var series = this.state.json;
    if (series) {
      var data = {};
      _.forEach(series, function (serie) {
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
      });

      var graphData = _.map(Object.keys(data), function (key_) {
        var tmp = [];
        tmp.push(moment(key_));
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
        <ResponseBox
          json={series}
        />
      </div>
    );
  }

});

module.exports = container;