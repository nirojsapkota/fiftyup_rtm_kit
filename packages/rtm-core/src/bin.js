#!/usr/bin/env node
'use strict';

// const path = require("path");
// const rtmScripts = require(path.resolve('./node_modules/@rtm/core/src'));
// const rtmScripts = require(path.resolve("../rtm-core/src"));
const rtmScripts = require('@rtm/core');
var argv = require('yargs')
  .alias('f', 'format')
  .describe('f', 'choose your format')
  .choices('f', ['cjs', 'umd'])
  .alias('w', 'watch')
  .alias('p', 'path')
  .alias('t', 'target').argv;

const command = argv._;
rtmScripts[command](process.cwd(), argv);
