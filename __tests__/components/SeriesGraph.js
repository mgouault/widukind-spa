let React = require('react');
let { shallow } = require('enzyme');



jest.disableAutomock();
// let SeriesGraph = require('../../src/components/SeriesGraph.jsx');
// let testo = require('react-dygraphs')



let mocks = require('./mocks.json');
describe('SeriesGraph', () => {

	it('renders with correct props', () => {
		let mockedSeries = mocks.seriesGraph.series;
		const mockedData = mocks.seriesGraph.data;
		const mockedLabels = mocks.seriesGraph.labels;
		// const wrapper = shallow(<SeriesGraph series={mockedSeries}/>);
		// const elDygraph = wrapper.find(Dygraph);
		// let elDygraphData = elDygraph.prop('data');
		// let elDygraphLabels = elDygraph.prop('labels');
		//
		// expect(elDygraphData).toEqual(mockedData);
		// expect(elDygraphLabels).toEqual(mockedLabels);
  });

});
