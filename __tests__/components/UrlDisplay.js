let React = require('react');
let { shallow } = require('enzyme');
let _ = require('lodash');

let UrlDisplay = require('../../src/components/UrlDisplay.jsx');
let ClipboardButton = require('react-clipboard.js');
let { FormControl } = require('react-bootstrap');



describe('UrlDisplay', () => {

	it('renders with correct props', () => {
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
		const elForm = wrapper.find(FormControl);
		const elButton = wrapper.find(ClipboardButton);
		let elFormValue = elForm.prop('value');
		let elButtonValue = elButton.prop('data-clipboard-text');
		expect(elFormValue).toBe('http://widukind-api.cepremap.org/api/v1/json/datasets/bis-pp-ls/values?per_page=10&frequency=Q');
		expect(elButtonValue).toBe(elFormValue);
  });

	it('renders with empty props', () => {
		let configObj = {};
		let requestObj = {
			'dataset': '',
			'controls': {}
		};
		const wrapper = shallow(<UrlDisplay config={configObj} request={requestObj}/>);
		const elForm = wrapper.find(FormControl);
		const elButton = wrapper.find(ClipboardButton);
		let elFormValue = elForm.prop('value');
		let elButtonValue = elButton.prop('data-clipboard-text');
		expect(elFormValue).toBe('/datasets//values');
		expect(elButtonValue).toBe(elFormValue);
  });

});
