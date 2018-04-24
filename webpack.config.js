const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './app/index.js',
  ],
  mode: 'development',
  target: 'node',
  output: {
    libraryTarget: 'commonjs',
    path: `${__dirname}/output`,
    filename: 'index.js',
  },
  module: {
    rules: [
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
