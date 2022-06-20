/* eslint-disable */

const path = require('path');

module.exports = {
  entry: './dist/esm/index.js',
  output: {
    libraryTarget: 'umd',
    globalObject: 'this',
    filename: 'mojitonft-hooks.js',
    library: 'mojitonft-hooks',
    path: path.resolve(__dirname, './dist/umd/'),
  },
  mode: 'production',
  resolve: {
    extensions: ['.json', '.js'],
  },
  externals: [
    {
      react: 'React',
    },
  ],
  devServer: {
    port: 3000,
  },
};
