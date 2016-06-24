var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
import { Panel } from 'react-bootstrap';

var c = require('./constants');
var actions = require('./actions');
var store = require('./store');
var CustomSelect = require('../../components/CustomSelect.jsx');



var Container = React.createClass({
  mixins: [Reflux.connect(store, 'storeState')],

  wrap: function (func, staticArg) {
    return function () {
      func(staticArg);
    }
  },

  render: function () {
    let state = this.state.storeState;

    if (state.loading) {
      return (<Loader loaded={false}><div></div></Loader>);
    }

    let selectedDimensionsString = _.map(state[c.selectedDimensions], function (el) {
      return el.name
    });

    let providersMissingWrap = this.wrap(actions[c.providersMissing], state);
    let datasetsMissingWrap = this.wrap(actions[c.datasetsMissing], state);
    let frequenciesMissingWrap = this.wrap(actions[c.frequenciesMissing], state);
    let dimensionsMissingWrap = this.wrap(actions[c.dimensionsMissing], state);

    let providersLoading = (state[c.loading].indexOf('providers') > -1);
    let datasetsLoading = (state[c.loading].indexOf('datasets') > -1);
    let frequenciesLoading = (state[c.loading].indexOf('frequencies') > -1);
    let dimensionsLoading = (state[c.loading].indexOf('dimensions') > -1);

    let dimensionsBox = _.map(state[c.selectedDimensions], function (el) {
      let name = _.capitalize(el.name);
      let onChangeWrap = function (event) {
        actions[c.changeDimensionValues](event, el.name);
      };
      return (<CustomSelect
        key={el.name}
        name={name}
        data={el.value}
        onMissing={function () {}}
        value={el.selected}
        onChange={onChangeWrap}
        loading={false}
        multiple
      />);
    });

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
            multiple
          />
          <br/>
          <CustomSelect
            key={'dimensionsSelect'}
            name={'Dimensions'}
            data={state[c.dimensions]}
            onMissing={dimensionsMissingWrap}
            value={selectedDimensionsString}
            onChange={actions[c.changeDimensions]}
            loading={dimensionsLoading}
            multiple
          />
          <br/>
          {dimensionsBox}
        </div>
      </Panel>
    );
  }

});

module.exports = Container;
