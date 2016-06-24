var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var url = require('url');
var ClipboardButton = require('react-clipboard.js')
import { FormGroup, FormControl, Col } from 'react-bootstrap';



var UrlDisplay = React.createClass({

  makeUrl: function () {
    var URL = _.cloneDeep(this.props.config);
    URL['pathname'] += '/datasets/'+this.props.selectedDataset+'/values';
    _.forEach(this.props.selectedDimensions, function (el) {
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
      <div className="urlDisplayDiv">
        <Col sm={11}>
          <FormGroup controlId="formControlsText">
            <FormControl type="text" value={url} disabled />
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

module.exports = UrlDisplay;
