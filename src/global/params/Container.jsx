let React = require('react');
let Reflux = require('reflux');
let _ = require('lodash');
let { Panel } = require('react-bootstrap');
let Loader = require('react-loader');
let Select = require('react-select');

let actions = require('./actions');
let store = require('./store');



let CustomSelect = React.createClass({

  render: function () {
    let options = _.map(this.props.data, (el) => {
      if (typeof el === 'object') {
        return el;
      }
      return ({'value':el, 'label':el});
    });
    return (
      <div>
        <strong>{this.props.title}:</strong>
        <Select
          onChange={this.props.onChange}
          value={this.props.value}
          multi={this.props.multiple}
          options={options}
        />
      </div>
    );
  }
});



let ParamsContainer = React.createClass({
  mixins: [Reflux.connect(store, 'storeState')],

  render: function () {
    let state = this.state.storeState;

    let dimensionBox = _.map(state['dimension'].value, (el) => {
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

    let dimensionValueSimple = _.map(state['dimension'].value, (el) => el.name);

    return (
      <Panel>
        <div className="paramsDiv">

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
                value={dimensionValueSimple}
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
