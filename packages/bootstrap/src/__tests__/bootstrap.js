import React from 'react';
import 'jest-dom/extend-expect';
import { TrackingProvider } from '@rtm-ui/tracker';
import { render, cleanup } from 'react-testing-library';
import { Bootstrap } from '../index';

afterEach(cleanup);

it('renders the theme', () => {
  const { getByText } = render(<Bootstrap>Hello, World!</Bootstrap>);
  expect(getByText('Hello, World!')).toBeInTheDocument();
});

it('renders the theme with overrides', () => {
  const { getByText } = render(
    <Bootstrap
      themeName="obs"
      overrides={{ background: 'red' }}
      trackingProvider={TrackingProvider}
    >
      Hello, World!
    </Bootstrap>
  );
  expect(getByText('Hello, World!')).toBeInTheDocument();
});

it('renders the tracking provider', () => {
  const { getByText } = render(
    <Bootstrap trackingData={{ category: 'energy' }}>Hello, World!</Bootstrap>
  );
  expect(getByText('Hello, World!')).toBeInTheDocument();
});
