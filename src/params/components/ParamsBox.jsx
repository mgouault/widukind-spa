var React = require('react');
var _ = require('lodash');
import { Well } from 'react-bootstrap';

var c = require('../../constants');
var actions = require('../../actions');
var CustomSelect = require('./CustomSelect.jsx');
var DimensionsBox = require('./DimensionsBox.jsx');



function wrap (func, staticArg) {
  return function () {
    func(staticArg);
  }
}



var ParamsBox = React.createClass({

  render: function () {
    var state = this.props.storeState;

    var selectedDimensions = _.map(state[c.selectedDimensions], function (obj) {
      return obj.name
    });

    var providersMissingWrap = wrap(actions[c.providersMissing],state);
    var datasetsMissingWrap = wrap(actions[c.datasetsMissing],state);
    var dimensionsMissingWrap = wrap(actions[c.dimensionsMissing], state);

    return (
      <Well>
        <CustomSelect
          key={'providerSelect'}
          name={'Provider'}
          data={state[c.providers]}
          onMissing={providersMissingWrap}
          value={state[c.selectedProvider]}
          onChange={actions[c.changeProvider]}
        />
        <CustomSelect
          key={'datasetSelect'}
          name={'Dataset'}
          data={state[c.datasets]}
          onMissing={datasetsMissingWrap}
          value={state[c.selectedDataset]}
          onChange={actions[c.changeDataset]}
        />
        <CustomSelect
          key={'dimensionsSelect'}
          name={'Dimensions'}
          data={state[c.dimensions]}
          onMissing={dimensionsMissingWrap}
          value={selectedDimensions}
          onChange={actions[c.changeDimensions]}
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
