import Reflux from 'reflux';
import RefluxPromise from 'reflux-promise';
import Q from 'q';
import bluebird from 'bluebird';

Reflux.use(RefluxPromise(window.Promise));
Reflux.use(RefluxPromise(Q.Promise));
Reflux.use(RefluxPromise(bluebird));

import { getData } from './getData';

let actions = Reflux.createActions({
	'selectProviderValue': {},
	'selectDatasetValue': {},
	'selectFrequencyValue': {},
	'selectDimensionValue': {},
  'selectDimensionsPropsValue': {},
	'selectSeriesValue': {},
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
	'fetchSeriesData': {
		asyncResult: true,
		shouldEmit: (selectedDataset, params) => selectedDataset && !_.isEmpty(selectedDataset)
	},
	'fetchValuesData': {
		asyncResult: true,
		shouldEmit: selectedSeries => selectedSeries && !_.isEmpty(selectedSeries)
	}
});

actions.fetchProviderData.listenAndPromise(getData['provider']);
actions.fetchDatasetData.listenAndPromise(getData['dataset']);
actions.fetchFrequencyData.listenAndPromise(getData['frequency']);
actions.fetchDimensionData.listenAndPromise(getData['dimension']);
actions.fetchSeriesData.listenAndPromise(getData['series']);
actions.fetchValuesData.listenAndPromise(getData['values']);

module.exports = actions;
