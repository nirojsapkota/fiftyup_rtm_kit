'use strict';

const rollup = require('rollup');
const { inputOptions, outputOptions } = require('../config/rollup.config');
const argv = process.argv.slice(2);
const shouldTranspile = argv.indexOf('--no-transpile') === -1;
const shouldWatch = argv.indexOf('--watch') !== -1;
const watchMap = {
  BUNDLE_START: 'building an individual bundle',
  BUNDLE_END: 'finished building a bundle',
  ERROR: 'encountered an error while bundling',
  FATAL: 'encountered an unrecoverable error',
};

async function build() {
  const bundle = await rollup.rollup(inputOptions);
  // await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
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
    if (event.code == 'ERROR' || event.code == 'FATAL') {
      console.log(event);
    }
  });
}

if (shouldWatch) {
  watch();
} else {
  build();
}
