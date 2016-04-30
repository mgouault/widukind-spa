var React = require('react');
var _ = require('lodash');
import { Button } from 'react-bootstrap';

var appActions = require('../actions/actions');

var QueryBox = React.createClass({
  makeUrl: function () {
    var url = '';
    url = 'http://widukind-api-dev.cepremap.org/api/v1/json/datasets/'+this.props.dataset+'/values?limit=10';
    var values = this.props.values;
    _.forEach(values, function (el) {
      var name = el.name;
      var selected = el.selected;
      if (typeof selected !== 'undefined' && !_.isEmpty(selected)) {
        var params = '';
        for (var j = 0; j < selected.length ; j++) {
          params += ((j > 0) ? '+' : '') + selected[j];
        }
        url += '&' + name + '=' + params;
      }
    });
    return url;
  },
  render: function () {
    var url = this.makeUrl();
    var requestJSON = function () {
      appActions.requestJSON(url);
    };
    return (
      <div>
        <pre>{url}</pre>
        <Button onClick={requestJSON}>
          Request JSON
        </Button>
      </div>
    );
  }
});

module.exports = QueryBox;