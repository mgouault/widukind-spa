var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var dispatcher = require('../dispatcher');
var c = require('../constants');
var ParamsStore = require('../params/store');
var apiCall = require('../apiCall');



var CHANGE_EVENT = 'change';

var _statePattern = {};
_statePattern[c.S_SERIES] = [];
_statePattern[c.S_LOG] = [];
_statePattern[c.S_LOG_DISPLAYED] = false;

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
    _state['S_SERIES'] = paramsState['S_SERIES'];
    if (!_.isEmpty(paramsState['S_SERIES'])) {
      _state['S_LOG'] = JSON.stringify(paramsState['S_SERIES'], null, 2)
        + '\n -------------------- \n'
        + _state['S_LOG'];
    }
    self.emitChange();
  },

  init: function () {
    ParamsStore.addChangeListener(self.updateState);
  },

  selectSerie: function (index) {
    var serie = _state[c.S_SERIES][index];
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
        _state[c.S_SERIES][index] = serie;
      });
  },

  dispatchToken: dispatcher.register(function (action) {
    switch (action.actionType) {

      case c.DISPLAY_LOG:
        _state[c.S_LOG_DISPLAYED] = !_state[c.S_LOG_DISPLAYED];
        self.emitChange();
        break;

      case c.SELECT_ROW:
        var index = _.findIndex(_state[c.S_SERIES], {'key': action.data});
        self.selectSerie(index).then(self.emitChange);
        break;

    }
  })

});

module.exports = store;
