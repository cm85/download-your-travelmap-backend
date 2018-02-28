const path = require('path');
const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {
  entry: './frontend/scripts/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist',
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
    ],
  },
  plugins: [
    new WebpackAssetsManifest({
      merge: true,
    }),
  ],
};
