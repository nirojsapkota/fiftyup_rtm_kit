'use strict';

module.exports = (rootDir, setupFiles, target = 'browser') => {
  const config = {
    rootDir: rootDir,
    collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/setupTests.js'],
    coverageReporters: ['json-summary', 'lcov', 'text', 'clover'],
    coverageThreshold: {
      global: {
        statements: 95,
        branches: 85,
        functions: 90,
        lines: 90,
      },
    },
    setupFiles: target === 'browser' ? ['react-app-polyfill/jsdom'] : [],
    setupFilesAfterEnv: setupFiles ? [setupFiles] : [],
    testMatch: [
      '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
      '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}',
    ],
    // https://github.com/testing-library/react-testing-library/issues/54#issuecomment-476743231
    // Event propagation doesn't work in older jsdom versions
    testEnvironment: 'jest-environment-jsdom-fourteen',
    testURL: 'http://localhost',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': require.resolve('./babel-transform.js'),
    },
    transformIgnorePatterns: [
      '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    ],
  };

  return config;
};
