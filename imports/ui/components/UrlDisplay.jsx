import React from 'react';
import ClipboardButton from 'react-clipboard.js';
import { FormGroup, FormControl, Col } from 'react-bootstrap';



let UrlDisplay = React.createClass({

  render: function () {
    let URL = this.props.url;
    return (
      <div className="urlDisplayDiv">
        <Col sm={11}>
          <FormGroup controlId="formControlsText">
            <FormControl type="text" value={URL} disabled />
          </FormGroup>
        </Col>
        <Col sm={1}>
          <ClipboardButton data-clipboard-text={URL}>
            <img src="../../../client/icons/clippy.svg" alt="Copy to clipboard" />
          </ClipboardButton>
        </Col>
      </div>
    );
  }
});

module.exports = UrlDisplay;
