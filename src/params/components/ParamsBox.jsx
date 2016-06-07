var React = require('react');
var _ = require('lodash');
import { Well } from 'react-bootstrap';

var c = require('../../constants');
var CustomSelect = require('./CustomSelect.jsx');
var DimensionsBox = require('./DimensionsBox.jsx');



var ParamsBox = React.createClass({

  render: function () {
    var state = this.props.selected;

    var value = _.map(state[c.selectedDimensions], function (obj) {
      return obj.name
    });

    return (
      <Well>
        <CustomSelect
          key={'providerSelect'}
          name={'Provider'}
          data={state[c.providers]}
          onMissing={actions[c.providersMissing]}
          value={state[c.selectedProvider]}
          onChange={actions[c.providerChange]}
        />
        <CustomSelect
          key={'datasetSelect'}
          name={'Dataset'}
          data={state[c.datasets]}
          onMissing={actions[c.datasetsMissing]}
          value={state[c.selectedDataset]}
          onChange={actions[c.datasetChange]}
        />
        <CustomSelect
          key={'dimensionsSelect'}
          name={'Dimensions'}
          data={state[c.dimensions]}
          onMissing={actions[c.providersMissing]}
          value={value}
          onChange={actions[c.dimensionsChange]}
          multiple={true}
        />
        <DimensionsBox
          key="DimensionsBox"
          data={state[c.selectedDimensions]}
        />
      </Well>
    );
  }
});

module.exports = ParamsBox;
