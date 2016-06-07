var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var dispatcher = require('../dispatcher');
var c = require('../constants');
var ParamsStore = require('../params/store');
var apiCall = require('../apiCall');



var CHANGE_EVENT = 'change';

var _statePattern = {};
_statePattern[c.series] = [];
_statePattern[c.log] = [];
_statePattern[c.logDisplayed] = false;

var _state = _.cloneDeep(_statePattern);



var store = _.assign({}, EventEmitter.prototype);
var self = store;
store = _.assign(store, {

  /* Store methods */
  getState: function () {
    return _state;
  },
  emitChange: function () {
    self.emit(CHANGE_EVENT);
  },
  addChangeListener: function (callback) {
    self.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {``
    self.removeListener(CHANGE_EVENT, callback);
  },
  /**/

  updateState: function () {
    var paramsState = ParamsStore.getState();
    _state[c.series] = paramsState[c.series];
    if (!_.isEmpty(paramsState[c.series])) {
      _state[c.log] = JSON.stringify(paramsState[c.series], null, 2)
        + '\n -------------------- \n'
        + _state[c.log];
    }
    self.emitChange();
  },

  init: function () {
    ParamsStore.addChangeListener(self.updateState);
  },

  selectSerie: function (index) {
    var serie = _state[c.series][index];
    serie['checked'] = !serie['checked'];
    return Promise.resolve()
      .then(function () {
        if (serie['checked'] && !serie['values']) {
          return apiCall({
            'pathname': '/values',
            'query': {'slug': serie['slug']}
          });
        }
      })
      .then(function (result) {
        if (result) {
          serie['values'] = result.values;
        }
        _state[c.series][index] = serie;
      });
  },

  dispatchToken: dispatcher.register(function (action) {
    switch (action.actionType) {

      case c.displayLog:
        _state[c.logDisplayed] = !_state[c.logDisplayed];
        self.emitChange();
        break;

      case c.selectRow:
        var index = _.findIndex(_state[c.series], {'key': action.data});
        self.selectSerie(index).then(self.emitChange);
        break;

    }
  })

});

module.exports = store;
