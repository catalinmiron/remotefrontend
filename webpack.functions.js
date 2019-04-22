const webpack = require('webpack');

module.exports = {
  // mode: 'development',
  node: {
    __dirname: true
  },
  plugins: [new webpack.DefinePlugin({ 'global.GENTLY': false })]
};
