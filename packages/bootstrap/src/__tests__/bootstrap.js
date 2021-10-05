import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { TrackingProvider } from '@rtm-ui/tracker';
import { render, cleanup } from '@testing-library/react';
import { Bootstrap } from '../index';
import { ErrorBoundary } from '../error-boundary';
import { DummyComponent as ThisComponentThrowsAnError } from '../../dummy-component';

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

describe('<ErrorBoundary />', () => {
  it('matches expected output', () => {
    const logSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const mockOnError = jest.fn();
    const { getByText } = render(
      <ErrorBoundary onError={mockOnError}>
        <ThisComponentThrowsAnError />
      </ErrorBoundary>
    );

    expect(
      getByText("We're sorry, something went wrong. Please try again.")
    ).toBeInTheDocument();
    expect(logSpy).toHaveBeenCalled();
    expect(mockOnError).toHaveBeenCalled();
  });
});
