const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: './App.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [ 'raw-loader' ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              singleton: true,
            },
          }
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: 'img/',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
    ],
  },
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'public/index.html'),
        to: path.resolve(__dirname, 'dist')
      },
    ]),
  ],
};
