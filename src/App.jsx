import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import _ from 'lodash';
import { Grid, Row, Col, Nav, Navbar, NavItem, Panel } from 'react-bootstrap';
import Select from 'react-select';
import Loader from 'react-loader';
import ReactDimensions from 'react-dimensions';

import store from './store';
import actions from './actions';

import CustomSelect from './components/CustomSelect.jsx';
import DataTable from './components/DataTable.jsx';
import LogDisplay from './components/LogDisplay.jsx';
import SeriesGraph from './components/SeriesGraph.jsx';
let SeriesGraphDimensions = ReactDimensions()(SeriesGraph);
import UrlDisplay from './components/UrlDisplay.jsx';



let ComponentWrapper = React.createClass({
  render: function () {
    return (
      <Loader loaded={!this.props.loading}>
        {_.isEmpty(this.props.data) ? <div></div> :
          <div>
            {this.props.children}
          </div>
        }
      </Loader>
    );
  }
});



let Container = React.createClass({
  mixins: [Reflux.connect(store, 'storeState')],

  render: function () {
    let state = this.state.storeState;

    let dimensionsPropsBox = _.map(state['dimension'].value, el => {
      let title = _.capitalize(el.name);
      let obj = { 'data': el.data, 'value': el.value };
      let onSelectWrap = event => actions.selectDimensionsPropsValue(event, el.name);
      return (
        <div key={el.name+'Div'}>
          <br />
          <CustomSelect
            key={el.name+'Select'}
            title={title}
            obj={obj}
            onChange={onSelectWrap}
            multiple
          />
        </div>
      );
    });
    let dimensionsObj = {
      'data': state['dimension'].data,
      'value': _.map(state['dimension'].value, el => el.name)
    };

    return (
      <Grid fluid>

        <Row>
          <Col sm={6} smOffset={3}>
            <Navbar>
              <Navbar.Header>
                <Navbar.Brand>
                  Widukind SPA
                </Navbar.Brand>
              </Navbar.Header>
              <Nav>
                <NavItem eventKey={1} href="//github.com/mgouault/widukind-spa" target="_blank">
                  <img src="assets/github.png" alt="repo github" />
                </NavItem>
                <NavItem eventKey={2} href="//widukind.cepremap.org" target="_blank">
                  Widukind
                </NavItem>
                <NavItem eventKey={3} href="//widukind-api.cepremap.org" target="_blank">
                  API
                </NavItem>
              </Nav>
            </Navbar>
          </Col>
        </Row>

        <Row>
          <Col sm={4}>
            <Panel>
              <div className="paramsDiv">
                <ComponentWrapper loading={state['provider'].loading} data={state['provider'].data}>
                  <CustomSelect
                    key={'providerSelect'}
                    title={'Provider'}
                    obj={state['provider']}
                    onChange={actions.selectProviderValue}
                  />
                </ComponentWrapper>
                <ComponentWrapper loading={state['dataset'].loading} data={state['dataset'].data}>
                  <CustomSelect
                    key={'datasetSelect'}
                    title={'Dataset'}
                    obj={state['dataset']}
                    onChange={actions.selectDatasetValue}
                  />
                </ComponentWrapper>
                <ComponentWrapper loading={state['frequency'].loading} data={state['frequency'].data}>
                  <CustomSelect
                    key={'frequencySelect'}
                    title={'Frequency'}
                    obj={state['frequency']}
                    onChange={actions.selectFrequencyValue}
                    multiple
                  />
                </ComponentWrapper>
                <ComponentWrapper loading={state['dimension'].loading} data={state['dimension'].data}>
                  <CustomSelect
                    key={'dimensionsSelect'}
                    title={'Dimensions'}
                    obj={dimensionsObj}
                    onChange={actions.selectDimensionsValue}
                    multiple
                  />
                </ComponentWrapper>
                {dimensionsPropsBox}
              </div>
            </Panel>
          </Col>

          <Col sm={8}>
            <Row>
              <Col sm={12}>
                <div className="seriesGraphDiv">
                  <ComponentWrapper loading={state['values'].loading} data={state['values'].data}>
                    <SeriesGraphDimensions
                      series={state['values'].data}
                    />
                  </ComponentWrapper>
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <div className="urlDisplayDiv">
                  <UrlDisplay
                    url={state.metadata['url']}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <div className="dataTableDiv">
                  <ComponentWrapper loading={state['series'].loading} data={state['series'].data}>
                    <DataTable
                      data={state['series'].data}
                      value={state['series'].value}
                      onChange={actions.selectSeriesValue}
                    />
                  </ComponentWrapper>
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <LogDisplay
                  log={state.metadata['log']}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <footer className="footer">
          &copy; 2016 Widukind-SPA
        </footer>

      </Grid>
    );
  }
});

ReactDOM.render(
  <Container />,
  document.getElementById('content')
);
