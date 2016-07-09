let _ = require('lodash');
let Reflux = require('reflux');

let actions = require('./actions');



let _state = {
  'logDisplayed': false
};



var store = Reflux.createStore({
  listenables: [actions],
  getInitialState: function () {
    return _state;
  },
  refresh: function () {
    this.trigger(_state);
  },

  onDisplayLog: function (data) {
    _state['logDisplayed'] = !_state['logDisplayed'];
    this.refresh();
  }
});

module.exports = store;
