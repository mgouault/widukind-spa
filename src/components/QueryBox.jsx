var React = require('react');
var _ = require('lodash');

var QueryBox = module.exports = React.createClass({
  render: function () {
    var url = '';
    url = 'http://widukind-api-dev.cepremap.org/api/v1/json/datasets/'+this.props.dataset+'/values';
    var values = this.props.values;
    var first = true;
    for (var i = 0; i < values.length ; i++) {
      var name = values[i].name;
      var selected = values[i].selected;
      if (typeof selected !== 'undefined' && !_.isEmpty(selected)) {
        if (first) {
          url += '?';
          first = false;
        }
        var params = '';
        for (var i = 0; i < selected.length ; i++) {
          params += ((i > 0) ? '+' : '') + selected[i];
        }
        url += name + '=' + params;
      }
    }
    return (
      <div>
        {url}
      </div>
    );
  }
});