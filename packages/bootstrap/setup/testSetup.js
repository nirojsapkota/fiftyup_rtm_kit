// // FIXME: this should be from the testSetup file somehow. Not having it breaks things
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'jest-styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from 'react-testing-library';
import React from 'react';
import { obs, fuc, ninesaver, setIn } from '@rtm-ui/theme';
import TestBootstrap from './docSetup';

const bootstrapRender = (
  node,
  { theme = 'obs', themeOverrides, ...options } = {}
) => {
  return render(
    <TestBootstrap themeName={theme} overrides={themeOverrides}>
      {node}
    </TestBootstrap>,
    options
  );
};

export * from 'react-testing-library';
export { bootstrapRender as render };
