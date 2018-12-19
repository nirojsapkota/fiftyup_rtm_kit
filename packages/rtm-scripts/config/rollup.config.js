'use strict';

const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const paths = require('./paths');
const packageJson = require(paths.appPackageJson);
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const terser = require('rollup-plugin-terser');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');

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
  external: ['react', 'prop-types', 'styled-components'],
  plugins: [
    peerDepsExternal({
      packageJsonPath: paths.appPackageJson,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    terser.terser({
      sourcemap: true,
    }),
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

const outputOptions = {
  file: `${paths.appBuild}/${packageJson.rtmRollup.namespace}.${
    packageJson.version
  }.min.js`,
  format: 'umd',
  name: packageJson.rtmRollup.defaultExport,
  exports: 'named',
  globals: {
    react: 'React',
    'prop-types': 'PropTypes',
    'styled-components': 'styled',
  },
};

const config = {
  inputOptions: inputOptions,
  outputOptions: outputOptions,
};

module.exports = config;
