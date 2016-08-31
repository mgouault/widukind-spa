import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import { Pagination } from 'react-bootstrap';
import BootstrapTableWrapper from './BootstrapTableWrapper.jsx';

import CustomSelect from './CustomSelect.jsx';



let DataTable = React.createClass({

  formatKeyLink: function (el) {
    return '<a href=\"//widukind.cepremap.org/views/series/'
      + el['provider_name'].toLowerCase() + '-'
      + el['dataset_code'].toLowerCase() + '-'
      + el['key'].toLowerCase() + '\" target=\"_blank\">'
      + el['key'].toLowerCase() + '</a>';
  },

  getData: function () {
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
        'key': this.formatKeyLink(el),
        'slug': el['slug'],
        'name': el['name'],
        'freq': freq,
        'startDate': el['start_date'],
        'endDate': el['end_date']
      });
    });
  },

  onSelect: function ({ slug }) {
    let selection = _.cloneDeep(this.props.value);
    selection.push(slug);
    this.props.onChange(selection);
  },
  onUnselect: function ({ slug }) {
    let selection = _.cloneDeep(this.props.value);
    _.remove(selection, el => el === slug);
    this.props.onChange(selection);
  },
  onSelectAll: function (data) {
    this.props.onChange(_.map(data, el => el['slug']));
  },
  onUnselectAll: function () {
    this.props.onChange([]);
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
          onSelect={this.onSelect}
          onUnselect={this.onUnselect}
          onSelectAll={function () { this.onSelectAll(data); }.bind(this)}
          onUnselectAll={this.onUnselectAll}
        >
          <th data-field="state" data-checkbox></th>
          <th data-field="provider" data-sortable>Provider</th>
          <th data-field="dataset" data-sortable>Dataset</th>
          <th data-field="key" data-sortable>Key</th>
          <th data-field="slug" data-sortable>Slug</th>
          <th data-field="name" data-width="500px">Name</th>
          <th data-field="freq" data-sortable>Freq</th>
          <th data-field="startDate" data-sortable>Start date</th>
          <th data-field="endDate" data-sortable>End date</th>
        </BootstrapTableWrapper>
      </div>
    );
  }
});

// Select


module.exports = DataTable;
