import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'jest-styled-components';

import { render } from 'react-testing-library';
import React from 'react';
import { obs, fuc, ninesaver, setIn } from '../../theme';
import TestBootstrap from './docSetup';

const bootstrapRender = (
  node,
  { theme = 'obs', themeOverrides, ...options } = {}
) => {
  const selectedTheme = { obs, fuc, ninesaver }[theme];
  const testTheme = themeOverrides
    ? Object.keys(themeOverrides).reduce(
        (acc, cv, ci) => setIn(acc, cv, Object.values(themeOverrides)[ci]),
        selectedTheme
      )
    : selectedTheme;

  return render(
    <TestBootstrap theme={testTheme}>{node}</TestBootstrap>,
    options
  );
};

export * from 'react-testing-library';
export { bootstrapRender as render };
