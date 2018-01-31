const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './backend/index.js',
  ],
  target: 'node',
  output: {
    libraryTarget: 'commonjs',
    path: `${__dirname}/dist`,
    filename: 'handler.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    (true ? new UglifyJSPlugin() : null),
  ].filter(Boolean),
};
