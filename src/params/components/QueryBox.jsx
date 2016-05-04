var React = require('react');
var _ = require('lodash');
import { Button, Well } from 'react-bootstrap';

var constants = require('../../constants');
var actions = require('../../actions');



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
      actions[constants.REQUEST_JSON](url);
    }.bind(this);
    // loader:on if (dataset || values) not valid
    return (
      <Well>
        <pre>
          {url}
        </pre>
        <Button onClick={requestJSON} disabled={!true}>
          Request JSON
        </Button>
      </Well>
    );
  }
});

module.exports = QueryBox;