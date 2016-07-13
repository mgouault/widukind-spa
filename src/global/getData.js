let _ = require('lodash');

let globalStore = require('./store');
let singletonCaller = require('./singletonCaller');

//   case 'serie':
//     pathname += '/datasets/'+request.query['dataset']+'/series';
//     _.assign(URL['query'], makeQuery(request.query['control']));
//     break;
//   case 'value':
//     pathname += '/series/'+request.query['slug']; break;


function libBuildURL (configObj, reqObj) {
  let url = require('url');
  let _ = require('lodash');
  let URLObj = _.cloneDeep(configObj);
  URLObj['pathname'] = (URLObj['pathname'] || '') + reqObj['pathname'];
  _.assign(URLObj['query'], reqObj['query']);
  return unescape(url.format(URLObj));
}



module.exports = function (reqObj) {
  return globalStore.getConfigObj()
    .then((configObj) => {
      let URL = libBuildURL(configObj, reqObj);
      return singletonCaller(URL);
    })
    .then((received) => {
      return received.data;
    });
};
