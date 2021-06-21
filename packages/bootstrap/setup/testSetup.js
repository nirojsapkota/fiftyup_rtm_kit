// eslint-disable-next-line import/no-extraneous-dependencies
import 'jest-dom/extend-expect';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'jest-styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies
//import { render } from '@testing-library/react';
import { render, wait } from 'react-testing-library';

import React from 'react';
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

// (FORMER LIBRARY -  DEPRECIATED)
export * from 'react-testing-library';
// export * from '@testing-library/react';
export { bootstrapRender as render };
