let _ = require('lodash');

let buildURL = function (configObj, reqObj) {
  let url = require('url');
  let _ = require('lodash');
  let URLObj = _.cloneDeep(configObj);
  URLObj['pathname'] = (URLObj['pathname'] || '') + reqObj['pathname'];
  _.assign(URLObj['query'], reqObj['query']);
  return unescape(url.format(URLObj));
};

module.exports = buildURL;
