var path = require('path');

module.exports = {
	context: __dirname,
	entry: "./src/app.jsx",
	output: {
		path: "./public",
		filename: "bundle.js"
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			include: [
				path.resolve(__dirname, 'src'),
				path.resolve(__dirname, 'src/components')
			],
			loader: 'babel-loader'
		}]
	}
};