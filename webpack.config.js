const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './app/index.js',
  ],
  target: 'node',
  output: {
    libraryTarget: 'commonjs',
    path: `${__dirname}/dist`,
    filename: 'app.js',
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
    new UglifyJSPlugin(),
  ],
};
