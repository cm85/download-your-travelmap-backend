const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');

const extractSass = new ExtractTextPlugin({
  filename: 'styles.[contenthash].css',
});


module.exports = {
  entry: {
    js: './frontend/scripts/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist',
    crossOriginLoading: 'anonymous',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015'],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader',
          }, {
            loader: 'sass-loader',
          }],
        }),
      },
    ],
  },
  plugins: [
    new SriPlugin({
      hashFuncNames: ['sha256', 'sha384'],
      enabled: true,
    }),
    new HtmlWebpackPlugin({
      template: './frontend/template/index.html',
      inject: false,
    }),
    extractSass,
  ],
};
