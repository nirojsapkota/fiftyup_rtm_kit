import React from 'react';
import { render, cleanup, fireEvent } from '../../../bootstrap/setup/testSetup';
import { A } from '../index';

const mockTrackEvent = jest.fn((_, callback) => callback);
jest.mock('@rtm-ui/tracker', () => {
  const original = require.requireActual('@rtm-ui/tracker');
  return {
    ...original,
    useTracker: () => ({
      ref: () => {},
      trackEvent: mockTrackEvent,
    }),
  };
});

describe('<A />', () => {
  const text = 'Hello, World!';

  it('passes the track prop to the tracking context module', () => {
    const { getByText } = render(<A track="test" href="www.google.com">{text}</A>);

    expect(getByText(text).closest('a')).toHaveAttribute('href','//www.google.com');

    fireEvent.click(getByText(text));

    expect(mockTrackEvent).toHaveBeenCalledTimes(1);

    mockTrackEvent.mockReset();
  });

  it('matches expected output', () => {
    const { getByText } = render(
      <A weight="normal" color="primary">
        {text}
      </A>
    );

    expect(getByText(text)).toBeInTheDocument();
    expect(getByText(text)).toHaveStyleRule('font-weight', '400');
    expect(getByText(text)).toHaveStyleRule('color', '#1566ad');

    fireEvent.click(getByText(text));
  });

  it('defaults to link color when color prop is not set', () => {
    const { getByText } = render(<A href="https://www.google.com">{text}</A>);
    expect(getByText(text).closest('a')).toHaveAttribute('href','https://www.google.com');
    expect(getByText(text)).toHaveStyleRule('color', '#1566ad');
  });
});
