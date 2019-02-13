const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    inline: true,
    port: 1100,
    hot: true,
    host: '0.0.0.0',
    historyApiFallback: true,
  },
  mode: 'development'
});
