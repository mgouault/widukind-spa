var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
import { Panel } from 'react-bootstrap';

var c = require('../constants');
var actions = require('../actions');
var store = require('./store');
var CustomSelect = require('./components/CustomSelect.jsx');
var DimensionsBox = require('./components/DimensionsBox.jsx');



var container = React.createClass({
  mixins: [Reflux.connect(store, 'storeState')],

  wrap: function (func, staticArg) {
    return function () {
      func(staticArg);
    }
  },

  render: function () {
    var state = this.state.storeState;

    var selectedDimensions = _.map(state[c.selectedDimensions], function (obj) {
      return obj.name
    });

    var providersMissingWrap = this.wrap(actions[c.providersMissing], state);
    var datasetsMissingWrap = this.wrap(actions[c.datasetsMissing], state);
    var frequenciesMissingWrap = this.wrap(actions[c.frequenciesMissing], state);
    var dimensionsMissingWrap = this.wrap(actions[c.dimensionsMissing], state);

    var providersLoading = (state[c.loading].indexOf('providers') > -1);
    var datasetsLoading = (state[c.loading].indexOf('datasets') > -1);
    var frequenciesLoading = (state[c.loading].indexOf('frequencies') > -1);
    var dimensionsLoading = (state[c.loading].indexOf('dimensions') > -1);

    return (
      <Panel>
        <div className="controlsDiv">
          <CustomSelect
            key={'providerSelect'}
            name={'Provider'}
            data={state[c.providers]}
            onMissing={providersMissingWrap}
            value={state[c.selectedProvider]}
            onChange={actions[c.changeProvider]}
            loading={datasetsLoading}
          />
          <br/>
          <CustomSelect
            key={'datasetSelect'}
            name={'Dataset'}
            data={state[c.datasets]}
            onMissing={datasetsMissingWrap}
            value={state[c.selectedDataset]}
            onChange={actions[c.changeDataset]}
            loading={providersLoading}
          />
          <br/>
          <CustomSelect
            key={'frequenciesSelect'}
            name={'Frequencies'}
            data={state[c.frequencies]}
            onMissing={frequenciesMissingWrap}
            value={state[c.selectedFrequencies]}
            onChange={actions[c.changeFrequencies]}
            loading={frequenciesLoading}
            multiple={true}
          />
          <br/>
          <CustomSelect
            key={'dimensionsSelect'}
            name={'Dimensions'}
            data={state[c.dimensions]}
            onMissing={dimensionsMissingWrap}
            value={selectedDimensions}
            onChange={actions[c.changeDimensions]}
            loading={dimensionsLoading}
            multiple={true}
          />
          <br/>
          <DimensionsBox
            key="DimensionsBox"
            data={state[c.selectedDimensions]}
          />
        </div>
      </Panel>
    );
  }

});

module.exports = container;
