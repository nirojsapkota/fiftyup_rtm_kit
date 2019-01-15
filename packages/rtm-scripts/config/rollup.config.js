'use strict';

const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const paths = require('./paths');
const fs = require('fs');
const packageJson = require(paths.appPackageJson);
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const terser = require('rollup-plugin-terser');
// const peerDepsExternal = require('rollup-plugin-peer-deps-external');
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

const filename = `${paths.appBuild}/${packageJson.rtmRollup.namespace}.${
  packageJson.version
}`;

function copyToMainJs() {
  var replace = `packages\/${packageJson.rtmRollup.namespace}\/build`;
  var re = new RegExp(replace, 'g');
  return {
    name: 'copy-to-main-js', // this name will show up in warnings and errors
    onwrite(output) {
      fs.copyFile(
        output.file,
        `${filename.replace(re, 'dist')}.${
          output.format === 'es' ? 'module.' : ''
        }min.js`,
        err => {
          if (err) throw err;
        }
      );
      fs.mkdir('../../dist', { recursive: true }, err => {});
      fs.copyFile(
        output.file,
        `${filename.replace(re, 'dist')}.${
          output.format === 'es' ? 'module.' : ''
        }min.js`,
        err => {
          if (err) throw err;
        }
      );
    },
  };
}

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
    copyToMainJs(),
  ],
};

const config = {
  inputOptions: inputOptions,
};

module.exports = config;
