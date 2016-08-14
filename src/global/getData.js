let _ = require('lodash');

let globalStore = require('./store');
let singletonCaller = require('../lib/singletonCaller');
let buildURL = require('../lib/buildURL');



module.exports = function (reqObj) {
  return globalStore.getConfigObj()
    .then((configObj) => {
      let URL = buildURL(configObj, reqObj);
      return singletonCaller(URL);
    })
    .then((received) => {
      return received.data;
    });
};
