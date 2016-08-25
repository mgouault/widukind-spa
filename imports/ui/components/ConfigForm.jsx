import React from 'react';
import _ from 'lodash';
import { Panel, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

import actions from '../actions';

// todo: pre-fill values

let ConfigForm = React.createClass({

	handleSubmit: function (event) {
		event.preventDefault();
		let protocol = _.get(event, 'target.formConfigProtocol.value');
		let host = _.get(event, 'target.formConfigHost.value');
		let hostname = _.get(event, 'target.formConfigHostname.value');
		let port = _.get(event, 'target.formConfigPort.value');
		let pathname = _.get(event, 'target.formConfigPathname.value');
		actions.updateConfig(_.cloneDeep({ protocol, host, hostname, port, pathname }));
		_.set(event, 'target.formConfigProtocol.value', null);
		_.set(event, 'target.formConfigHost.value', null);
		_.set(event, 'target.formConfigHostname.value', null);
		_.set(event, 'target.formConfigPort.value', null);
		_.set(event, 'target.formConfigPathname.value', null);
	},

	handleReset: function () {
		event.preventDefault();
		actions.resetConfig();
	},

	render: function () {
		return (
			<Panel header="API's URL configuration">
				<form onSubmit={this.handleSubmit}>
					<FormGroup controlId="formConfigProtocol">
						<ControlLabel>protocol:</ControlLabel><FormControl type="text"/>
					</FormGroup>
					<FormGroup controlId="formConfigHost">
						<ControlLabel>host:</ControlLabel><FormControl type="text"/>
					</FormGroup>
					<FormGroup controlId="formConfigHostname">
						<ControlLabel>hostname:</ControlLabel><FormControl type="text"/>
					</FormGroup>
					<FormGroup controlId="formConfigPort">
						<ControlLabel>port:</ControlLabel><FormControl type="text"/>
					</FormGroup>
					<FormGroup controlId="formConfigPathname">
						<ControlLabel>pathname:</ControlLabel><FormControl type="text"/>
					</FormGroup>
					<Button type="submit">
			      Submit
			    </Button>
					<Button onClick={this.handleReset}>
			      Reset configuration
			    </Button>
				</form>
	    </Panel>
		);
	}
});

module.exports = ConfigForm;
