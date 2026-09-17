'use strict';

const babelJest = require('babel-jest');

const transformer = babelJest.createTransformer({
  presets: [require.resolve('babel-preset-react-app')],
  babelrc: false,
  configFile: false,
});

module.exports = transformer;
