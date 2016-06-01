var React = require('react');
var _ = require('lodash');
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
var url = require('url');



var QueryBox = React.createClass({

  makeUrl: function () {
    var URL = _.cloneDeep(this.props.config);
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
    var url = this.makeUrl();
    return (
      <FormGroup controlId="formControlsText">
        <FormControl type="text" disabled value={url} />
      </FormGroup>
    );
  }
});

module.exports = QueryBox;