var React = require('react');
var _ = require('lodash');
import { Button, Well } from 'react-bootstrap';

var c = require('../../constants');
var actions = require('../../actions');



var QueryBox = React.createClass({

  makeQuerystring: function () {
    var tmp = _.join(_.map(
      _.filter(this.props.dimensions, function(el) {
        return !_.isEmpty(el.selected);
      }),
      function (el) {
        return el.name+'='+_.join(el.selected, '+');
      }
    ), '&');
    return (!_.isEmpty(tmp) ? '&': '') + tmp;
  },

  render: function () {
    var requestJSON = function () {
      actions[c.REQUEST_JSON](this.props.dataset, this.makeQuerystring());
    }.bind(this);
    return (
      <Well>
        <Button onClick={requestJSON} disabled={!this.props.validJSON}>
          Request JSON
        </Button>
      </Well>
    );
  }
});

module.exports = QueryBox;