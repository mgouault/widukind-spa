import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import BootstrapTableWrapper from './BootstrapTableWrapper.jsx';



let DataTable = React.createClass({

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
        // 'key': '<a href=\"http://widukind.cepremap.org/views/series/'+el['dataset_code']+'-'+el['key']+'\">'+el['key']+'</a>',
        'key': el['key'],
        'slug': el['slug'],
        'name': el['name'],
        'freq': freq,
        'startDate': el['start_date'],
        'endDate': el['end_date']
      });
    });
  },

  // getColumns: function () {
  //   return [
  //     {
  //       field: 'provider',
  //       title: 'Provider',
  //       sortable: true
  //     },
  //     {
  //       field: 'dataset',
  //       title: 'Dataset',
  //       sortable: true
  //     },
  //     {
  //       field: 'key',
  //       title: 'Key',
  //       sortable: true
  //     },
  //     {
  //       field: 'slug',
  //       title: 'Slug',
  //       sortable: true
  //     },
  //     {
  //       field: 'name',
  //       title: 'Name',
  //       width: '30%'
  //     },
  //     {
  //       field: 'freq',
  //       title: 'Freq',
  //       sortable: true
  //     },
  //     {
  //       field: 'startDate',
  //       title: 'Start date',
  //       sortable: true
  //     },
  //     {
  //       field: 'endDate',
  //       title: 'End date',
  //       sortable: true
  //     }
  //   ];
  // },

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
    // todo show/hide column buttons
    let data = this.getData();
    return  (
      <div className="dataTableDiv">
        <BootstrapTableWrapper
          data={data}
          values={this.props.value}
          classes="table table-hover table-bordered"
          striped="true"
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
