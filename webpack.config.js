const { resolve } = require('path');

module.exports = {

  devtool: 'eval',

  devServer: {
    inline: true,
    contentBase: resolve(__dirname, 'dist')
  },

  entry: ['./src/index.js'],

  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'index.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
