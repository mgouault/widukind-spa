let React = require('react');
let { shallow } = require('enzyme');
let _ = require('lodash');

let SeriesGraph = require('../../src/components/SeriesGraph.jsx');
let Dygraph = require('react-dygraphs').Dygraph;



let mocks = getMocks();
describe('SeriesGraph', () => {

	it('renders with correct props', () => {
		let mockedSeries = mocks.series;
		const mockedData = mocks.data;
		const mockedLabels = mocks.labels;
		const wrapper = shallow(<SeriesGraph series={mockedSeries}/>);
		const elDygraph = wrapper.find(Dygraph);
		let elDygraphLabels = elDygraph.prop('labels');
		let elDygraphData = _.map(elDygraph.prop('data'), function (tab) {
			return [
				tab[0].toISOString(),
				tab[1]
			]
		});

		expect(elDygraphLabels).toEqual(mockedLabels);
		expect(elDygraphData).toEqual(mockedData);
  });

});



function getMocks () {
	return {
		"labels": [
			"time",
			"001763155"
		],

		"data": [
		  [
		    "1995-12-31T23:00:00.000Z",
		    64.6
		  ],
		  [
		    "1996-01-31T23:00:00.000Z",
		    65.6
		  ],
		  [
		    "1996-02-29T23:00:00.000Z",
		    65.6
		  ],
		  [
		    "1996-03-31T22:00:00.000Z",
		    65.6
		  ],
		  [
		    "1996-04-30T22:00:00.000Z",
		    65.6
		  ],
		  [
		    "1996-05-31T22:00:00.000Z",
		    65.6
		  ],
		  [
		    "1996-06-30T22:00:00.000Z",
		    65.3
		  ],
		  [
		    "1996-07-31T22:00:00.000Z",
		    65.3
		  ],
		  [
		    "1996-08-31T22:00:00.000Z",
		    65.6
		  ],
		  [
		    "1996-09-30T22:00:00.000Z",
		    65.3
		  ],
		  [
		    "1996-10-31T23:00:00.000Z",
		    65.3
		  ],
		  [
		    "1996-11-30T23:00:00.000Z",
		    64.9
		  ],
		  [
		    "1996-12-31T23:00:00.000Z",
		    65.1
		  ],
		  [
		    "1997-01-31T23:00:00.000Z",
		    65.9
		  ],
		  [
		    "1997-02-28T23:00:00.000Z",
		    65.9
		  ],
		  [
		    "1997-03-31T22:00:00.000Z",
		    65.9
		  ],
		  [
		    "1997-04-30T22:00:00.000Z",
		    65.9
		  ],
		  [
		    "1997-05-31T22:00:00.000Z",
		    65.7
		  ],
		  [
		    "1997-06-30T22:00:00.000Z",
		    65.6
		  ],
		  [
		    "1997-07-31T22:00:00.000Z",
		    65.6
		  ],
		  [
		    "1997-08-31T22:00:00.000Z",
		    65.7
		  ],
		  [
		    "1997-09-30T22:00:00.000Z",
		    65.7
		  ],
		  [
		    "1997-10-31T23:00:00.000Z",
		    65.7
		  ],
		  [
		    "1997-11-30T23:00:00.000Z",
		    65.7
		  ],
		  [
		    "1997-12-31T23:00:00.000Z",
		    65.9
		  ],
		  [
		    "1998-01-31T23:00:00.000Z",
		    66.5
		  ],
		  [
		    "1998-02-28T23:00:00.000Z",
		    66.5
		  ],
		  [
		    "1998-03-31T22:00:00.000Z",
		    66.4
		  ],
		  [
		    "1998-04-30T22:00:00.000Z",
		    65
		  ],
		  [
		    "1998-05-31T22:00:00.000Z",
		    65.3
		  ],
		  [
		    "1998-06-30T22:00:00.000Z",
		    65.3
		  ],
		  [
		    "1998-07-31T22:00:00.000Z",
		    65.3
		  ],
		  [
		    "1998-08-31T22:00:00.000Z",
		    65.3
		  ],
		  [
		    "1998-09-30T22:00:00.000Z",
		    65.3
		  ],
		  [
		    "1998-10-31T23:00:00.000Z",
		    65.3
		  ],
		  [
		    "1998-11-30T23:00:00.000Z",
		    65.4
		  ],
		  [
		    "1998-12-31T23:00:00.000Z",
		    65.6
		  ],
		  [
		    "1999-01-31T23:00:00.000Z",
		    66.2
		  ],
		  [
		    "1999-02-28T23:00:00.000Z",
		    66.2
		  ],
		  [
		    "1999-03-31T22:00:00.000Z",
		    66.2
		  ],
		  [
		    "1999-04-30T22:00:00.000Z",
		    66.2
		  ],
		  [
		    "1999-05-31T22:00:00.000Z",
		    66.3
		  ],
		  [
		    "1999-06-30T22:00:00.000Z",
		    66.3
		  ],
		  [
		    "1999-07-31T22:00:00.000Z",
		    66.3
		  ],
		  [
		    "1999-08-31T22:00:00.000Z",
		    66.3
		  ],
		  [
		    "1999-09-30T22:00:00.000Z",
		    66.3
		  ],
		  [
		    "1999-10-31T23:00:00.000Z",
		    66.3
		  ],
		  [
		    "1999-11-30T23:00:00.000Z",
		    66.3
		  ],
		  [
		    "1999-12-31T23:00:00.000Z",
		    66.6
		  ],
		  [
		    "2000-01-31T23:00:00.000Z",
		    67.4
		  ],
		  [
		    "2000-02-29T23:00:00.000Z",
		    67.4
		  ],
		  [
		    "2000-03-31T22:00:00.000Z",
		    67.4
		  ],
		  [
		    "2000-04-30T22:00:00.000Z",
		    67.4
		  ],
		  [
		    "2000-05-31T22:00:00.000Z",
		    67
		  ],
		  [
		    "2000-06-30T22:00:00.000Z",
		    67
		  ],
		  [
		    "2000-07-31T22:00:00.000Z",
		    67
		  ],
		  [
		    "2000-08-31T22:00:00.000Z",
		    67
		  ],
		  [
		    "2000-09-30T22:00:00.000Z",
		    67
		  ],
		  [
		    "2000-10-31T23:00:00.000Z",
		    67
		  ],
		  [
		    "2000-11-30T23:00:00.000Z",
		    67.1
		  ],
		  [
		    "2000-12-31T23:00:00.000Z",
		    67.3
		  ],
		  [
		    "2001-01-31T23:00:00.000Z",
		    68.4
		  ],
		  [
		    "2001-02-28T23:00:00.000Z",
		    68.4
		  ],
		  [
		    "2001-03-31T22:00:00.000Z",
		    68.4
		  ],
		  [
		    "2001-04-30T22:00:00.000Z",
		    68.4
		  ],
		  [
		    "2001-05-31T22:00:00.000Z",
		    68.5
		  ],
		  [
		    "2001-06-30T22:00:00.000Z",
		    68.5
		  ],
		  [
		    "2001-07-31T22:00:00.000Z",
		    68.5
		  ],
		  [
		    "2001-08-31T22:00:00.000Z",
		    69.7
		  ],
		  [
		    "2001-09-30T22:00:00.000Z",
		    69.8
		  ],
		  [
		    "2001-10-31T23:00:00.000Z",
		    69.8
		  ],
		  [
		    "2001-11-30T23:00:00.000Z",
		    69.8
		  ],
		  [
		    "2001-12-31T23:00:00.000Z",
		    69.6
		  ],
		  [
		    "2002-01-31T23:00:00.000Z",
		    69.6
		  ],
		  [
		    "2002-02-28T23:00:00.000Z",
		    69.6
		  ],
		  [
		    "2002-03-31T22:00:00.000Z",
		    69.6
		  ],
		  [
		    "2002-04-30T22:00:00.000Z",
		    69.6
		  ],
		  [
		    "2002-05-31T22:00:00.000Z",
		    69.9
		  ],
		  [
		    "2002-06-30T22:00:00.000Z",
		    70.3
		  ],
		  [
		    "2002-07-31T22:00:00.000Z",
		    71.6
		  ],
		  [
		    "2002-08-31T22:00:00.000Z",
		    71.7
		  ],
		  [
		    "2002-09-30T22:00:00.000Z",
		    71.7
		  ],
		  [
		    "2002-10-31T23:00:00.000Z",
		    71.7
		  ],
		  [
		    "2002-11-30T23:00:00.000Z",
		    72
		  ],
		  [
		    "2002-12-31T23:00:00.000Z",
		    72.2
		  ],
		  [
		    "2003-01-31T23:00:00.000Z",
		    72.2
		  ],
		  [
		    "2003-02-28T23:00:00.000Z",
		    72.2
		  ],
		  [
		    "2003-03-31T22:00:00.000Z",
		    72.2
		  ],
		  [
		    "2003-04-30T22:00:00.000Z",
		    72.2
		  ],
		  [
		    "2003-05-31T22:00:00.000Z",
		    72.9
		  ],
		  [
		    "2003-06-30T22:00:00.000Z",
		    74.1
		  ],
		  [
		    "2003-07-31T22:00:00.000Z",
		    74.1
		  ],
		  [
		    "2003-08-31T22:00:00.000Z",
		    74.1
		  ],
		  [
		    "2003-09-30T22:00:00.000Z",
		    74.1
		  ],
		  [
		    "2003-10-31T23:00:00.000Z",
		    73.8
		  ],
		  [
		    "2003-11-30T23:00:00.000Z",
		    74.1
		  ],
		  [
		    "2003-12-31T23:00:00.000Z",
		    74.1
		  ],
		  [
		    "2004-01-31T23:00:00.000Z",
		    74.1
		  ],
		  [
		    "2004-02-29T23:00:00.000Z",
		    74.1
		  ],
		  [
		    "2004-03-31T22:00:00.000Z",
		    74.6
		  ],
		  [
		    "2004-04-30T22:00:00.000Z",
		    75.1
		  ],
		  [
		    "2004-05-31T22:00:00.000Z",
		    75.1
		  ],
		  [
		    "2004-06-30T22:00:00.000Z",
		    75.8
		  ],
		  [
		    "2004-07-31T22:00:00.000Z",
		    75.8
		  ],
		  [
		    "2004-08-31T22:00:00.000Z",
		    75.8
		  ],
		  [
		    "2004-09-30T22:00:00.000Z",
		    75.8
		  ],
		  [
		    "2004-10-31T23:00:00.000Z",
		    75.6
		  ],
		  [
		    "2004-11-30T23:00:00.000Z",
		    75.4
		  ],
		  [
		    "2004-12-31T23:00:00.000Z",
		    75.8
		  ],
		  [
		    "2005-01-31T23:00:00.000Z",
		    77
		  ],
		  [
		    "2005-02-28T23:00:00.000Z",
		    77
		  ],
		  [
		    "2005-03-31T22:00:00.000Z",
		    77
		  ],
		  [
		    "2005-04-30T22:00:00.000Z",
		    77
		  ],
		  [
		    "2005-05-31T22:00:00.000Z",
		    77
		  ],
		  [
		    "2005-06-30T22:00:00.000Z",
		    77.6
		  ],
		  [
		    "2005-07-31T22:00:00.000Z",
		    77.6
		  ],
		  [
		    "2005-08-31T22:00:00.000Z",
		    77.6
		  ],
		  [
		    "2005-09-30T22:00:00.000Z",
		    77.6
		  ],
		  [
		    "2005-10-31T23:00:00.000Z",
		    77.6
		  ],
		  [
		    "2005-11-30T23:00:00.000Z",
		    77.6
		  ],
		  [
		    "2005-12-31T23:00:00.000Z",
		    77.51
		  ],
		  [
		    "2006-01-31T23:00:00.000Z",
		    79.15
		  ],
		  [
		    "2006-02-28T23:00:00.000Z",
		    79.15
		  ],
		  [
		    "2006-03-31T22:00:00.000Z",
		    78.91
		  ],
		  [
		    "2006-04-30T22:00:00.000Z",
		    78.9
		  ],
		  [
		    "2006-05-31T22:00:00.000Z",
		    78.9
		  ],
		  [
		    "2006-06-30T22:00:00.000Z",
		    79.54
		  ],
		  [
		    "2006-07-31T22:00:00.000Z",
		    79.54
		  ],
		  [
		    "2006-08-31T22:00:00.000Z",
		    79.54
		  ],
		  [
		    "2006-09-30T22:00:00.000Z",
		    79.54
		  ],
		  [
		    "2006-10-31T23:00:00.000Z",
		    79.54
		  ],
		  [
		    "2006-11-30T23:00:00.000Z",
		    79.54
		  ],
		  [
		    "2006-12-31T23:00:00.000Z",
		    79.86
		  ],
		  [
		    "2007-01-31T23:00:00.000Z",
		    80.65
		  ],
		  [
		    "2007-02-28T23:00:00.000Z",
		    80.65
		  ],
		  [
		    "2007-03-31T22:00:00.000Z",
		    80.65
		  ],
		  [
		    "2007-04-30T22:00:00.000Z",
		    80.65
		  ],
		  [
		    "2007-05-31T22:00:00.000Z",
		    80.87
		  ],
		  [
		    "2007-06-30T22:00:00.000Z",
		    81.56
		  ],
		  [
		    "2007-07-31T22:00:00.000Z",
		    81.56
		  ],
		  [
		    "2007-08-31T22:00:00.000Z",
		    81.56
		  ],
		  [
		    "2007-09-30T22:00:00.000Z",
		    81.56
		  ],
		  [
		    "2007-10-31T23:00:00.000Z",
		    81.56
		  ],
		  [
		    "2007-11-30T23:00:00.000Z",
		    81.56
		  ],
		  [
		    "2007-12-31T23:00:00.000Z",
		    81.56
		  ],
		  [
		    "2008-01-31T23:00:00.000Z",
		    82.47
		  ],
		  [
		    "2008-02-29T23:00:00.000Z",
		    82.47
		  ],
		  [
		    "2008-03-31T22:00:00.000Z",
		    82.47
		  ],
		  [
		    "2008-04-30T22:00:00.000Z",
		    82.47
		  ],
		  [
		    "2008-05-31T22:00:00.000Z",
		    82.47
		  ],
		  [
		    "2008-06-30T22:00:00.000Z",
		    83.11
		  ],
		  [
		    "2008-07-31T22:00:00.000Z",
		    83.11
		  ],
		  [
		    "2008-08-31T22:00:00.000Z",
		    83.31
		  ],
		  [
		    "2008-09-30T22:00:00.000Z",
		    83.31
		  ],
		  [
		    "2008-10-31T23:00:00.000Z",
		    83.31
		  ],
		  [
		    "2008-11-30T23:00:00.000Z",
		    83.31
		  ],
		  [
		    "2008-12-31T23:00:00.000Z",
		    84.9
		  ],
		  [
		    "2009-01-31T23:00:00.000Z",
		    84.9
		  ],
		  [
		    "2009-02-28T23:00:00.000Z",
		    84.9
		  ],
		  [
		    "2009-03-31T22:00:00.000Z",
		    84.9
		  ],
		  [
		    "2009-04-30T22:00:00.000Z",
		    84.9
		  ],
		  [
		    "2009-05-31T22:00:00.000Z",
		    84.9
		  ],
		  [
		    "2009-06-30T22:00:00.000Z",
		    85.75
		  ],
		  [
		    "2009-07-31T22:00:00.000Z",
		    85.75
		  ],
		  [
		    "2009-08-31T22:00:00.000Z",
		    85.75
		  ],
		  [
		    "2009-09-30T22:00:00.000Z",
		    85.75
		  ],
		  [
		    "2009-10-31T23:00:00.000Z",
		    85.75
		  ],
		  [
		    "2009-11-30T23:00:00.000Z",
		    85.88
		  ],
		  [
		    "2009-12-31T23:00:00.000Z",
		    86.81
		  ],
		  [
		    "2010-01-31T23:00:00.000Z",
		    86.81
		  ],
		  [
		    "2010-02-28T23:00:00.000Z",
		    86.81
		  ],
		  [
		    "2010-03-31T22:00:00.000Z",
		    86.81
		  ],
		  [
		    "2010-04-30T22:00:00.000Z",
		    86.81
		  ],
		  [
		    "2010-05-31T22:00:00.000Z",
		    86.81
		  ],
		  [
		    "2010-06-30T22:00:00.000Z",
		    87.48
		  ],
		  [
		    "2010-07-31T22:00:00.000Z",
		    87.48
		  ],
		  [
		    "2010-08-31T22:00:00.000Z",
		    87.48
		  ],
		  [
		    "2010-09-30T22:00:00.000Z",
		    87.48
		  ],
		  [
		    "2010-10-31T23:00:00.000Z",
		    87.48
		  ],
		  [
		    "2010-11-30T23:00:00.000Z",
		    87.48
		  ],
		  [
		    "2010-12-31T23:00:00.000Z",
		    87.57
		  ],
		  [
		    "2011-01-31T23:00:00.000Z",
		    88.89
		  ],
		  [
		    "2011-02-28T23:00:00.000Z",
		    88.89
		  ],
		  [
		    "2011-03-31T22:00:00.000Z",
		    88.89
		  ],
		  [
		    "2011-04-30T22:00:00.000Z",
		    88.89
		  ],
		  [
		    "2011-05-31T22:00:00.000Z",
		    88.89
		  ],
		  [
		    "2011-06-30T22:00:00.000Z",
		    89.71
		  ],
		  [
		    "2011-07-31T22:00:00.000Z",
		    89.71
		  ],
		  [
		    "2011-08-31T22:00:00.000Z",
		    89.71
		  ],
		  [
		    "2011-09-30T22:00:00.000Z",
		    89.71
		  ],
		  [
		    "2011-10-31T23:00:00.000Z",
		    89.71
		  ],
		  [
		    "2011-11-30T23:00:00.000Z",
		    89.71
		  ],
		  [
		    "2011-12-31T23:00:00.000Z",
		    91.97
		  ],
		  [
		    "2012-01-31T23:00:00.000Z",
		    91.97
		  ],
		  [
		    "2012-02-29T23:00:00.000Z",
		    92.41
		  ],
		  [
		    "2012-03-31T22:00:00.000Z",
		    92.63
		  ],
		  [
		    "2012-04-30T22:00:00.000Z",
		    92.63
		  ],
		  [
		    "2012-05-31T22:00:00.000Z",
		    92.63
		  ],
		  [
		    "2012-06-30T22:00:00.000Z",
		    92.63
		  ],
		  [
		    "2012-07-31T22:00:00.000Z",
		    93.19
		  ],
		  [
		    "2012-08-31T22:00:00.000Z",
		    93.19
		  ],
		  [
		    "2012-09-30T22:00:00.000Z",
		    93.19
		  ],
		  [
		    "2012-10-31T23:00:00.000Z",
		    93.19
		  ],
		  [
		    "2012-11-30T23:00:00.000Z",
		    93.19
		  ],
		  [
		    "2012-12-31T23:00:00.000Z",
		    95.28
		  ],
		  [
		    "2013-01-31T23:00:00.000Z",
		    95.28
		  ],
		  [
		    "2013-02-28T23:00:00.000Z",
		    95.28
		  ],
		  [
		    "2013-03-31T22:00:00.000Z",
		    95.21
		  ],
		  [
		    "2013-04-30T22:00:00.000Z",
		    95.21
		  ],
		  [
		    "2013-05-31T22:00:00.000Z",
		    95.21
		  ],
		  [
		    "2013-06-30T22:00:00.000Z",
		    95.21
		  ],
		  [
		    "2013-07-31T22:00:00.000Z",
		    95.21
		  ],
		  [
		    "2013-08-31T22:00:00.000Z",
		    95.21
		  ],
		  [
		    "2013-09-30T22:00:00.000Z",
		    93.99
		  ],
		  [
		    "2013-10-31T23:00:00.000Z",
		    95.13
		  ],
		  [
		    "2013-11-30T23:00:00.000Z",
		    95.13
		  ],
		  [
		    "2013-12-31T23:00:00.000Z",
		    95.13
		  ],
		  [
		    "2014-01-31T23:00:00.000Z",
		    95.13
		  ],
		  [
		    "2014-02-28T23:00:00.000Z",
		    95.13
		  ],
		  [
		    "2014-03-31T22:00:00.000Z",
		    97.8
		  ],
		  [
		    "2014-04-30T22:00:00.000Z",
		    97.8
		  ],
		  [
		    "2014-05-31T22:00:00.000Z",
		    97.8
		  ],
		  [
		    "2014-06-30T22:00:00.000Z",
		    96.51
		  ],
		  [
		    "2014-07-31T22:00:00.000Z",
		    97.8
		  ],
		  [
		    "2014-08-31T22:00:00.000Z",
		    97.8
		  ],
		  [
		    "2014-09-30T22:00:00.000Z",
		    97.8
		  ],
		  [
		    "2014-10-31T23:00:00.000Z",
		    97.8
		  ],
		  [
		    "2014-11-30T23:00:00.000Z",
		    97.8
		  ],
		  [
		    "2014-12-31T23:00:00.000Z",
		    100.08
		  ],
		  [
		    "2015-01-31T23:00:00.000Z",
		    100.02
		  ],
		  [
		    "2015-02-28T23:00:00.000Z",
		    100.08
		  ],
		  [
		    "2015-03-31T22:00:00.000Z",
		    100.08
		  ],
		  [
		    "2015-04-30T22:00:00.000Z",
		    100.08
		  ],
		  [
		    "2015-05-31T22:00:00.000Z",
		    99.15
		  ],
		  [
		    "2015-06-30T22:00:00.000Z",
		    100.08
		  ],
		  [
		    "2015-07-31T22:00:00.000Z",
		    100.08
		  ],
		  [
		    "2015-08-31T22:00:00.000Z",
		    100.08
		  ],
		  [
		    "2015-09-30T22:00:00.000Z",
		    100.08
		  ],
		  [
		    "2015-10-31T23:00:00.000Z",
		    100.08
		  ],
		  [
		    "2015-11-30T23:00:00.000Z",
		    100.08
		  ],
		  [
		    "2015-12-31T23:00:00.000Z",
		    100.17
		  ],
		  [
		    "2016-01-31T23:00:00.000Z",
		    100.17
		  ],
		  [
		    "2016-02-29T23:00:00.000Z",
		    100.17
		  ],
		  [
		    "2016-03-31T22:00:00.000Z",
		    100.17
		  ],
		  [
		    "2016-04-30T22:00:00.000Z",
		    99.75
		  ],
		  [
		    "2016-05-31T22:00:00.000Z",
		    99.49
		  ]
		],

		"series": [
	  {
	    "attributes": {
	      "base-per": "2015",
	      "decimals": "2",
	      "last-update": "2016-07-13",
	      "ref-area": "fe",
	      "time-per-collect": "periode",
	      "title": "indice-des-prix-a-la-consommation-harmonise-base-2015-ensemble-des-menages-france-nomenclature-coicop-07-3-1-transport-ferroviaire-de-passagers",
	      "unit-measure": "so",
	      "unit-mult": "0"
	    },
	    "dataset_code": "IPCH-2015-FR-COICOP",
	    "dimensions": {
	      "freq": "m",
	      "nature": "indice",
	      "produit": "0731"
	    },
	    "end_date": 557,
	    "end_ts": "2016-01-31T23:59:59.999000+00:00",
	    "frequency": "M",
	    "key": "001763155",
	    "name": "Monthly - 07.3.1 - Passenger transport by railway - Index",
	    "notes": null,
	    "provider_name": "INSEE",
	    "slug": "insee-ipch-2015-fr-coicop-001763155",
	    "start_date": 312,
	    "start_ts": "1996-01-01T00:00:00+00:00",
	    "tags": [
	      "2016-04-13",
	      "area",
	      "base",
	      "bdm",
	      "classification",
	      "coicop",
	      "collection",
	      "consumer",
	      "date",
	      "decimals",
	      "economic",
	      "france",
	      "frequency",
	      "groups",
	      "harmonised",
	      "identifier",
	      "index",
	      "insee",
	      "institute",
	      "ipch-2015-fr-coicop",
	      "ipch-mensuel-ensemble-des-menages-france-base-2015-nomenclature-coicop-07-3-1-transport-ferroviaire-de-passagers",
	      "last",
	      "main",
	      "monthly",
	      "multiplier",
	      "national",
	      "nature",
	      "numerical",
	      "object",
	      "observation",
	      "passenger",
	      "period",
	      "price",
	      "product",
	      "railway",
	      "reference",
	      "series",
	      "statistics",
	      "studies",
	      "time",
	      "title",
	      "transport",
	      "unit",
	      "update",
	      "used",
	      "website",
	      "without"
	    ],
	    "values": [
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 312,
	      "period": "1996-01",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "64.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 313,
	      "period": "1996-02",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 314,
	      "period": "1996-03",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 315,
	      "period": "1996-04",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 316,
	      "period": "1996-05",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 317,
	      "period": "1996-06",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 318,
	      "period": "1996-07",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.3"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 319,
	      "period": "1996-08",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.3"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 320,
	      "period": "1996-09",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 321,
	      "period": "1996-10",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.3"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 322,
	      "period": "1996-11",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.3"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 323,
	      "period": "1996-12",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "64.9"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 324,
	      "period": "1997-01",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.1"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 325,
	      "period": "1997-02",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.9"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 326,
	      "period": "1997-03",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.9"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 327,
	      "period": "1997-04",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.9"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 328,
	      "period": "1997-05",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.9"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 329,
	      "period": "1997-06",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.7"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 330,
	      "period": "1997-07",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 331,
	      "period": "1997-08",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 332,
	      "period": "1997-09",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.7"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 333,
	      "period": "1997-10",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.7"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 334,
	      "period": "1997-11",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.7"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 335,
	      "period": "1997-12",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.7"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 336,
	      "period": "1998-01",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.9"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 337,
	      "period": "1998-02",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "66.5"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 338,
	      "period": "1998-03",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "66.5"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 339,
	      "period": "1998-04",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "66.4"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 340,
	      "period": "1998-05",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 341,
	      "period": "1998-06",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.3"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 342,
	      "period": "1998-07",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.3"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 343,
	      "period": "1998-08",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.3"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 344,
	      "period": "1998-09",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.3"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 345,
	      "period": "1998-10",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.3"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 346,
	      "period": "1998-11",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.3"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 347,
	      "period": "1998-12",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.4"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 348,
	      "period": "1999-01",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "65.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 349,
	      "period": "1999-02",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "66.2"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 350,
	      "period": "1999-03",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "66.2"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 351,
	      "period": "1999-04",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "66.2"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 352,
	      "period": "1999-05",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "66.2"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 353,
	      "period": "1999-06",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "66.3"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 354,
	      "period": "1999-07",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "66.3"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 355,
	      "period": "1999-08",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "66.3"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 356,
	      "period": "1999-09",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "66.3"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 357,
	      "period": "1999-10",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "66.3"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 358,
	      "period": "1999-11",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "66.3"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 359,
	      "period": "1999-12",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "66.3"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 360,
	      "period": "2000-01",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "66.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 361,
	      "period": "2000-02",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "67.4"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 362,
	      "period": "2000-03",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "67.4"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 363,
	      "period": "2000-04",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "67.4"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 364,
	      "period": "2000-05",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "67.4"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 365,
	      "period": "2000-06",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "67"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 366,
	      "period": "2000-07",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "67"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 367,
	      "period": "2000-08",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "67"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 368,
	      "period": "2000-09",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "67"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 369,
	      "period": "2000-10",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "67"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 370,
	      "period": "2000-11",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "67"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 371,
	      "period": "2000-12",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "67.1"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 372,
	      "period": "2001-01",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "67.3"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 373,
	      "period": "2001-02",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "68.4"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 374,
	      "period": "2001-03",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "68.4"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 375,
	      "period": "2001-04",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "68.4"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 376,
	      "period": "2001-05",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "68.4"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 377,
	      "period": "2001-06",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "68.5"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 378,
	      "period": "2001-07",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "68.5"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 379,
	      "period": "2001-08",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "68.5"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 380,
	      "period": "2001-09",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "69.7"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 381,
	      "period": "2001-10",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "69.8"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 382,
	      "period": "2001-11",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "69.8"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 383,
	      "period": "2001-12",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "69.8"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 384,
	      "period": "2002-01",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "69.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 385,
	      "period": "2002-02",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "69.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 386,
	      "period": "2002-03",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "69.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 387,
	      "period": "2002-04",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "69.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 388,
	      "period": "2002-05",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "69.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 389,
	      "period": "2002-06",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "69.9"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 390,
	      "period": "2002-07",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "70.3"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 391,
	      "period": "2002-08",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "71.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 392,
	      "period": "2002-09",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "71.7"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 393,
	      "period": "2002-10",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "71.7"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 394,
	      "period": "2002-11",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "71.7"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 395,
	      "period": "2002-12",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "72"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 396,
	      "period": "2003-01",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "72.2"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 397,
	      "period": "2003-02",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "72.2"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 398,
	      "period": "2003-03",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "72.2"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 399,
	      "period": "2003-04",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "72.2"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 400,
	      "period": "2003-05",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "72.2"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 401,
	      "period": "2003-06",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "72.9"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 402,
	      "period": "2003-07",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "74.1"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 403,
	      "period": "2003-08",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "74.1"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 404,
	      "period": "2003-09",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "74.1"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 405,
	      "period": "2003-10",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "74.1"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 406,
	      "period": "2003-11",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "73.8"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 407,
	      "period": "2003-12",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "74.1"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 408,
	      "period": "2004-01",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "74.1"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 409,
	      "period": "2004-02",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "74.1"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 410,
	      "period": "2004-03",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "74.1"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 411,
	      "period": "2004-04",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "74.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 412,
	      "period": "2004-05",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "75.1"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 413,
	      "period": "2004-06",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "75.1"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 414,
	      "period": "2004-07",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "75.8"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 415,
	      "period": "2004-08",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "75.8"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 416,
	      "period": "2004-09",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "75.8"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 417,
	      "period": "2004-10",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "75.8"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 418,
	      "period": "2004-11",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "75.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 419,
	      "period": "2004-12",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "75.4"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 420,
	      "period": "2005-01",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "75.8"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 421,
	      "period": "2005-02",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "77"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 422,
	      "period": "2005-03",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "77"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 423,
	      "period": "2005-04",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "77"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 424,
	      "period": "2005-05",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "77"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 425,
	      "period": "2005-06",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "77"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 426,
	      "period": "2005-07",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "77.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 427,
	      "period": "2005-08",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "77.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 428,
	      "period": "2005-09",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "77.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 429,
	      "period": "2005-10",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "77.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 430,
	      "period": "2005-11",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "77.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 431,
	      "period": "2005-12",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "77.6"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 432,
	      "period": "2006-01",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "77.51"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 433,
	      "period": "2006-02",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "79.15"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 434,
	      "period": "2006-03",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "79.15"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 435,
	      "period": "2006-04",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "78.91"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 436,
	      "period": "2006-05",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "78.9"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 437,
	      "period": "2006-06",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "78.9"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 438,
	      "period": "2006-07",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "79.54"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 439,
	      "period": "2006-08",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "79.54"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 440,
	      "period": "2006-09",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "79.54"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 441,
	      "period": "2006-10",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "79.54"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 442,
	      "period": "2006-11",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "79.54"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 443,
	      "period": "2006-12",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "79.54"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 444,
	      "period": "2007-01",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "79.86"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 445,
	      "period": "2007-02",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "80.65"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 446,
	      "period": "2007-03",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "80.65"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 447,
	      "period": "2007-04",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "80.65"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 448,
	      "period": "2007-05",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "80.65"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 449,
	      "period": "2007-06",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "80.87"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 450,
	      "period": "2007-07",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "81.56"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 451,
	      "period": "2007-08",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "81.56"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 452,
	      "period": "2007-09",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "81.56"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 453,
	      "period": "2007-10",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "81.56"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 454,
	      "period": "2007-11",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "81.56"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 455,
	      "period": "2007-12",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "81.56"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 456,
	      "period": "2008-01",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "81.56"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 457,
	      "period": "2008-02",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "82.47"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 458,
	      "period": "2008-03",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "82.47"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 459,
	      "period": "2008-04",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "82.47"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 460,
	      "period": "2008-05",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "82.47"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 461,
	      "period": "2008-06",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "82.47"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 462,
	      "period": "2008-07",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "83.11"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 463,
	      "period": "2008-08",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "83.11"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 464,
	      "period": "2008-09",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "83.31"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 465,
	      "period": "2008-10",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "83.31"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 466,
	      "period": "2008-11",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "83.31"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 467,
	      "period": "2008-12",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "83.31"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 468,
	      "period": "2009-01",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "84.9"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 469,
	      "period": "2009-02",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "84.9"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 470,
	      "period": "2009-03",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "84.9"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 471,
	      "period": "2009-04",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "84.9"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 472,
	      "period": "2009-05",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "84.9"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 473,
	      "period": "2009-06",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "84.9"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 474,
	      "period": "2009-07",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "85.75"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 475,
	      "period": "2009-08",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "85.75"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 476,
	      "period": "2009-09",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "85.75"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 477,
	      "period": "2009-10",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "85.75"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 478,
	      "period": "2009-11",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "85.75"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 479,
	      "period": "2009-12",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "85.88"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 480,
	      "period": "2010-01",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "86.81"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 481,
	      "period": "2010-02",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "86.81"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 482,
	      "period": "2010-03",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "86.81"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 483,
	      "period": "2010-04",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "86.81"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 484,
	      "period": "2010-05",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "86.81"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 485,
	      "period": "2010-06",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "86.81"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 486,
	      "period": "2010-07",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "87.48"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 487,
	      "period": "2010-08",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "87.48"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 488,
	      "period": "2010-09",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "87.48"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 489,
	      "period": "2010-10",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "87.48"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 490,
	      "period": "2010-11",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "87.48"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 491,
	      "period": "2010-12",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "87.48"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 492,
	      "period": "2011-01",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "87.57"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 493,
	      "period": "2011-02",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "88.89"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 494,
	      "period": "2011-03",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "88.89"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 495,
	      "period": "2011-04",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "88.89"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 496,
	      "period": "2011-05",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "88.89"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 497,
	      "period": "2011-06",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "88.89"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 498,
	      "period": "2011-07",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "89.71"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 499,
	      "period": "2011-08",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "89.71"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 500,
	      "period": "2011-09",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "89.71"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 501,
	      "period": "2011-10",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "89.71"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 502,
	      "period": "2011-11",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "89.71"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 503,
	      "period": "2011-12",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "89.71"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 504,
	      "period": "2012-01",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "91.97"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 505,
	      "period": "2012-02",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "91.97"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 506,
	      "period": "2012-03",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "92.41"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 507,
	      "period": "2012-04",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "92.63"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 508,
	      "period": "2012-05",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "92.63"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 509,
	      "period": "2012-06",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "92.63"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 510,
	      "period": "2012-07",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "92.63"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 511,
	      "period": "2012-08",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "93.19"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 512,
	      "period": "2012-09",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "93.19"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 513,
	      "period": "2012-10",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "93.19"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 514,
	      "period": "2012-11",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "93.19"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 515,
	      "period": "2012-12",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "93.19"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 516,
	      "period": "2013-01",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "95.28"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 517,
	      "period": "2013-02",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "95.28"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 518,
	      "period": "2013-03",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "95.28"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 519,
	      "period": "2013-04",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "95.21"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 520,
	      "period": "2013-05",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "95.21"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 521,
	      "period": "2013-06",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "95.21"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 522,
	      "period": "2013-07",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "95.21"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 523,
	      "period": "2013-08",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "95.21"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 524,
	      "period": "2013-09",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "95.21"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 525,
	      "period": "2013-10",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "93.99"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 526,
	      "period": "2013-11",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "95.13"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 527,
	      "period": "2013-12",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "95.13"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 528,
	      "period": "2014-01",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "95.13"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 529,
	      "period": "2014-02",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "95.13"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 530,
	      "period": "2014-03",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "95.13"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 531,
	      "period": "2014-04",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "97.8"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 532,
	      "period": "2014-05",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "97.8"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 533,
	      "period": "2014-06",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "97.8"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 534,
	      "period": "2014-07",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "96.51"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 535,
	      "period": "2014-08",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "97.8"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 536,
	      "period": "2014-09",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "97.8"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 537,
	      "period": "2014-10",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "97.8"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 538,
	      "period": "2014-11",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "97.8"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 539,
	      "period": "2014-12",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "97.8"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 540,
	      "period": "2015-01",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "100.08"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 541,
	      "period": "2015-02",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "100.02"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 542,
	      "period": "2015-03",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "100.08"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 543,
	      "period": "2015-04",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "100.08"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 544,
	      "period": "2015-05",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "100.08"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 545,
	      "period": "2015-06",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "99.15"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 546,
	      "period": "2015-07",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "100.08"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 547,
	      "period": "2015-08",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "100.08"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 548,
	      "period": "2015-09",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "100.08"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 549,
	      "period": "2015-10",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "100.08"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 550,
	      "period": "2015-11",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "100.08"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 551,
	      "period": "2015-12",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "100.08"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 552,
	      "period": "2016-01",
	      "release_date": "2016-02-18T00:00:00+00:00",
	      "value": "100.17"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 553,
	      "period": "2016-02",
	      "release_date": "2016-03-15T00:00:00+00:00",
	      "value": "100.17"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 554,
	      "period": "2016-03",
	      "release_date": "2016-04-13T00:00:00+00:00",
	      "value": "100.17"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 555,
	      "period": "2016-04",
	      "release_date": "2016-05-12T00:00:00+00:00",
	      "value": "100.17"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 556,
	      "period": "2016-05",
	      "release_date": "2016-06-15T00:00:00+00:00",
	      "value": "99.75"
	    },
	    {
	      "attributes": {
	        "obs-status": "a"
	      },
	      "ordinal": 557,
	      "period": "2016-06",
	      "release_date": "2016-07-13T00:00:00+00:00",
	      "value": "99.49"
	    }
	    ]
	  }
		]
	};
}
