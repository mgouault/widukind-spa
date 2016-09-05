import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import { Pagination } from 'react-bootstrap';

import CustomSelect from './CustomSelect.jsx';



let BootstrapTableWrapper = React.createClass({

  componentDidMount: function () {
    let {
      data, values, classes, striped, showColumns,
      onSelect, onUnselect, onSelectAll, onUnselectAll
    } = this.props;
		$(ReactDOM.findDOMNode(this)).bootstrapTable({
      data, classes, striped, showColumns
    })
    .bootstrapTable('hideLoading')
    .bootstrapTable('checkBy', { field: 'slug', values })
    .on('check.bs.table', (e, row) => onSelect(row))
    .on('uncheck.bs.table', (e, row) =>  onUnselect(row))
    .on('check-all.bs.table', e => onSelectAll())
    .on('uncheck-all.bs.table', e => onUnselectAll());
	},

  componentWillUnmount: function () {
    $(ReactDOM.findDOMNode(this)).bootstrapTable('destroy');
  },

  render: function () {
    return  (
      <table>
        <thead>
          <tr>
            {this.props.children}
          </tr>
        </thead>
      </table>
    );
  }
});



let DataTable = React.createClass({

  formatKeyLink: function (el) {
    return '<a href=\"//widukind.cepremap.org/views/series/'
      + el['provider_name'].toLowerCase() + '-'
      + el['dataset_code'].toLowerCase() + '-'
      + el['key'].toLowerCase() + '\" target=\"_blank\">'
      + el['key'].toLowerCase() + '</a>';
  },

  getData: function () {
    return _.map(this.props.data, (el) => ({
        'provider': el['provider_name'],
        'dataset': el['dataset_code'],
        'key': this.formatKeyLink(el),
        'slug': el['slug'],
        'name': el['name'],
        'frequency': el['frequency'],
        'startDate': el['start_date'],
        'endDate': el['end_date']
      })
    );
  },

  render: function () {
    let data = this.getData();
    return  (
      <div className="dataTableDiv">
        <CustomSelect
          key={'perPageSelect'}
          title={'Per page'}
          obj={{'data':[10, 25, 50, 100], 'value': this.props.paginationPerPage}}
          onChange={this.props.paginationSelectPerPage}
        />
        <strong>Total results: {this.props.paginationTotalResults}</strong>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          items={this.props.paginationPagesNb}
          maxButtons={5}
          activePage={this.props.paginationActivePage}
          onSelect={this.props.paginationSelectActivePage}
        />
        <BootstrapTableWrapper
          data={data}
          values={this.props.value}
          classes="table table-hover table-bordered"
          striped="true"
          showColumns="true"
          onSelect={this.props.onSelect}
          onUnselect={this.props.onUnselect}
          onSelectAll={this.props.onSelectAll}
          onUnselectAll={this.props.onUnselectAll}
        >
          <th data-field="state" data-checkbox></th>
          <th data-field="provider" data-sortable>Provider</th>
          <th data-field="dataset" data-sortable>Dataset</th>
          <th data-field="key" data-sortable>Key</th>
          <th data-field="slug" data-sortable>Slug</th>
          <th data-field="name" data-width="500px">Name</th>
          <th data-field="frequency" data-sortable>Frequency</th>
          <th data-field="startDate" data-sortable>Start date</th>
          <th data-field="endDate" data-sortable>End date</th>
        </BootstrapTableWrapper>
      </div>
    );
  }
});



module.exports = DataTable;
