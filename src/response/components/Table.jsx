var React = require('react');
var _ = require('lodash');
import { Well, Table, Checkbox } from 'react-bootstrap';
var Loader = require('react-loader');
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

var c = require('../../constants');
var actions = require('../../actions');



var container = React.createClass({

  onSelect: function (row) {
    actions[c.selectRow](row['key']);
  },

  render: function () {
    if (this.props.loading) {
      return(<Loader loaded={false}><div></div></Loader>);
    }

    var data = [];
    var selected = [];
    var series = this.props.series;
    var validSeries = !_.isEmpty(series);

    if (validSeries) {
      data = _.map(series, function (el) {
        var freq = el['frequency'];
        switch (el['frequency']) {
          case 'A':
            freq = 'Annually'; break;
          case 'Q':
            freq = 'Quarterly'; break;
          case 'M':
            freq = 'Monthly'; break;
        }
        if (el['checked']) {
          selected.push(el['key']);
        }
        return ({
          'provider': el['provider_name'],
          'dataset': el['dataset_code'],
          'key': el['key'],
          'name': el['name'],
          'freq': freq,
          'startDate': el['start_date'],
          'endDate': el['end_date']
        });
      });
    }

    var selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      selected: selected,
      onSelect: this.onSelect
    };

    return (
      <Well>
        <BootstrapTable
          data={data}
          bordered={true}
          striped={true}
          hover={true}
          condensed={true}
          pagination={true}
          selectRow={selectRow}
        >
          <TableHeaderColumn dataField="provider">Provider</TableHeaderColumn>
          <TableHeaderColumn dataField="dataset">Dataset</TableHeaderColumn>
          <TableHeaderColumn isKey={true} dataField="key">Key</TableHeaderColumn>
          <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
          <TableHeaderColumn dataField="freq">Freq</TableHeaderColumn>
          <TableHeaderColumn dataField="startDate">Start date</TableHeaderColumn>
          <TableHeaderColumn dataField="endDate">End date</TableHeaderColumn>
        </BootstrapTable>
      </Well>
    );
  }
});

module.exports = container;
