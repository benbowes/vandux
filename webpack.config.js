const { resolve } = require('path');
const DEV = process.env.NODE_ENV !== 'production';

const entry = {
  demo: './src/index.js',
  vandux: './src/vandux/index.js'
};
const library = 'vandux';
const moduleConfig = {
  rules: [{
    test: /\.js$/,
    exclude: /node_modules/,
    use: { loader: 'babel-loader' }
  }]
};

module.exports = (DEV)
  ? {
    devtool: DEV ? 'eval' : '',
    devServer: {
      inline: true,
      contentBase: resolve(__dirname, 'dist')
    },
    entry,
    module: moduleConfig,
    output: { filename: './[name].js' }
  }
  : [{
    entry,
    module: moduleConfig,
    output: {
      filename: './dist/[name].js',
      libraryTarget: 'umd',
      library
    }
  }, {
    entry,
    module: moduleConfig,
    output: {
      filename: './dist/[name].var.js',
      libraryTarget: 'var',
      library
    }
  }];
