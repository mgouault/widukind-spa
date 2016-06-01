var React = require('react');
var _ = require('lodash');
import { Button, Well, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
var url = require('url');

var c = require('../../constants');
var actions = require('../../actions');



var QueryBox = React.createClass({

  makeUrl: function () {
    var URL = _.clone(this.props.config);
    URL['pathname'] += '/datasets/'+this.props.dataset+'/values';
    _.forEach(this.props.dimensions, function (el) {
      if (!_.isEmpty(el.selected)) {
        var tmp = {};
        tmp[el.name] = _.join(el.selected, '+');
        _.assign(URL['query'], tmp);
      }
    });
    return unescape(url.format(URL));
  },

  render: function () {
    var requestJSON = function () {
      actions[c.REQUEST_JSON](this.props.dataset, this.props.dimensions);
    }.bind(this);
    var url = this.makeUrl();
    return (
      <div>
        <FormGroup controlId="formControlsText">
          <ControlLabel>Text</ControlLabel>
          <FormControl type="text" disabled value={url} />
        </FormGroup>
        <Well>
          <Button onClick={requestJSON} disabled={!this.props.validJSON}>
            Request JSON
          </Button>
        </Well>
      </div>
    );
  }
});

module.exports = QueryBox;