var rewireWebpack = require('rewire-webpack');

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      { pattern: 'node_modules/babel-polyfill/dist/polyfill.js', watched: false },
      { pattern: 'tests.webpack.js', watched: false },
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap'],
    },
    reporters: ['dots'],
    singleRun: true,
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              plugins: ['transform-runtime'],
              presets: ['airbnb', 'es2015', 'stage-0', 'react']
            }
          }
        ],
      },
      watch: true,
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      plugins: [
        new rewireWebpack()
      ]
    },
    webpackServer: {
      noInfo: true,
    },
  });
};
