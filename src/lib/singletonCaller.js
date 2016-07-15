let axios = require('axios');

// todo singleton request canceller

let singletonCaller = function (link) {
	return axios.get(link)
		.then((received) => {
			received = received.data; // todo handle 404 error
			let error = _.get(received, 'error');
			if (error) {
				throw new Error(error.toString());
			}
			return received;
		});
};

module.exports = singletonCaller;
