import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';
import { TrackingProvider } from '../../../tracker/src';
import Bootstrap from '../index';

afterEach(cleanup);

it('renders the theme', () => {
  const { getByText } = render(<Bootstrap>Hello, World!</Bootstrap>);
  expect(getByText('Hello, World!')).toBeInTheDocument();
});

it('renders the tracking provider', () => {
  const { getByText } = render(
    <Bootstrap trackingProvider={TrackingProvider}>Hello, World!</Bootstrap>
  );
  expect(getByText('Hello, World!')).toBeInTheDocument();
});

it('renders the tracking provider', () => {
  const { getByText } = render(
    <Bootstrap trackingData={{ category: 'energy' }}>Hello, World!</Bootstrap>
  );
  expect(getByText('Hello, World!')).toBeInTheDocument();
});
