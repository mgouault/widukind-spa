import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import './stylesheets/bootstrap.min.css';
import './stylesheets/react-bootstrap-table.min.css';
import './stylesheets/react-select.css';
import './stylesheets/react-virtualized.css';
import './stylesheets/react-virtualized-select.css';

import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App.jsx';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
