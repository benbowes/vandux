const { resolve } = require('path');
const DEV = process.env.NODE_ENV !== 'production';

const entry = {
  demo: resolve(__dirname, 'src/examples/index.js'),
  vandux: resolve(__dirname, 'src/vandux/index.ts')
};
const library = 'vandux';
const moduleConfig = {
  rules: [
    { test: /\.ts$/, exclude: /node_modules/, use: { loader: 'awesome-typescript-loader' } },
    { test: /\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader' } }
  ]
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
    output: { filename: './[name].js' },
    resolve: {
      modules: ['node_modules', 'src'],
      extensions: ['.js', '.ts']
    }
  }
  : {
    entry,
    module: moduleConfig,
    output: {
      filename: './dist/[name].js',
      libraryTarget: 'umd',
      library
    },
    resolve: {
      modules: ['node_modules', 'src'],
      extensions: ['.js', '.ts']
    }
  };
