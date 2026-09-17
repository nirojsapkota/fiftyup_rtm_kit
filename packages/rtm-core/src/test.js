'use strict';

const jest = require('jest');

process.env.NODE_ENV = 'test';

const test = (_, opt) => {
  const configPath = require(require.resolve(`./jest/config.js`));
  const config = configPath(process.cwd(), opt.p, opt.t);
  const configAsString = JSON.stringify(config);
  let jestArgs = ['--config', configAsString];
  if (opt.w) {
    jestArgs = [...jestArgs, '--watch'];
  }
  if (opt.coverage) {
    jestArgs = [...jestArgs, '--coverage'];
  }
  jest.run(jestArgs);
};

module.exports = test;
