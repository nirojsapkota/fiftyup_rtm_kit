'use strict';

const paths = require('../config/paths');
const fs = require('fs');
const path = require('path');
const Table = require('cli-table');
const packageJson = require(paths.appPackageJson);
const rollup = require('rollup');
const camelcase = require('lodash.camelcase');
const glob = require('glob-fs')({ gitignore: true });
const rootPackageJson = require('../../../package.json');
const { inputOptions } = require('../config/rollup.config');
const argv = process.argv.slice(2);
const shouldWatch = argv.indexOf('--watch') !== -1;
const watchMap = {
  BUNDLE_START: 'building an individual bundle',
  BUNDLE_END: 'finished building a bundle',
  ERROR: 'encountered an error while bundling',
  FATAL: 'encountered an unrecoverable error',
};

const capitalize = s => s[0].toUpperCase() + s.slice(1);
const globalOverrides = rootPackageJson.rtmRollup
  ? rootPackageJson.rtmRollup.globalMap || {}
  : {};
const packageDeps = Object.keys(packageJson.dependencies || {}).filter(dep =>
  dep.match(/@rtm/)
);

const getOutput = (format, path) => {
  return {
    file: `${paths.appBuild}/${path}.js`,
    format: format,
    name: packageJson.rtmRollup.defaultExport,
    exports: 'named',
    globals: Object.keys(
      { ...packageJson.dependencies, ...packageJson.peerDependencies } || {}
    ).reduce((deps, dep) => {
      deps[dep] = globalOverrides[dep] || capitalize(camelcase(dep));
      return deps;
    }, {}),
  };
};

const populateDependencyGlobals = async () => {
  return await glob
    .readdirStream('../**/package.json')
    .on('data', function(file) {
      const rtmPackage = require(file.path);
      if (packageDeps.includes(rtmPackage.name)) {
        const globalName = rtmPackage.rtmRollup
          ? rtmPackage.rtmRollup.defaultExport
          : null;

        if (globalName) {
          globalOverrides[rtmPackage.name] = globalName;
        }
      }
    });
};

const build = async () => {
  [{ format: 'umd', path: 'main' }, { format: 'es', path: 'module' }].map(
    async ({ format, path }) => {
      const buildGlobals = await populateDependencyGlobals();
      buildGlobals.on('end', async () => {
        const outputOptions = await getOutput(format, path);
        const bundle = await rollup.rollup(inputOptions);
        const res = await bundle.write(outputOptions);
        await copyToMainJs(outputOptions);
        await report(outputOptions, res);
      });
    }
  );
};

const watch = async (format, path) => {
  const buildGlobals = await populateDependencyGlobals();
  buildGlobals.on('end', async function() {
    const output = getOutput(format, path);
    const watcher = await rollup.watch({
      ...inputOptions,
      output: output,
    });
    watcher.on('event', event => {
      if (watchMap[event.code]) {
        console.log(watchMap[event.code]);
        if (event.code === 'BUNDLE_END') {
          report(output, event.result, {
            maxWidth: 50,
          });
        }
      }
    });
  });
};

const report = (buildOutput, buildResult, options = {}) => {
  const globals = buildOutput.globals;
  const summary = new Table({
    colWidths: options.maxWidth ? [10, options.maxWidth - 10] : [10, 70],
    style: { head: ['green'], compact: true, 'padding-left': 1 },
  });
  const dependenciesTable = new Table({
    head: ['Dependencies', 'Assumed Global Export'],
    colWidths: options.maxWidth ? [20, options.maxWidth - 20] : [30, 50],
    style: { head: ['green'] },
  });

  const relativePath = buildOutput.file.replace(process.cwd(), '');
  const size =
    (fs.statSync(buildOutput.file).size / Math.pow(1024, 1)).toFixed(2) * 1;

  dependenciesTable.push(
    ...Object.keys(globals).map(global => {
      return { [global]: globals[global] };
    })
  );

  summary.push({
    package: `${packageJson.name} - ${packageJson.version}`,
  });
  summary.push({ default: buildOutput.name });
  summary.push({ exports: buildResult.exports.sort().join(', ') });
  summary.push({ format: buildOutput.format });
  summary.push({ path: relativePath });
  summary.push({ size: `${size} kB` });
  console.log(summary.toString());
  console.log(dependenciesTable.toString());
};

async function copyToMainJs(output) {
  const filename = `${paths.appBuild}/${packageJson.rtmRollup.namespace}.${
    packageJson.version
  }`;

  var replace = `packages\/${packageJson.rtmRollup.namespace}\/build`;
  var re = new RegExp(replace, 'g');
  fs.mkdir('../../dist', { recursive: true }, err => {});
  fs.copyFile(
    output.file,
    `${filename.replace(re, 'dist')}.${
      output.format === 'es' ? 'module.' : ''
    }min.js`,
    err => {
      if (err) {
        throw err;
      }
    }
  );
}

if (shouldWatch) {
  watch('umd', 'main');
  watch('es', 'module');
} else {
  build();
}
