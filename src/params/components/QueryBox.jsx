var React = require('react');
var _ = require('lodash');
import { Button, Well } from 'react-bootstrap';

var c = require('../../constants');
var actions = require('../../actions');



var QueryBox = React.createClass({

  makeUrl: function () {
    var tmp = _.join(_.map(
      _.filter(this.props.dimensions, function(el) {
        return !_.isEmpty(el.selected);
      }),
      function (el) {
        return el.name+'='+_.join(el.selected, '+');
      }
    ), '&');
    return 'http://widukind-api-dev.cepremap.org/api/v1/json/datasets/'+this.props.dataset+'/values?limit=10'
      + (!_.isEmpty(tmp) ? '&': '')
      + tmp;
  },

  render: function () {
    var url = this.makeUrl();
    var requestJSON = function () {
      actions[c.REQUEST_JSON](url);
    }.bind(this);
    return (
      <Well>
        <pre>
          {url}
        </pre>
        <Button onClick={requestJSON} disabled={!this.props.validJSON}>
          Request JSON
        </Button>
      </Well>
    );
  }
});

module.exports = QueryBox;