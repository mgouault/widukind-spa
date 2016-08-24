import React from 'react';
import Reflux from 'reflux';

import { Row, Col } from 'react-bootstrap';

import store from './store';
import actions from './actions';

import ConfigForm from './components/ConfigForm.jsx';

//todo pass action to ConfigForm

let ConfigPage = React.createClass({
	mixins: [Reflux.connect(store, 'storeState')],

	render: function () {
		let state = this.state.storeState;

		return (
			<Row>
				<Col sm={6} smOffset={3}>
					<ConfigForm />
				</Col>
			</Row>
		);
	}
});

module.exports = ConfigPage;
