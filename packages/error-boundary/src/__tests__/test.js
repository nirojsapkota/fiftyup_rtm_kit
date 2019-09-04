import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import { ErrorBoundary } from '../index';
import { DummyComponent as ThisComponentThrowsAnError } from '../../docs/dummy-component';
import { NotFound } from '../../docs/not-found';

describe('<ErrorBoundary />', () => {
  it('matches expected output', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const { getByText } = render(
      <ErrorBoundary renderOnError={<NotFound />}>
        <ThisComponentThrowsAnError />
      </ErrorBoundary>
    );

    expect(getByText('Oh No!')).toBeInTheDocument();
    expect(logSpy).toHaveBeenCalled();
  });
});
