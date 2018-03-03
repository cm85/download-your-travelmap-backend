const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const WebpackSHAHash = require('webpack-sha-hash');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: 'styles.[contenthash].css',
});


module.exports = {
  entry: {
    js: './frontend/scripts/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[chunkhash].js',
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
                require('autoprefixer')(),
                require('cssnano')(),
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
      hashFuncNames: ['sha256', 'sha384'],
      enabled: true,
    }),
    new HtmlWebpackPlugin({
      template: './frontend/index.html',
      inject: false,
    }),
    new HtmlWebpackInlineSVGPlugin({
      svgoConfig: {
        removeTitle: false,
        removeViewBox: true,
      },
    }),
    new UglifyJsPlugin(),
    new WebpackSHAHash(),
    extractSass,
  ],
};
