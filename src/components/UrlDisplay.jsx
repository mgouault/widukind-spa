let React = require('react');
let ClipboardButton = require('react-clipboard.js');
let { FormGroup, FormControl, Col } = require('react-bootstrap');

let buildURL = require('../lib/buildURL');



let UrlDisplay = React.createClass({

  render: function () {
    let URL = buildURL(this.props.config, {
      'pathname': '/datasets/' + this.props.request['dataset'] +'/values',
      'query': this.props.request['controls']
    });

    return (
      <div className="urlDisplayDiv">
        <Col sm={11}>
          <FormGroup controlId="formControlsText">
            <FormControl type="text" value={URL} disabled />
          </FormGroup>
        </Col>
        <Col sm={1}>
          <ClipboardButton data-clipboard-text={URL}>
            <img src="assets/clippy.svg" alt="Copy to clipboard" />
          </ClipboardButton>
        </Col>
      </div>
    );
  }
});

module.exports = UrlDisplay;
