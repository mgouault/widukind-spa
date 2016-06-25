let React = require('react');
let Reflux = require('reflux');
let _ = require('lodash');
import { Panel } from 'react-bootstrap';
let Loader = require('react-loader');

let actions = require('./actions');
let store = require('./store');
let CustomSelect = require('../../components/CustomSelect.jsx');



let Container = React.createClass({
  mixins: [Reflux.connect(store, 'storeState')],

  render: function () {
    let state = this.state.storeState;

    let selectedDimension = _.map(state['dimension'].value, function (el) {
      return el.name
    });

    let dimensionBox = _.map(state['dimensionValue'].value, function (el) {
      let title = _.capitalize(el.name);
      let onSelectWrap = function (event) {
        actions.selectDimensionValues(event, el.name);
      };
      return (
        <br />
        <CustomSelect
          key={el.name+'Select'}
          title={title}
          data={el.data}
          value={el.value}
          onChange={onSelectWrap}
          multiple
        />
      );
    }); // todo: refactorize dimensionValue

    return (
      <Panel>
        <div classtitle="controlDiv">

          {(!state['provider'].active) ?:
            <Loader loaded={!state['provider'].loading}>
              <CustomSelect
                key={'providerSelect'}
                title={'Provider'}
                data={state['provider'].data}
                value={state['provider'].value}
                onChange={state['provider'].setter}
              />
            </Loader>
          }

          {(!state['dataset'].active) ?:
            <br/>
            <Loader loaded={!state['dataset'].loading}>
              <CustomSelect
                key={'datasetSelect'}
                title={'Dataset'}
                data={state['dataset'].data}
                value={state['dataset'].value}
                onChange={state['dataset'].setter}
              />
            </Loader>
          }

          {(!state['frequency'].active) ?:
            <br/>
            <Loader loaded={!state['frequency'].loading}>
              <CustomSelect
                key={'frequencySelect'}
                title={'Frequency'}
                data={state['frequency'].data}
                value={state['frequency'].value}
                onChange={state['frequency'].setter}
                multiple
              />
            </Loader>
          }

          {(!state['dimension'].active) ?:
            <br/>
            <Loader loaded={!state['dimension'].loading}>
              <CustomSelect
                key={'dimensionSelect'}
                title={'Dimension'}
                data={state['dimension'].data}
                value={selectedDimension}
                onChange={state['dimension'].setter}
                multiple
              />
            </Loader>
          }

          {dimensionBox}

        </div>
      </Panel>
    );
  }

});

module.exports = Container;
