let React = require('react');
let ClipboardButton = require('react-clipboard.js')
import { FormGroup, FormControl, Col } from 'react-bootstrap';



function libBuildURL (configObj, reqObj) {
  let url = require('url');
  let _ = require('lodash');
  let URLObj = _.cloneDeep(configObj);
  URLObj['pathname'] = (URLObj['pathname'] || '') + reqObj['pathname'];
  _.assign(URLObj['query'], reqObj['query']);
  return unescape(url.format(URLObj));
}



let UrlDisplay = React.createClass({

  render: function () {
    let URL = libBuildURL(this.props.config, {
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
