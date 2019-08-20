#!/usr/bin/env node
const { spawn } = require('child_process');

// lerna run test --stream --scope @rtm-ui/$1 -- -- --p test --colors

const child = spawn('lerna', [
  'run',
  'test',
  '--stream',
  '--scope',
  '@rtm-ui/$1',
  '--',
  '--',
  '--p',
  '--colors',
]);

child.on('exit', code => {
  console.log(`Exit code is: ${code}`);
});
