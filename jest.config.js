const path = require(`path`);
const glob = require(`glob`);

const pkgs = glob.sync(`./packages/*`).map(p => p.replace(/^\./, `<rootDir>`));
const builtTestsDirs = pkgs.map(p => path.join(p, `__tests__`));
const builtPackageDirs = pkgs.map(p => path.join(p, `build`));
const ignoreDirs = [`<rootDir>/jest`].concat(builtPackageDirs, builtTestsDirs);

module.exports = {
  notify: true,
  verbose: true,
  roots: pkgs,
  modulePathIgnorePatterns: ignoreDirs,
  collectCoverageFrom: ["packages/**/*.{js,jsx}"],
  coveragePathIgnorePatterns: ignoreDirs,
  testPathIgnorePatterns: [
    `/examples/`,
    `/build/`,
    `/node_modules/`,
    `__tests__/fixtures`,
  ],
  setupTestFrameworkScriptFile: `<rootDir>/jest.setup.js`,
  transform: { "^.+\\.js$": `<rootDir>/jest-transformer.js` },
  moduleNameMapper: {
    "^highlight.js$": `<rootDir>/node_modules/highlight.js/lib/index.js`,
  },
  moduleDirectories: ["node_modules", "jest", __dirname],
  // TODO: Remove this once https://github.com/facebook/jest/pull/6792 is released.
  testURL: "http://localhost",
};
