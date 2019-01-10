'use strict';

const paths = require('../config/paths');
const packageJson = require(paths.appPackageJson);
const rollup = require('rollup');
const { inputOptions } = require('../config/rollup.config');
const argv = process.argv.slice(2);
const shouldWatch = argv.indexOf('--watch') !== -1;
const esm = argv.indexOf('--esm') !== -1;
const watchMap = {
  BUNDLE_START: 'building an individual bundle',
  BUNDLE_END: 'finished building a bundle',
  ERROR: 'encountered an error while bundling',
  FATAL: 'encountered an unrecoverable error',
};

const es = {
  file: paths.appBuild + '/module.js',
  format: 'es',
  name: packageJson.rtmRollup.defaultExport,
  exports: 'named',
  globals: {
    react: 'React',
    'prop-types': 'PropTypes',
    'styled-components': 'styled',
  },
};
const umd = {
  file: paths.appBuild + '/main.js',
  format: 'umd',
  name: packageJson.rtmRollup.defaultExport,
  exports: 'named',
  globals: {
    react: 'React',
    'prop-types': 'PropTypes',
    'styled-components': 'styled',
  },
};

function build() {
  [es, umd].map(async format => {
    const bundle = await rollup.rollup(inputOptions);
    await bundle.write(format);
  });
}

async function watch() {
  const watcher = await rollup.watch({
    ...inputOptions,
    output: [outputOptions],
  });
  watcher.on('event', event => {
    if (watchMap[event.code]) {
      console.log(watchMap[event.code]);
    }
  });
}

let command;
if (shouldWatch) {
  command = watch;
} else {
  command = build;
}

command();
