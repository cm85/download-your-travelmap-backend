/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const WebpackSHAHash = require('webpack-sha-hash');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const extractSass = new ExtractTextPlugin({
  filename: '[contenthash:20].css',
});

module.exports = {
  entry: {
    js: './frontend/scripts/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist', 's3'),
    filename: '[chunkhash].js',
    publicPath: '/',
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
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer(),
                cssnano(),
              ],
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
          ],
        }),
      },
    ],
  },
  plugins: [
    new SriPlugin({
      hashFuncNames: ['sha384'],
      enabled: true,
    }),
    new HtmlWebpackPlugin({
      template: './frontend/index.hbs',
      inject: false,
    }),
    new HtmlWebpackInlineSVGPlugin({
      runPreEmit: true,
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        handlebarsLoader: {},
      },
    }),
    new UglifyJsPlugin(),
    new WebpackSHAHash(),
    extractSass,
  ],
};
