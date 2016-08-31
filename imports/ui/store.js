import { Meteor } from 'meteor/meteor';

import Reflux from 'reflux';
import _ from 'lodash';

import actions from './actions';
import { getUrl, getLog, feedConfig } from './getData';


const initValues = {
  'provider': 'insee',
  'dataset': 'insee-ipch-2015-fr-coicop'
};
let init = _.cloneDeep(initValues);
function initState (value = []) {
  return {
    'data': [],
    'value': value,
    'loading': false
  };
}
const _state = {
  'provider': initState(''),
  'dataset': initState(''),
  'frequency': initState(''),
  'dimension': initState(),
  'series': initState(),
  'seriesFrequency': null,
  'seriesValues': initState(null),
  'metadata': {
    'paginationActivePage': 1,
    'paginationPagesNb': 0,
    'paginationPerPage': 10,
    'paginationTotalResults': 0,
    'url': '',
    'log': []
  }
};
function buildParams () {
  let params = {
    'page': _state.metadata['paginationActivePage'],
    'per_page': _state.metadata['paginationPerPage']
  };
  if (!_.isEmpty(_state['frequency'].value)) {
    params['frequency'] = _.join(_state['frequency'].value, '+');
  }
  return _.reduce(_state['dimension'].value, (acc, el) => {
    if (!_.isEmpty(el.value)) {
      acc[el.name] = _.join(el.value, '+');
    }
    return acc;
  }, params);
}

let refresh = () => {};
let trigger = () => {};

