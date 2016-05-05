var _ = require('lodash');
var axios = require('axios');

module.exports = function (request) {
  return axios.get('/data'+request.pathname, {
      'params': request.query
    })
    .then(function (received) {
      received = received.data;
      var error = _.get(received, 'error');
      if (error) {
        throw new Error(error.toString());
      }
      return received.data;
    })
    .catch(function (error) {
      console.error(error);
      return null;
    });
};