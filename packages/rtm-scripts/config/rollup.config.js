'use strict';

const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const paths = require('./paths');
const packageJson = require(paths.appPackageJson);
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const terser = require('rollup-plugin-terser');
const autoExternal = require('rollup-plugin-auto-external');

let rtmDependencies = [];
if (packageJson.dependencies) {
  rtmDependencies = Object.keys(packageJson.dependencies).filter(dep =>
    dep.startsWith('@rtm-ui')
  );
}

const getRollupConfig = packageName => {
  return require(`../../${packageName.split('/')[1]}/package.json`).rtmRollup;
};

const namedExports = {};
rtmDependencies.map(dep => getRollupConfig(dep)).map(packageRollup => {
  return (namedExports[`../${packageRollup.namespace}/build/main.js`] =
    packageRollup.namedExports);
});

const inputOptions = {
  input: paths.appIndexJs,
  plugins: [
    autoExternal({
      packagePath: paths.appPackageJson,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    terser.terser(),
    resolve({
      main: true,
    }),
    babel({
      presets: ['@babel/react'],
      exclude: 'node_modules/**',
    }),
    commonjs({
      namedExports: namedExports,
    }),
  ],
};

const config = {
  inputOptions: inputOptions,
};

module.exports = config;
