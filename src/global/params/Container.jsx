let React = require('react');
let Reflux = require('reflux');
let _ = require('lodash');
import { Panel } from 'react-bootstrap';
let Loader = require('react-loader');

let actions = require('./actions');
let store = require('./store');
let CustomSelect = require('../../components/CustomSelect.jsx');



let ParamsContainer = React.createClass({
  mixins: [Reflux.connect(store, 'storeState')],

  render: function () {
    let state = this.state.storeState;

    let dimensionBox = _.map(state['dimensionvalue'].value, function (el) {
      let title = _.capitalize(el.name);
      let onSelectWrap = function (event) {
        actions.selectDimensionvalue(event, el.name);
      };
      return (
        <div key={el.name+'Div'}>
          <br />
          <CustomSelect
            key={el.name+'Select'}
            title={title}
            data={el.data}
            value={el.value}
            onChange={onSelectWrap}
            multiple
          />
        </div>
      );
    });

    return (
      <Panel>
        <div className="controlDiv">

          <Loader loaded={!state['provider'].loading}>
            {_.isEmpty(state['provider'].data) ? <div></div> :
              <CustomSelect
                key={'providerSelect'}
                title={'Provider'}
                data={state['provider'].data}
                value={state['provider'].value}
                onChange={state['provider'].setter}
              />
            }
          </Loader>

          <Loader loaded={!state['dataset'].loading}>
            <br/>
            {_.isEmpty(state['dataset'].data) ? <div></div>:
              <CustomSelect
                key={'datasetSelect'}
                title={'Dataset'}
                data={state['dataset'].data}
                value={state['dataset'].value}
                onChange={state['dataset'].setter}
              />
            }
          </Loader>

          <Loader loaded={!state['frequency'].loading}>
            <br/>
            {_.isEmpty(state['frequency'].data) ? <div></div> :
              <CustomSelect
                key={'frequencySelect'}
                title={'Frequency'}
                data={state['frequency'].data}
                value={state['frequency'].value}
                onChange={state['frequency'].setter}
                multiple
              />
            }
          </Loader>

          <Loader loaded={!state['dimension'].loading}>
            <br/>
            {_.isEmpty(state['dimension'].data) ? <div></div> :
              <CustomSelect
                key={'dimensionSelect'}
                title={'Dimension'}
                data={state['dimension'].data}
                value={state['dimension'].value}
                onChange={state['dimension'].setter}
                multiple
              />
            }
          </Loader>

          {dimensionBox}

        </div>
      </Panel>
    );
  }

});

module.exports = ParamsContainer;
