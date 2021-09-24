/**
 * NEW TEST SETUP
 *
 * ! WHY?
 *
 * Because "react-testing-library" was deprecaited in 2019
 *
 * "@testing-library/react" is the successor to the "react-testing-library".
 *
 *
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import 'jest-styled-components';
import '@testing-library/jest-dom/extend-expect'; // (Replaces) 'jest-dom/extend-expect';
import { render } from '@testing-library/react';
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

export * from '@testing-library/react';
export { bootstrapRender as render };
