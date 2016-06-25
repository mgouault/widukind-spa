let _ = require('lodash');
let Reflux = require('reflux');

let actions = require('./actions');

let _state = {
  'requestPathname': {
    'series': '',
    'values': ''
  }
};



let store = Reflux.createStore({
  listenables: [actions],
  getInitialState: function () {
    return _state;
  },
  refresh: function () {
    this.trigger(_state);
  },

  onNewURL: function (URL) {
console.log('3');
    let dataset = URL['dataset'];
    let querystring = URL['querystring'];
    let QSString = '';
    if (!_.isEmpty(querystring)) {
      let tmp = _.map(Object.keys(querystring), function (key) {
        let val = querystring[key];
        return key+'='+val;
      });
      QSString = '?' + _.join(tmp, '&');
    }
    _state['requestPathname']['series'] = '/datasets/' + dataset + '/series' + QSString;
    _state['requestPathname']['values'] = '/datasets/' + dataset + '/values' + QSString;
    this.refresh();
  }
});

module.exports = store;
