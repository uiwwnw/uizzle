const path = require('path');

module.exports = {
  context: path.resolve(__dirname, './'),
  entry: './App.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: './js/bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    inline: true,
    port: 8800,
    hot: true,
    historyApiFallback: true
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            },
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: 'img/',
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react']
        }
      }
    ]
  },
  performance: { hints: false }
};
