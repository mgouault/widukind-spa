import _ from 'lodash';
import url from 'url';

let _configObj = {};
let _log = [];
let countId = 0;
let pendingCall;

function callAPI (pathname, params) {
  let ownId = _.cloneDeep(countId);
  countId++;
  pendingCall = ownId;
  return fetch(getUrl(pathname, params))
    .then(response => response.json())
		.then(received => {
      if (pendingCall !== ownId) {
        return { 'data': null };
      }
      if (typeof received !== 'object') {
        throw new Error(received);
      }
      _log.push(JSON.stringify(received, null, 2));
			let error = _.get(received, 'error');
			if (error) {
				throw new Error(error.toString());
			}
			return received;
		});
}

const getData = {
	'provider': () =>	callAPI('/providers/keys'),
	'dataset': selectedProvider => callAPI('/providers/' + selectedProvider + '/datasets/keys'),
	'frequency': selectedDataset =>	callAPI('/datasets/' + selectedDataset + '/frequencies'),
	'dimension': selectedDataset =>	callAPI('/datasets/' + selectedDataset + '/dimensions'),
	'series': (selectedDataset, params) => callAPI('/datasets/' + selectedDataset + '/series', params),
	'values': selectedSeries =>	callAPI('/series/' + _.join(selectedSeries, '+'))
};

function getUrl (pathname, params = {}) {
  let URLObj = _.cloneDeep(_configObj);
  URLObj['pathname'] = (URLObj['pathname'] || '') + pathname;
  _.assign(URLObj['query'], params);
  return unescape(url.format(URLObj));
}

function getLog () {
  return _log;
}

function feedConfig (config) {
  _configObj = config;
}

export { getData, getUrl, getLog, feedConfig };
