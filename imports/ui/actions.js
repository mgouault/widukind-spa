import Reflux from 'reflux';
import _ from 'lodash';
import RefluxPromise from 'reflux-promise';
import Q from 'q';
import bluebird from 'bluebird';

Reflux.use(RefluxPromise(window.Promise));
Reflux.use(RefluxPromise(Q.Promise));
Reflux.use(RefluxPromise(bluebird));

import { getData } from './getData';

let actions = Reflux.createActions({
	'updateConfig': {},
	'resetConfig': {},
	'paginationSelectPerPage': {},
	'paginationSelectActivePage': {},
	'selectProviderValue': {},
	'selectDatasetValue': {},
	'selectFrequencyValue': {},
	'selectDimensionValue': {},
  'selectDimensionsPropsValue': {},
	'selectSeries': {},
	'unselectSeries': {},
	'selectAllSeries': {},
	'unselectAllSeries': {},
	'fetchProviderData': { asyncResult: true },
	'fetchDatasetData': {
		asyncResult: true,
		shouldEmit: selectedProvider => selectedProvider && !_.isEmpty(selectedProvider)
	},
	'fetchFrequencyData': {
		asyncResult: true,
		shouldEmit: selectedDataset => selectedDataset && !_.isEmpty(selectedDataset)
	},
	'fetchDimensionData': {
		asyncResult: true,
		shouldEmit: selectedDataset => selectedDataset && !_.isEmpty(selectedDataset)
	},
	'fetchSeries': {
		asyncResult: true,
		shouldEmit: (selectedDataset, params) => selectedDataset && !_.isEmpty(selectedDataset)
	},
	'fetchSeriesValues': {
		asyncResult: true,
		shouldEmit: selectedSeries => selectedSeries && !_.isEmpty(selectedSeries)
	}
});

actions.fetchProviderData.listenAndPromise(getData['provider']);
actions.fetchDatasetData.listenAndPromise(getData['dataset']);
actions.fetchFrequencyData.listenAndPromise(getData['frequency']);
actions.fetchDimensionData.listenAndPromise(getData['dimension']);
actions.fetchSeries.listenAndPromise(getData['series']);
actions.fetchSeriesValues.listenAndPromise(getData['seriesValues']);

module.exports = actions;
