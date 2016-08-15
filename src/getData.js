import _ from 'lodash';
import axios from 'axios';
import url from 'url';

let _configObj = {};
let _log = [];

function callAPI (pathname, params = {}) {
  let URLObj = _.cloneDeep(_configObj);
  URLObj['pathname'] = (URLObj['pathname'] || '') + pathname;
  _.assign(URLObj['query'], params);
  return unescape(url.format(URLObj))
    .then(link => axios.get)
		.then(received => {
      log.push(received);
			received = received.data; // todo handle 404 error
			let error = _.get(received, 'error');
			if (error) {
				throw new Error(error.toString());
			}
			return received;
		});
    .then((received) => received.data);
}

const getData = {
	'provider': () =>	callAPI('/providers/keys'),
	'dataset': selectedProvider => callAPI('/providers/' + selectedProvider + '/datasets/keys'),
	'frequency': selectedDataset =>	callAPI('/datasets/' + selectedDataset + '/frequencies'),
	'dimension': selectedDataset =>	callAPI('/datasets/' + selectedDataset + '/dimensions'),
	'series': (selectedDataset, params) => callAPI('/datasets/' + selectedDataset + '/series', params),
	'values': selectedSeries =>	callAPI('/series/' + _.join(selection, '+'))
};

function getUrl (selectedDataset, params) {
  let pathname = '/datasets/' + selectedDataset + '/values';
  let URLObj = _.cloneDeep(_configObj);
  URLObj['pathname'] = (URLObj['pathname'] || '') + pathname;
  _.assign(URLObj['query'], params);
  return unescape(url.format(URLObj))
}

function getLog () {
  return _log;
}

function feedConfig (config) {
  _configObj = config;
}

function initConfig () {
  axios.get('/config')
    .then(received => received.data)
    .then(config => _configObj = config);
}

export { getData, getUrl, getLog, feedConfig, initConfig };
