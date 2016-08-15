/*let React = require('react');
let { mount } = require('enzyme');
let _ = require('lodash');
let Reflux = require('reflux');
let rewire = require('rewire');



let tmpActions = Reflux.createActions({
	'buildControls': {},
	'selectProvider': {},
	'selectDataset': {},
	'selectFrequency': {},
	'selectDimension': {},
	'selectDimensionvalue': {},
	'fetchProvider': {asyncResult: true},
	'fetchDataset': {asyncResult: true},
	'fetchFrequency': {asyncResult: true},
	'fetchDimension': {asyncResult: true}
});
let mockedData = {
	'provider': {
		data: [],
		loading: false,
		value: '',
		setter: tmpActions.selectProvider
	},
	'dataset': {
		data: [],
		loading: false,
		value: '',
		setter: tmpActions.selectDataset
	},
	'frequency': {
		data: [],
		value: [],
		loading: false,
		setter: tmpActions.selectFrequency,
	},
	'dimension': {
		data: [],
		value: [],
		loading: false,
		setter: tmpActions.selectDimension
	}
};
let tmpStore = Reflux.createStore({
	listenables: [],
	getInitialState: function () {
		return this.state;
	},
	init: function () {
		this.state = _.cloneDeep(mockedData);
	},
	remockData: function (data) {
		this.state = data;
	}
});
require('../../../src/global/params/actions');
require.cache[require.resolve('../../../src/global/params/actions')]
	.exports = tmpActions;
require('../../../src/global/params/store');
require.cache[require.resolve('../../../src/global/params/store')]
	.exports = tmpStore;
let ParamsContainer = rewire('../../../src/global/params/Container.jsx');
let Loader = require('react-loader');
let Select = require('react-select');



describe('ParamsContainer', () => {
	it('renders - 1', () => {
		let tmpData = _.cloneDeep(mockedData);
		tmpStore.remockData(tmpData);
		const wrapper = mount(<ParamsContainer/>);

		let elLoader = wrapper.find(Loader);
		let activeLoader = [];
		elLoader.forEach((el) => {
			if (el.prop('loaded') != true) {
				activeLoader.push(el);
			}
		});
		expect(activeLoader.length).toBe(0);

		let elSelect = wrapper.find(Select);
		expect(elSelect.length).toBe(0);
  });

	it('renders - 2', () => {
		let tmpData = _.cloneDeep(mockedData);
		tmpData['provider'].data = ['testProvider1'];
		tmpData['provider'].value = 'testProvider1';
		tmpStore.remockData(tmpData);
		const wrapper = mount(<ParamsContainer/>);

		let elSelect = wrapper.find(Select);
		expect(elSelect.length).toBe(1);
  });
});
*/
