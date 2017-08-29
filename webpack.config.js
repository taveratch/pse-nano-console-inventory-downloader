var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: './main.js',
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      { test: /\.json$/, loader: 'json-loader'},
      { test: /\.ttf$/,  loader: "url-loader?limit=10000&mimetype=application/octet-stream" }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty',
      fs: "empty",
      child_process: 'empty'
    }
};
