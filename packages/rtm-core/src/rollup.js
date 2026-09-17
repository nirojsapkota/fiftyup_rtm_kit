const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const autoExternal = require('rollup-plugin-auto-external');
const camelcase = require('lodash.camelcase');
const svg = require('rollup-plugin-svg');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const json = require('rollup-plugin-json');
const defaultExports = require('./defaultExports');

const getInputOptions = (srcDir, file, format, package, includeDeps) => {
  const plugins =
    format === 'cjs'
      ? [
          resolve(),
          commonjs(),
          includeDeps &&
            json({
              include: 'node_modules/**',
            }),
        ]
      : [
          autoExternal(),
          resolve(),
          svg(),
          babel({
            presets: ['@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties'],
            exclude: 'node_modules/**',
          }),
        ];

  return {
    input: `${srcDir}/${file}`,
    plugins: plugins,
    external: package.rtmRollup.external,
  };
};

const capitalize = s => s[0].toUpperCase() + s.slice(1);

const getRtmPackageExport = dep => {
  if (dep.match(/@rtm-/)) {
    //console.log("Looking for " + dep + " in "  + JSON.stringify(require.resolve.paths(`${dep}/package.json`)));

    // Changed behaviour somewhere on the way to Node 12 and dependent libraries. Now no longer includes
    // the calling scope. So, now we just need to manually insert the scope based on the original build
    // path.
    let systemPaths = require.resolve.paths(`${dep}/package.json`);
    systemPaths.push(process.env.PWD + '/node_modules');
    if (process.env.CODEBUILD_SRC_DIR) {
      systemPaths.push(process.env.CODEBUILD_SRC_DIR + '/node_modules');
    }

    const packageJson = require(require.resolve(`${dep}/package.json`, {
      paths: systemPaths,
    }));
    if (packageJson.rtmRollup) {
      return packageJson.rtmRollup.defaultExport;
    }
  }
};

const getOutputOptions = (buildDir, file, format, package) => {
  const globals = Object.keys(
    { ...package.dependencies, ...package.peerDependencies } || {}
  ).reduce((deps, dep) => {
    const rtmExport = getRtmPackageExport(dep);
    deps[dep] = rtmExport || defaultExports[dep] || capitalize(camelcase(dep));
    return deps;
  }, {});
  if (format === 'cjs') {
    return {
      file: `${buildDir}/${file}`,
      format: format,
      exports: 'named',
      // globals: globals,
    };
  } else {
    return {
      file: `${buildDir}/${file}`,
      format: format,
      name: package.rtmRollup.namespace,
      exports: 'named',
      external: Object.keys(globals),
      globals: globals,
    };
  }
};

async function build(dir, { format, watch, includeDeps = false }) {
  const package = require(path.resolve(dir, './package.json'));
  const srcDir = path.resolve(dir, './src');
  const buildDir = path.resolve(dir, './build');

  const files = await fs.readdirSync(srcDir);
  let file;
  if (files.includes('index.js')) {
    file = 'index.js';
  } else if (files.includes('exports.js')) {
    file = 'exports.js';
  }
  const inputOptions = getInputOptions(
    srcDir,
    file,
    format,
    package,
    includeDeps
  );
  const outputOptions = getOutputOptions(buildDir, file, format, package);
  try {
    if (watch) {
      const watcher = await rollup.watch({
        ...inputOptions,
        output: outputOptions,
      });
      watcher.on('event', event => {
        if (event.code === 'BUNDLE_END') {
          console.log(
            `${chalk.green.bold(package.name)} ${format} watch build complete`
          );
        }
      });
    } else {
      const bundle = await rollup.rollup(inputOptions);
      await bundle.write(outputOptions);
      console.log(`${chalk.green.bold(package.name)} ${format} build complete`);
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = build;
