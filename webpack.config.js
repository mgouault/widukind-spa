var path = require('path');

module.exports = {
	context: __dirname,
	entry: './src/App.jsx',
	output: {
		path: './public',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			include: [
				path.resolve(__dirname, 'src')
			],
			loader: 'babel-loader'
		}]
	}
};
