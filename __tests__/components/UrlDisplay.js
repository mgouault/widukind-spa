let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils');
let { shallow } = require('enzyme');



jest.disableAutomock();
let UrlDisplay = require('../../src/components/UrlDisplay.jsx');
let ClipboardButton = require('react-clipboard.js');
let { FormControl } = require('react-bootstrap');



describe('UrlDisplay', () => {

	it('renders with props', () => {
		let configObj = {
      "protocol": "http",
      "hostname": "widukind-api.cepremap.org",
      "pathname": "/api/v1/json",
      "query": {
        "per_page": 10
      }
    };
		let requestObj = {
			'dataset': 'bis-pp-ls',
			'controls': {'frequency': 'Q'}
		};
		const wrapper = shallow(<UrlDisplay config={configObj} request={requestObj}/>);
		const el = wrapper.find(FormControl);
		expect(el.prop('value')).toBe('http://widukind-api.cepremap.org/api/v1/json/datasets/bis-pp-ls/values?per_page=10&frequency=Q');
  });

	it('renders without props', () => {
		let configObj = {};
		let requestObj = {
			'dataset': '',
			'controls': {}
		};
		const wrapper = shallow(<UrlDisplay config={configObj} request={requestObj}/>);
		const el = wrapper.find(FormControl);
		expect(el.prop('value')).toBe('/datasets//values');
  });

	it('simulates a click', () => {
		// todo
  });

});
