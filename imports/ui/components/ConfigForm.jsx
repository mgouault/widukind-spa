import React from 'react';
import _ from 'lodash';
import { Panel, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

import actions from '../actions';



let ConfigForm = React.createClass({

	handleSubmit: function (event) {
		event.preventDefault();
		actions.updateConfig({
			'protocol': _.get(event, 'target.formConfigProtocol.value'),
			'host': _.get(event, 'target.formConfigHost.value'),
			'hostname': _.get(event, 'target.formConfigHostname.value'),
			'port': _.get(event, 'target.formConfigPort.value'),
			'pathname': _.get(event, 'target.formConfigPathname.value')
		});
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
