import { Meteor } from 'meteor/meteor';

import React from 'react';
import _ from 'lodash';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';



let ConfigForm = React.createClass({

	handleSubmit: function (event) {
		event.preventDefault();
		let value = _.get(event, 'target.formConfig.value');
		Meteor.call('config.modify', { 'protocol': value });
	},

	render: function () {
		return (
			<form onSubmit={this.handleSubmit}>
				<FormGroup controlId="formConfig">
					<ControlLabel>API's URL configuration</ControlLabel>
					<FormControl
						type="text"
					/>
				</FormGroup>
				<Button type="submit">
		      Submit
		    </Button>
			</form>
		);
	}
});

module.exports = ConfigForm;
