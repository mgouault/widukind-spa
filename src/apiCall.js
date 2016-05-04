var _ = require('lodash');
var axios = require('axios');

module.exports = function (url) {
  return axios.get(url)
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
    });
};