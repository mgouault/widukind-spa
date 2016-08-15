import React from 'react';
import _ from 'lodash';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';



export const DataTable = React.createClass({

  buildData: function () {
    return _.map(this.props.data, (el) => {
      let freq = el['frequency'];
      switch (el['frequency']) {
        case 'A':
          freq = 'Annually'; break;
        case 'Q':
          freq = 'Quarterly'; break;
        case 'M':
          freq = 'Monthly'; break;
      }
      return ({
        'provider': el['provider_name'],
        'dataset': el['dataset_code'],
        'key': el['key'],
        'slug': el['slug'],
        'name': el['name'],
        'freq': freq,
        'startDate': el['start_date'],
        'endDate': el['end_date']
      });
    });
  },

  onClickRow: function (slug, checked) {
    let selection = _.cloneDeep(this.props.value);
    if (checked) {
      selection.push(slug);
    } else {
      _.remove(selection, (el) => {return el === slug});
    }
    this.props.onChange(selection);
  },
  onClickRowAll: function (data, checked) {
    let selection = []
    if (checked) {
      selection = _.map(data, (el) => {
        return el['slug']
      });
    }
    this.props.onChange(selection);
  },

  render: function () {
    let data = this.buildData();
    let selectRow = {
      'mode': 'checkbox',
      'clickToSelect': true,
      'selected': this.props.value,
      'onSelect': (row, checked) => { this.onClickRow(row['slug'], checked); },
      'onSelectAll': (checked) => { this.onClickRowAll(data, checked); },
      'bgColor': '#9ACBDB'
    };

    return (
      <div className="dataTableDiv">
        <BootstrapTable
          data={data}
          bordered={true}
          striped={true}
          hover={true}
          condensed={true}
          selectRow={selectRow}
        >
          <TableHeaderColumn dataField="provider" dataSort>Provider</TableHeaderColumn>
          <TableHeaderColumn dataField="dataset" dataSort>Dataset</TableHeaderColumn>
          <TableHeaderColumn dataField="key" dataSort>Key</TableHeaderColumn>
          <TableHeaderColumn isKey={true} dataField="slug" dataSort>Slug</TableHeaderColumn>
          <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
          <TableHeaderColumn dataField="freq" dataSort>Freq</TableHeaderColumn>
          <TableHeaderColumn dataField="startDate" dataSort>Start date</TableHeaderColumn>
          <TableHeaderColumn dataField="endDate" dataSort>End date</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }

});