let store = Reflux.createStore({
  listenables: [actions],
  getInitialState: () => _state,
  publicRefresh: function () {
    actions.fetchSeries(_state['dataset'].value, buildParams());
    _state.metadata['url'] = getUrl('/datasets/'+_state['dataset'].value+'/values', buildParams());
    _state.metadata['log'] = getLog();
    this.trigger(_state);
  },
  publicTrigger: function () {
    this.trigger(_state);
  },

  init: () => {
    Meteor.call('config.get', function (err, result) {
      if (err) {
        return console.error(err);
      }
      feedConfig(result);
      actions.fetchProviderData();
    })
  },
  onUpdateConfig: (config) => {
    Meteor.call('config.modify', config, function (err, result) {
			if (err) {
        return console.error(err);
      }
      feedConfig(result);
      init = _.cloneDeep(initValues);
      actions.selectProviderValue({});
      refresh();
      actions.fetchProviderData();
		});
  },
  onResetConfig: () => {
    Meteor.call('config.remove', function (err, result) {
			if (err) {
        return console.error(err);
      }
      feedConfig(result);
      init = _.cloneDeep(initValues);
      actions.selectProviderValue({});
      refresh();
      actions.fetchProviderData();
		})
  },

  onPaginationSelectPerPage: ({ value }) => {
    if (value === _state.metadata['paginationPerPage']) {
      return;
    }
    _state.metadata['paginationPerPage'] = value;
    _state.metadata['paginationActivePage'] = 1;
    refresh();
  },
  onPaginationSelectActivePage: (activePage) => {
    if (activePage === _state.metadata['paginationActivePage']) {
      return;
    }
    _state.metadata['paginationActivePage'] = activePage;
    refresh();
  },

  onSelectProviderValue: ({ value }) => {
    _state['provider'].value = value;
    _state['dataset'].data = [];
    _state['dataset'].value = '';
    _state['frequency'].data = [];
    _state['frequency'].value = [];
    _state['dimension'].data = [];
    _state['dimension'].value = [];
    _state['series'].data = [];
    _state['series'].value = [];
    _state['seriesValues'].data = [];
    trigger();
    actions.fetchDatasetData(value);
  },
  onSelectDatasetValue: ({ value }) => {
    _state['dataset'].value = value;
    _state['frequency'].data = [];
    _state['frequency'].value = [];
    _state['dimension'].data = [];
    _state['dimension'].value = [];
    _state['series'].data = [];
    _state['series'].value = [];
    _state['seriesValues'].data = [];
    refresh();
    actions.fetchFrequencyData(value);
  },
  onSelectFrequencyValue: value => {
    _state['frequency'].value = _.map(value, el => el.value);
    _state['series'].data = [];
    _state['series'].value = [];
    _state['seriesValues'].data = [];
    refresh();
  },
  onSelectDimensionValue: value => {
    value = _.map(value, el => el.value);
    let addedValue = _.filter(value, el => !_.find(_state['dimension'].value, {'name':el}));
    _.remove(_state['dimension'].value, el => !_.find(value, el_ => el_ === el.name));
    _.reduce(addedValue, (acc, el) => {
      let tmp = _.cloneDeep(_.find(_state['dimension'].data, {'name':el}));
      tmp.value = [_.head(tmp.data).value] // reminder: default is set here
      acc.push(tmp);
      return acc;
    }, _state['dimension'].value);
    _state['series'].data = [];
    _state['series'].value = [];
    _state['seriesValues'].data = [];
    refresh();
  },
  onSelectDimensionsPropsValue: (value, dimensionName) => {
    _.set(
      _.find(_state['dimension'].value, {'name': dimensionName}),
      'value',
      _.map(value, el => el.value)
    );
    _state['series'].data = [];
    _state['series'].value = [];
    _state['seriesValues'].data = [];
    refresh();
  },

  onSelectSeries: ({ slug, frequency }) => {
    if (_state['seriesFrequency'] && frequency !== _state['seriesFrequency']) {
      _state['series'].loading = true;
      trigger(); //todo error message
      _state['series'].loading = false;
      return trigger();
    }
    _state['series'].value.push(slug);
    _state['seriesFrequency'] = frequency;
    _state['seriesValues'].data = [];
    trigger();
    actions.fetchSeriesValues(_state['series'].value);
  },
  onUnselectSeries: ({ slug, frequency }) => {
    _.remove(_state['series'].value, el => el === slug);
    if (_.isEmpty(_state['series'].value)) {
      _state['seriesFrequency'] = null;
    }
    _state['seriesValues'].data = [];
    trigger();
    actions.fetchSeriesValues(_state['series'].value);
  },
  onSelectAllSeries: () => {
    let frequency = _state['/seriesFrequency'] || _.head(_state['series'].data).frequency;
    if (!_.every(_state['series'].data, el => el.frequency === frequency)) {
      _state['series'].loading = true;
      trigger(); //todo error message
      _state['series'].loading = false;
      return trigger();
    }
    _state['series'].value = _.map(_state['series'].data, el => el.slug);
    _state['seriesFrequency'] = frequency;
    _state['seriesValues'].data = [];
    trigger();
    actions.fetchSeriesValues(_state['series'].value);
  },
  onUnselectAllSeries: () => {
    _state['series'].value = [];
    _state['seriesFrequency'] = null;
    _state['seriesValues'].data = [];
    trigger();
  },

  onFetchProviderData: () => {_state['provider'].loading = true; trigger();},
  onFetchDatasetData: () => {_state['dataset'].loading = true; trigger();},
  onFetchFrequencyData: () => {_state['frequency'].loading = true; trigger();},
  onFetchDimensionData: () => {_state['dimension'].loading = true; trigger();},
  onFetchSeries: () => {_state['series'].loading = true; trigger();},
  onFetchSeriesValues: () => {_state['seriesValues'].loading = true; trigger();},

  onFetchProviderDataFailed: err => console.error(err),
  onFetchDatasetDataFailed: err => console.error(err),
  onFetchFrequencyDataFailed: err => console.error(err),
  onFetchDimensionDataFailed: err => console.error(err),
  onFetchSeriesFailed: err => console.error(err),
  onFetchSeriesValuesFailed: err => console.error(err),

  onFetchProviderDataCompleted: ({ data }) => {
    _state['provider'].loading = false;
    if (data === null) { return; }
    _state['provider'].data = data;
    let defaultValue = _.head(data);
    if (init.provider) {
      defaultValue = init.provider;
      init.provider = undefined;
    }
    _state['provider'].value = defaultValue;
    _state['dataset'].data = [];
    _state['dataset'].value = '';
    _state['frequency'].data = [];
    _state['frequency'].value = [];
    _state['dimension'].data = [];
    _state['dimension'].value = [];
    _state['series'].data = [];
    _state['series'].value = [];
    _state['seriesValues'].data = [];
    _state.metadata['log'] = getLog();
    trigger();
    actions.fetchDatasetData(defaultValue);
  },
  onFetchDatasetDataCompleted: ({ data }) => {
    _state['dataset'].loading = false;
    if (data === null) { return; }
    // data = _.map(data, el => { return {'name':el.name, 'value':el.slug} });
    _state['dataset'].data = data;
    // let defaultValue = _.head(data).value;
    let defaultValue = _.head(data);
    if (init.dataset) {
      defaultValue = init.dataset;
      init.dataset = undefined;
    }
    _state['dataset'].value = defaultValue;
    _state['frequency'].data = [];
    _state['frequency'].value = [];
    _state['dimension'].data = [];
    _state['dimension'].value = [];
    _state['series'].data = [];
    _state['series'].value = [];
    _state['seriesValues'].data = [];
    refresh();
    actions.fetchFrequencyData(defaultValue);
  },
  onFetchFrequencyDataCompleted: ({ data }) => {
    _state['frequency'].loading = false;
    if (data === null) { return; }
    _state['frequency'].data = data
    let defaultValue = [_.head(data)];
    if (init.frequency) {
      defaultValue = init.frequency;
      init.frequency = undefined;
    }
    _state['frequency'].value = defaultValue;
    _state['series'].data = [];
    _state['series'].value = [];
    _state['seriesValues'].data = [];
    refresh();
    actions.fetchDimensionData(_state['dataset'].value);
  },
  onFetchDimensionDataCompleted: ({ data }) => {
    _state['dimension'].loading = false;
    if (data === null) { return; }
    let filteredKeys = _.filter(Object.keys(data), key => (key !== 'freq' && key !== 'frequency'));
    _state['dimension'].data = _.map(filteredKeys, key => { return {
      'name': key,
      // 'data': Object.keys(data[key]) // reminder: keys are picked instead of value
      'data': _.map(Object.keys(data[key]), el => { return {'name':data[key][el], 'value':el} })
    }});
    _state['dimension'].value = _.map(_state['dimension'].data, el => {
      let tmp = _.cloneDeep(el);
      let defaultValue = [_.head(el.data).value];
      if (init.dimension) {
        defaultValue = init.dimension;
        init.dimension = undefined;
      }
      tmp.value = defaultValue;
      return tmp;
    });
    _state['series'].data = [];
    _state['series'].value = [];
    _state['seriesValues'].data = [];
    refresh();
  },
  onFetchSeriesCompleted: ({ data, meta }) => {
    _state['series'].loading = false;
    if (data === null) { return; }
    data = _.map(data, el => {
      switch (el['frequency']) {
        case 'A':
          el.frequency = 'Annually'; break;
        case 'Q':
          el.frequency = 'Quarterly'; break;
        case 'M':
          el.frequency = 'Monthly'; break;
      }
      return el;
    });
    _state['series'].data = data;
    _state['seriesFrequency'] = null;
    _state.metadata['paginationActivePage'] = meta.page;
    _state.metadata['paginationPagesNb'] = meta.pages;
    _state.metadata['paginationPerPage'] = meta.per_page;
    _state.metadata['paginationTotalResults'] = meta.total;
    _state.metadata['log'] = getLog();
    trigger();
  },
  onFetchSeriesValuesCompleted: ({ data }) => {
    _state['seriesValues'].loading = false;
    if (data === null) { return; }
    if (!(data instanceof Array)) {
      data = [data];
    }
    let tmp = _state['seriesValues'].data;
    _.remove(tmp, el => !_.find(_state['series'].value, foo => foo === el['slug']));
    _state['seriesValues'].data = _.concat(_.compact(tmp), _.compact(data));
    _state.metadata['log'] = getLog();
    trigger();
  }

});

refresh = store.publicRefresh;
trigger = store.publicTrigger;

module.exports = store;
