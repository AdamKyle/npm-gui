/* eslint strict: 0 */
'use strict';

const path = require('path');
const webpack = require('webpack');
const argv = require('minimist')(process.argv.slice(2));
const isWeb = (argv && argv.target === 'web');
const output = (isWeb ? 'build/web' : 'build/electron');

let options ={
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-async-to-generator']
        }
    },
    {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
    }],
  },
  output: {
    path: path.join(__dirname, output),
    publicPath: path.join(__dirname, 'src'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    })
  ],
  entry: [
    'babel-polyfill',
    './src/index',
    './assets/layout.scss'
  ]
};

options.target = "electron-renderer"

module.exports = options;
