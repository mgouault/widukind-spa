import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';



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

module.exports = BootstrapTableWrapper;
