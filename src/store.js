import Reflux from 'reflux';
import _ from 'lodash';

import actions from './actions';
import { getUrl, getLog, feedConfig, initConfig } from './getData';



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
  'values': initState(null),
  'metadata': {
    'url': '',
    'log': []
  }
};
function buildParams () {
  let params = {};
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
    actions.fetchSeriesData(_state['dataset'].value, buildParams());
    _state.metadata['url'] = getUrl(_state['dataset'].value, buildParams());
    _state.metadata['log'] = getLog();
    this.trigger(_state);
  },
  publicTrigger: function () {this.trigger(_state)},
  init: () => {
    initConfig();
    actions.fetchProviderData();
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
    _state['values'].data = [];
    _state.metadata['log'] = getLog();
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
    _state['values'].data = [];
    refresh();
    actions.fetchFrequencyData(value);
    actions.fetchDimensionData(value);
  },
  onSelectFrequencyValue: value => {
    _state['frequency'].value = _.map(value, el => el.value);
    _state['series'].data = [];
    _state['series'].value = [];
    _state['values'].data = [];
    refresh();
  },
  onSelectDimensionValue: value => {
    value = _.map(value, el => el.value);
    let addedValue = _.filter(value, el => !_.find(_state['dimension'].value, {'name':el}));
    _.remove(_state['dimension'].value, el => !_.find(value, el_ => el_ === el.name));
    _.reduce(addedValue, (acc, el) => {
      let tmp = _.cloneDeep(_.find(_state['dimension'].data, {'name':el}));
      tmp.value = [_.head(tmp.data)] // reminder: default is set here
      acc.push(tmp);
      return acc;
    }, _state['dimension'].value);
    _state['series'].data = [];
    _state['series'].value = [];
    _state['values'].data = [];
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
    _state['values'].data = [];
    refresh();
  },
  onSelectSeriesValue: value => {
    _state['series'].value = value;
    _state['values'].data = [];
    _state.metadata['log'] = getLog();
    trigger();
    actions.fetchValuesData(value);
  },

  onFetchProviderData: () => {_state['provider'].loading = true; trigger();},
  onFetchDatasetData: () => {_state['dataset'].loading = true; trigger();},
  onFetchFrequencyData: () => {_state['frequency'].loading = true; trigger();},
  onFetchDimensionData: () => {_state['dimension'].loading = true; trigger();},
  onFetchSeriesData: () => {_state['series'].loading = true; trigger();},
  onFetchValuesData: () => {_state['values'].loading = true; trigger();},

  onFetchProviderDataFailed: err => console.error(err),
  onFetchDatasetDataFailed: err => console.error(err),
  onFetchFrequencyDataFailed: err => console.error(err),
  onFetchDimensionDataFailed: err => console.error(err),
  onFetchSeriesDataFailed: err => console.error(err),
  onFetchValuesDataFailed: err => console.error(err),

  onFetchProviderDataCompleted: data => {
    _state['provider'].loading = false;
    _state['provider'].data = data;
    let defaultValue = _.head(data);
    _state['provider'].value = defaultValue;
    _state['dataset'].data = [];
    _state['dataset'].value = '';
    _state['frequency'].data = [];
    _state['frequency'].value = [];
    _state['dimension'].data = [];
    _state['dimension'].value = [];
    _state['series'].data = [];
    _state['series'].value = [];
    _state['values'].data = [];
    _state.metadata['log'] = getLog();
    trigger();
    actions.fetchDatasetData(defaultValue);
  },
  onFetchDatasetDataCompleted: data => {
    _state['dataset'].loading = false;
    _state['dataset'].data = data;
    let defaultValue = _.head(data);
    _state['dataset'].value = defaultValue;
    _state['frequency'].data = [];
    _state['frequency'].value = [];
    _state['dimension'].data = [];
    _state['dimension'].value = [];
    _state['series'].data = [];
    _state['series'].value = [];
    _state['values'].data = [];
    refresh();
    actions.fetchFrequencyData(defaultValue);
    actions.fetchDimensionData(defaultValue);
  },
  onFetchFrequencyDataCompleted: data => {
    _state['frequency'].loading = false;
    _state['frequency'].data = data
    _state['frequency'].value = [_.head(data)];
    _state['series'].data = [];
    _state['series'].value = [];
    _state['values'].data = [];
    refresh();
  },
  onFetchDimensionDataCompleted: data => {
    _state['dimension'].loading = false;
    let filteredKeys = _.filter(Object.keys(data), key => (key !== 'freq' && key !== 'frequency'));
    _state['dimension'].data = _.map(filteredKeys, key => { return {
      'name': key,
      'data': Object.keys(data[key]) // reminder: keys are picked instead of value
    }});
    _state['dimension'].value = _.map(_state['dimension'].data, el => {
      let tmp = _.cloneDeep(el);
      tmp.value = [_.head(el.data)] // reminder: default is set here
      return tmp;
    });
    _state['series'].data = [];
    _state['series'].value = [];
    _state['values'].data = [];
    refresh();
  },
  onFetchSeriesDataCompleted: data => {
    _state['series'].loading = false;
    _state['series'].data = data;
    let defaultValue = [_.get(_.head(data), 'slug')];
    _state['series'].value = defaultValue;
    _state.metadata['log'] = getLog();
    trigger();
    actions.fetchValuesData(defaultValue);
  },
  onFetchValuesDataCompleted: data => {
    _state['values'].loading = false;
    if (!(data instanceof Array)) {
      data = [data];
    }
    let tmp = _state['values'].data;
    _.remove(tmp, el => !_.find(_state['series'].value, foo => foo === el['slug']));
    _state['values'].data = _.concat(_.compact(tmp), _.compact(data));
    _state.metadata['log'] = getLog();
    trigger();
  }

});

refresh = store.publicRefresh;
trigger = store.publicTrigger;

module.exports = store;
