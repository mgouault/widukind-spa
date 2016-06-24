var _ = require('lodash');
var axios = require('axios');

module.exports = function (request) {
  return axios.get('/data'+request.pathname, {
      'params': request.query
    })
    .then(function (received) {
      received = JSON.parse(received.data); //todo handle 404 error
      var error = _.get(received, 'error');
      if (error) {
        throw new Error(error.toString());
      }
      return received.data;
    });
};
