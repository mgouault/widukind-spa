var React = require('react');
var _ = require('lodash');
var ClipboardButton = require('react-clipboard.js')
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
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
      <div className="urlDisplay">
        <Col sm={11}>
          <FormGroup controlId="formControlsText">
            <FormControl type="text" disabled value={url} />
          </FormGroup>
        </Col>
        <Col sm={1}>
          <ClipboardButton data-clipboard-text={url}>
            <img src="assets/clippy.svg" alt="Copy to clipboard" />
          </ClipboardButton>
        </Col>
      </div>
    );
  }
});

module.exports = QueryBox;
