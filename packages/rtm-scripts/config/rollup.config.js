'use strict';

const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const paths = require('./paths');
const packageJson = require(paths.appPackageJson);
// This plugin just allows us to do import thing from './otherFolder'
// and it resolves to index.js
const resolve = require('rollup-plugin-node-resolve');

const inputOptions = {
  input: paths.appIndexJs,
  external: ['react', 'styled-components', 'prop-types'],
  plugins: [
    resolve({
      main: true,
    }),
    babel({
      presets: ['@babel/react'],
      exclude: 'node_modules/**',
    }),
    commonjs(),
  ],
};

// FIXME: I'm not sure what the format should be,
// seems like it works with 'umd' or 'es'.
const outputOptions = {
  file: paths.appBuild + '/main.js',
  format: 'es',
  name: require(paths.appPackageJson).name,
  exports: 'named',
  external: Object.keys(packageJson),
  globals: {
    react: 'React',
    'styled-components': 'styled',
    'prop-types': 't',
  },
};

const config = {
  inputOptions: inputOptions,
  outputOptions: outputOptions,
};

module.exports = config;
