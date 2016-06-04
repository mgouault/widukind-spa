var React = require('react');
var _ = require('lodash');
import { Well, Table } from 'react-bootstrap';
var Loader = require('react-loader');



var container = React.createClass({

  render: function () {
    var toRender = [];
    var validSeries = !_.isEmpty(this.props.series);

    if (validSeries) {
      toRender = _.map(this.props.series, function (el) {
        var freq = el['frequency'];
        switch (el['frequency']) {
          case 'A':
            freq = 'Annually'; break;
          case 'Q':
            freq = 'Quarterly'; break;
          case 'M':
            freq = 'Monthly'; break;
        }
        return (
          <tr key={el['key']}>
            <td>{el['provider_name']}</td>
            <td>{el['dataset_code']}</td>
            <td>{el['key']}</td>
            <td>{el['name']}</td>
            <td>{freq}</td>
            <td>{el['start_date']}</td>
            <td>{el['end_date']}</td>
          </tr>
        );
      });
    }
    
    return (
      <Well>
        <Loader loaded={validSeries}>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Provider</th>
                <th>Dataset</th>
                <th>Key</th>
                <th>Name</th>
                <th>Freq</th>
                <th>Start date</th>
                <th>End date</th>
              </tr>
            </thead>
            <tbody>
              {toRender}
            </tbody>
          </Table>
        </Loader>
      </Well>
    );
  }
});

module.exports = container;