var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var url = require('url');
var ClipboardButton = require('react-clipboard.js')
import { FormGroup, FormControl, Col } from 'react-bootstrap';



var UrlDisplay = React.createClass({

  render: function () {
    var url = this.props.url;
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
