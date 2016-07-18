let React = require('react');
let { shallow } = require('enzyme');



let LogDisplay = require('../../src/components/LogDisplay.jsx');
import { Button } from 'react-bootstrap';



describe('LogDisplay', () => {

	it('renders with props', () => {
		const log = ['line 1', 'line 2'];
		const wrapper = shallow(<LogDisplay log={log}/>);
		const elPre = wrapper.find('pre');
		let elPreValue = elPre.prop('children');

		expect(elPreValue).toBe(log);
		expect(wrapper.state('displayed')).toBe(false);
  });

	it('renders with empty props', () => {
		const log = [];
		const wrapper = shallow(<LogDisplay log={log}/>);
		const elPre = wrapper.find('pre');
		let elPreValue = elPre.prop('children');

		expect(elPreValue).toBe(log);
		expect(wrapper.state('displayed')).toBe(false);
  });

	it('simulates click event', () => {
		const log = ['line 1', 'line 2'];
		const wrapper = shallow(<LogDisplay log={log}/>);
		const elPre = wrapper.find('pre');
		const elButton = wrapper.find(Button);
		let elPreValue = elPre.prop('children');

		expect(elPreValue).toBe(log);
		expect(wrapper.state('displayed')).toBe(false);
		elButton.simulate('click');
		expect(elPreValue).toBe(log);
		expect(wrapper.state('displayed')).toBe(true);
	});

});
